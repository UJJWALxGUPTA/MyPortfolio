import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Play, RotateCcw, ShieldAlert, Info, Activity, Globe, Server, Laptop, Cpu, Lock } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { TOPOLOGY_NODES } from '../../data/portfolioData';
import { TopologyNode } from '../../types/portfolio';

export const NetworkTopologyVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(TOPOLOGY_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<TopologyNode | null>(null);
  const [simulationState, setSimulationState] = useState<'IDLE' | 'TRANSMITTING' | 'ROUTED' | 'PERMITTED' | 'BLOCKED'>('IDLE');
  const [simulationPath, setSimulationPath] = useState<string[]>([]);
  const [simulationTarget, setSimulationTarget] = useState<'wan' | 'inter_vlan'>('wan');
  const [simulationLog, setSimulationLog] = useState<string[]>([
    '[INIT] Topology Ready: OSPF Area 0 Converged. Sub-interfaces UP.'
  ]);

  const activeNode = hoveredNode || selectedNode;

  // Run packet injection simulation in Crimson theme
  const handleInjectPacket = (target: 'wan' | 'inter_vlan') => {
    soundManager.playPacketPulse(800);
    setSimulationTarget(target);
    setSimulationState('TRANSMITTING');

    if (target === 'wan') {
      setSimulationPath(['host-vlan10', 'sw-access', 'sw-core', 'rtr-stick', 'gw-nat', 'cloud-wan']);
      setSimulationLog([
        '[0.00ms] Host 192.168.10.15 generates ICMP Echo Request for 8.8.8.8',
        '[0.45ms] Access Switch applies 802.1Q Tag: VLAN 10 (VID 10) on Trunk g0/1',
        '[1.10ms] Core Switch forwards tagged frame across distribution backbone',
        '[1.85ms] Router-on-a-Stick receives frame on sub-interface g0/0.10',
        '[2.40ms] OSPF Area 0 route lookup: Default route 0.0.0.0/0 via NAT Gateway',
        '[3.15ms] Extended ACL 101: PERMIT ip 192.168.10.0/24 any (Match rule 10)',
        '[3.90ms] NAT/PAT translates 192.168.10.15:49152 -> 203.0.113.15:1042',
        '[4.50ms] [200 OK] Packet egresses to Public WAN. ICMP Reply Received: 13.8ms'
      ]);

      setTimeout(() => {
        soundManager.playSuccessChime();
        setSimulationState('PERMITTED');
      }, 2300);

    } else {
      setSimulationPath(['host-vlan10', 'sw-access', 'sw-core', 'rtr-stick']);
      setSimulationLog([
        '[0.00ms] Host 192.168.10.15 attempts connection to Admin Server 192.168.20.50:22',
        '[0.50ms] Access Switch tags frame as VLAN 10',
        '[1.20ms] Router-on-a-Stick g0/0.10 inspects destination IP 192.168.20.50',
        '[1.80ms] ACL Inspection: Evaluating Extended Access-List 101 Inbound...',
        '[2.20ms] [DENY] Rule 20 matched: "deny tcp 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255 eq 22"',
        '[2.30ms] ICMP Destination Administratively Prohibited sent back to Host'
      ]);

      setTimeout(() => {
        soundManager.playBeep(280, 0.25, 'sawtooth', 0.06);
        setSimulationState('BLOCKED');
      }, 2000);
    }
  };

  const handleResetSimulation = () => {
    soundManager.playKeyClick();
    setSimulationState('IDLE');
    setSimulationPath([]);
    setSimulationLog(['[RESET] Topology reset to steady-state OSPF Area 0 listening.']);
  };

  const getNodeIcon = (type: TopologyNode['type']) => {
    switch (type) {
      case 'host': return Laptop;
      case 'switch': return Server;
      case 'router': return Network;
      case 'gateway': return Lock;
      case 'cloud': return Globe;
      default: return Cpu;
    }
  };

  return (
    <div className="w-full glass-panel rounded-xl border border-red-600/30 overflow-hidden shadow-crimson-md bg-obsidian-850/95">
      
      {/* Simulation Command Bar */}
      <div className="bg-obsidian-950/95 border-b border-red-600/20 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Network className="w-5 h-5 text-crimson animate-pulse" />
          <div>
            <h3 className="font-mono text-xs font-bold text-white tracking-wide">
              MULTI-VLAN & OSPF TOPOLOGY SIMULATOR (CRIMSON NOC)
            </h3>
            <div className="text-[10px] font-mono text-slate-400">
              Interactive 802.1Q Trunking • Router-on-a-Stick • PAT Overload • Extended ACLs
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => handleInjectPacket('wan')}
            disabled={simulationState === 'TRANSMITTING'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-crimson text-white font-bold hover:bg-scarlet disabled:opacity-50 transition-all text-[11px] shadow-crimson-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Trace Packet to WAN (NAT)</span>
          </button>

          <button
            onClick={() => handleInjectPacket('inter_vlan')}
            disabled={simulationState === 'TRANSMITTING'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800 text-scarlet-light border border-red-600/40 hover:bg-obsidian-700 disabled:opacity-50 transition-all text-[11px]"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-crimson" />
            <span>Test ACL 101 (Inter-VLAN)</span>
          </button>

          <button
            onClick={handleResetSimulation}
            className="p-1.5 rounded-lg bg-obsidian-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative bg-obsidian-950/95 p-4 sm:p-6 overflow-x-auto min-h-[380px]">
        {/* Subtle red grid background */}
        <div className="absolute inset-0 bg-crimson-grid opacity-40 pointer-events-none" />

        {/* SVG Network Graph */}
        <div className="w-[1140px] h-[400px] relative mx-auto select-none">
          <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1140 400">
            <defs>
              <linearGradient id="crimsonTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff003c" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.85" />
              </linearGradient>

              <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static Connection Lines with continuous animated dash-offset */}
            {/* Host VLAN 10 -> Access Switch */}
            <line x1="160" y1="120" x2="320" y2="230" stroke="#ff003c" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.45" />
            
            {/* Host VLAN 20 -> Access Switch */}
            <line x1="160" y1="340" x2="320" y2="230" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.45" />

            {/* Access Switch -> Core Switch (802.1Q Trunk) */}
            <line x1="380" y1="230" x2="520" y2="230" stroke="url(#crimsonTrunkGrad)" strokeWidth="3.5" strokeOpacity="0.8" />

            {/* Core Switch -> Router-on-a-Stick */}
            <line x1="580" y1="230" x2="720" y2="160" stroke="#ff003c" strokeWidth="3" strokeOpacity="0.75" />

            {/* Router-on-a-Stick -> NAT Gateway */}
            <line x1="780" y1="160" x2="880" y2="280" stroke="#f43f5e" strokeWidth="3" strokeOpacity="0.75" />

            {/* NAT Gateway -> Cloud WAN */}
            <line x1="940" y1="280" x2="1040" y2="280" stroke="#ff003c" strokeWidth="3" strokeDasharray="6 3" strokeOpacity="0.85" />

            {/* Line Labels */}
            <text x="430" y="215" fill="#ff003c" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">802.1Q TRUNK</text>
            <text x="645" y="180" fill="#e11d48" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OSPF Area 0</text>
            <text x="815" y="215" fill="#f43f5e" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ACL 101</text>
            <text x="990" y="265" fill="#ff003c" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PAT Overload</text>

            {/* Animated Packet Flow with Framer Motion SVG path */}
            {simulationState === 'TRANSMITTING' && (
              <motion.circle
                r="8"
                fill={simulationTarget === 'wan' ? '#ff003c' : '#f43f5e'}
                filter="url(#crimsonGlow)"
                initial={{ cx: 160, cy: 120 }}
                animate={
                  simulationTarget === 'wan'
                    ? {
                        cx: [160, 320, 520, 720, 880, 1040],
                        cy: [120, 230, 230, 160, 280, 280],
                      }
                    : {
                        cx: [160, 320, 520, 720],
                        cy: [120, 230, 230, 160],
                      }
                }
                transition={{
                  duration: 2.0,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />
            )}
          </svg>

          {/* Interactive Topology Nodes */}
          {TOPOLOGY_NODES.map((node) => {
            const Icon = getNodeIcon(node.type);
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;
            const inSimulationPath = simulationPath.includes(node.id);

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                onClick={() => {
                  soundManager.playKeyClick();
                  setSelectedNode(node);
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-44 p-3 rounded-xl bg-obsidian-900/98 border backdrop-blur-md cursor-pointer transition-all duration-200 z-10 ${
                  isSelected || isHovered
                    ? 'border-crimson shadow-crimson-md scale-105 z-20'
                    : 'border-red-600/25 hover:border-crimson/70'
                } ${inSimulationPath ? 'ring-1 ring-crimson bg-obsidian-850' : ''}`}
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-obsidian-800 text-crimson border border-red-600/30">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans font-bold text-xs text-white truncate">
                      {node.name}
                    </div>
                    <div className="font-mono text-[9px] text-slate-400 truncate">
                      {node.ip}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] pt-1 border-t border-slate-800">
                  {node.vlan ? (
                    <span className="text-crimson font-semibold">
                      VLAN {node.vlan}
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      L3 Backbone
                    </span>
                  )}
                  <span className="text-scarlet flex items-center space-x-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                    <span>UP</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Columns Below SVG: Node Telemetry Panel + Live Packet Tracer Terminal Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-red-600/20 bg-obsidian-900/98 divide-y lg:divide-y-0 lg:divide-x divide-red-600/15">
        
        {/* Left: Node Telemetry Details */}
        <div className="lg:col-span-5 p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center space-x-1.5 text-crimson font-bold">
              <Info className="w-3.5 h-3.5" />
              <span>NODE INSPECTION METRICS</span>
            </span>
            <span className="text-[10px] text-slate-500">Hover or click any node</span>
          </div>

          {activeNode ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm font-sans">{activeNode.name}</span>
                <span className="text-crimson text-[10px] bg-crimson/10 border border-crimson/30 px-2 py-0.5 rounded font-bold">
                  STATUS: {activeNode.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <span className="text-[10px] text-slate-400 block">IP / Subnet</span>
                  <span className="text-white font-bold break-all">{activeNode.ip}</span>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <span className="text-[10px] text-slate-400 block">MAC Address</span>
                  <span className="text-slate-300 font-bold">{activeNode.mac}</span>
                </div>
              </div>

              {activeNode.subnet && (
                <div className="p-2 rounded-lg bg-obsidian-950 border border-slate-800 text-[11px]">
                  <span className="text-[10px] text-slate-400 block">Subnet CIDR / Interface</span>
                  <span className="text-slate-200">{activeNode.subnet}</span>
                </div>
              )}

              {activeNode.activeAcl && (
                <div className="p-2 rounded-lg bg-obsidian-950 border border-crimson/30 text-[11px] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-crimson block font-bold">Security Policy</span>
                    <span className="text-slate-200">{activeNode.activeAcl}</span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-crimson" />
                </div>
              )}

              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                {activeNode.description}
              </p>
            </div>
          ) : null}
        </div>

        {/* Right: Live Packet Tracer Terminal Log */}
        <div className="lg:col-span-7 p-4 font-mono text-xs space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center space-x-1.5 text-crimson font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>PACKET TRACER // SIMULATION EVENT STREAM</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
              simulationState === 'PERMITTED' ? 'bg-crimson/20 text-white border border-crimson/40' :
              simulationState === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              simulationState === 'TRANSMITTING' ? 'bg-crimson/30 text-white animate-pulse' :
              'bg-obsidian-800 text-slate-400'
            }`}>
              STATE: {simulationState}
            </span>
          </div>

          <div className="bg-obsidian-950 p-3 rounded-lg border border-red-600/15 h-48 overflow-y-auto space-y-1.5 text-[11px]">
            {simulationLog.map((log, index) => {
              let color = 'text-slate-300';
              if (log.includes('[200 OK]')) color = 'text-white font-bold bg-crimson/15 px-1 rounded';
              if (log.includes('[DENY]')) color = 'text-red-400 font-bold';
              if (log.includes('ACL')) color = 'text-crimson';
              if (log.includes('OSPF')) color = 'text-scarlet-light';

              return (
                <div key={index} className={`leading-relaxed ${color}`}>
                  {log}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>Protocol: 802.1Q encapsulation + RFC 2328 OSPFv2</span>
            <span>Packet Size: 64 bytes (ICMP)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
