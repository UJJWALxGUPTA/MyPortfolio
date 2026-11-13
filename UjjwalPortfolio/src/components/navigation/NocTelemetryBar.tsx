import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, VolumeX, Activity, ShieldCheck, Tv, Zap } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface NocTelemetryBarProps {
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const NocTelemetryBar: React.FC<NocTelemetryBarProps> = ({
  crtEnabled,
  onToggleCrt,
}) => {
  const [rtt, setRtt] = useState(13.8);
  const [systemLoad, setSystemLoad] = useState(1.2);
  const [jitter, setJitter] = useState(0.6);
  const [packets, setPackets] = useState(52819);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [uptime, setUptime] = useState({ h: 184, m: 12, s: 45 });

  useEffect(() => {
    // Simulate real-time network fluctuations
    const telemetryInterval = setInterval(() => {
      setRtt(prev => {
        const delta = (Math.random() - 0.48) * 1.2;
        const next = Math.max(10, Math.min(18, prev + delta));
        return parseFloat(next.toFixed(1));
      });

      setSystemLoad(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(0.8, Math.min(2.4, prev + delta)).toFixed(1));
      });

      setJitter(parseFloat((0.3 + Math.random() * 0.7).toFixed(1)));
      setPackets(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 2200);

    // Live uptime ticking
    const uptimeInterval = setInterval(() => {
      setUptime(prev => {
        let { h, m, s } = prev;
        s += 1;
        if (s >= 60) {
          s = 0;
          m += 1;
          if (m >= 60) {
            m = 0;
            h += 1;
          }
        }
        return { h, m, s };
      });
    }, 1000);

    return () => {
      clearInterval(telemetryInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full bg-jet/95 border-b border-red-600/20 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono text-slate-400 select-none sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: System Status & HUD Telemetry */}
        <div className="flex items-center space-x-3 overflow-x-auto py-0.5">
          <div className="flex items-center space-x-1.5 text-crimson">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
            </span>
            <span className="font-bold tracking-wider uppercase text-[10px] text-white">
              NOC TELEMETRY: <span className="text-crimson">ACTIVE</span>
            </span>
          </div>

          <span className="text-slate-800 hidden sm:inline">|</span>

          {/* Telemetry pill */}
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="hidden sm:inline">LOAD: <strong className="text-crimson font-bold">{systemLoad}%</strong></span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="hidden md:inline">LINK: <strong className="text-scarlet font-bold">REDUNDANT</strong></span>
            <span className="text-slate-700 hidden md:inline">•</span>
            <Wifi className="w-3 h-3 text-crimson animate-pulse" />
            <span>RTT: <strong className="text-crimson font-bold">{rtt}ms</strong></span>
            <span className="text-slate-700 hidden lg:inline">•</span>
            <span className="hidden lg:inline">Status: <span className="text-white font-semibold">ESTABLISHED</span></span>
          </div>
        </div>

        {/* Right: Live Controls, Uptime & Audio Switch */}
        <div className="flex items-center space-x-3 text-slate-400 ml-auto">
          {/* Uptime */}
          <div className="hidden sm:flex items-center space-x-1 text-slate-400">
            <Activity className="w-3 h-3 text-crimson" />
            <span>UP: <span className="text-slate-200">{uptime.h}h {pad(uptime.m)}m {pad(uptime.s)}s</span></span>
          </div>

          {/* Packets */}
          <div className="hidden lg:flex items-center space-x-1 text-slate-400">
            <span className="text-slate-700">[</span>
            <span className="text-slate-200 font-semibold">{packets.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500">pkts</span>
            <span className="text-slate-700">]</span>
          </div>

          {/* Security posture */}
          <div className="hidden xl:flex items-center space-x-1 text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/30">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-wider">ACLs HARDENED</span>
          </div>

          {/* CRT scanline toggle */}
          <button
            onClick={onToggleCrt}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded transition-all border ${
              crtEnabled
                ? 'bg-crimson/20 border-crimson/50 text-crimson'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle CRT Scanline Overlay"
          >
            <Tv className="w-3 h-3" />
            <span className="hidden md:inline text-[10px]">CRT</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded transition-all border ${
              !isMuted
                ? 'bg-crimson/20 border-crimson/50 text-crimson'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isMuted ? 'Enable Audio Synthesizer' : 'Mute Audio Synthesizer'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3 h-3" />
                <span className="hidden md:inline text-[10px]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 text-crimson animate-pulse" />
                <span className="hidden md:inline text-[10px]">AUDIO ON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
