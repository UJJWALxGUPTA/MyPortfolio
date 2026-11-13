import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Copy, Check, RotateCcw } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { PERSONAL_INFO, CERTIFICATIONS } from '../../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isCopied, setIsCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll when new output arrives
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Initial auto-typing sequence with crimson prompt
  useEffect(() => {
    let isCancelled = false;

    const initialScript: { delay: number; line: TerminalLine }[] = [
      {
        delay: 350,
        line: { id: '1', type: 'input', content: '$ ujjwal --init --mode=interactive' }
      },
      {
        delay: 800,
        line: { id: '2', type: 'success', content: '[OK] Interfaces UP: GigabitEthernet0/0/0, eth0' }
      },
      {
        delay: 1200,
        line: { id: '3', type: 'success', content: '[OK] Routing Protocol: OSPF Area 0 Converged' }
      },
      {
        delay: 1600,
        line: { id: '4', type: 'success', content: '[OK] Security: ACLs Applied & Port-Security Hardened' }
      },
      {
        delay: 2000,
        line: { id: '5', type: 'input', content: '$ ping -c 3 ujjwal.portfolio' }
      },
      {
        delay: 2400,
        line: { id: '6', type: 'output', content: '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.042 ms' }
      },
      {
        delay: 2700,
        line: { id: '7', type: 'output', content: '64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.038 ms' }
      },
      {
        delay: 3000,
        line: { id: '8', type: 'output', content: '64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.041 ms' }
      },
      {
        delay: 3200,
        line: { id: '9', type: 'system', content: '--- ujjwal.portfolio ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, rtt avg 0.040 ms\nSession ready. Type \'help\' for available commands.' }
      }
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    initialScript.forEach(({ delay, line }) => {
      const t = setTimeout(() => {
        if (!isCancelled) {
          setLines(prev => [...prev, line]);
          soundManager.playKeyClick();
        }
      }, delay);
      timeouts.push(t);
    });

    return () => {
      isCancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundManager.playKeyClick();

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: `$ ${trimmed}`
    };

    const cmdParts = trimmed.toLowerCase().split(' ');
    const mainCmd = cmdParts[0];
    const arg = cmdParts[1];

    let outputLine: TerminalLine | null = null;

    switch (mainCmd) {
      case 'help':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `AVAILABLE COMMANDS:
  help              Display this command index
  skills            List technical skills (Kafka, CCNA, Ki-Cad, MERN)
  projects          List all 7 full-stack, distributed & IoT projects
  kafka             Inspect Kafka event streaming pipeline & partition stats
  iot               Display Smart Door Lock hardware MFA schematic
  crm               View RealtyFlow multi-tenant lead analytics
  contact           Output contact endpoints & transmission details
  ccna              Display Cisco CCNA certification details & verification
  whoami            Print engineer telemetry & background summary
  ping <host>       Execute simulated ICMP Echo Request
  traceroute <host> Trace Layer 3 packet hops to target
  cat resume        Print full formatted terminal resume profile
  clear             Purge terminal screen buffer`
        };
        break;

      case 'skills':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[DIAGNOSTICS MATRIX // FULL-STACK & HARDWARE TELEMETRY]
  * Backend & Distributed: Apache Kafka, WebSockets (RFC 6455), Node.js, Express, MongoDB, Java/JDBC
  * Networking & CCNA:     OSPF Area 0, 802.1Q VLAN Trunks, NAT/PAT, Extended ACLs, TCP/IP, Wireshark
  * Embedded & IoT:        Arduino, RFID (MFRC522), STM32 ARM, 12V Solenoid Relays, DM542 Motor Drivers
  * Hardware & EDA Tools:  Ki-Cad (Schematics & PCB), SPICE Simulation, EzCad Laser CAD (IR/UV Optics)
  * OS, Scripting & IDEs:  Linux (Ubuntu/Debian), Bash, Python/Pygame, VS Code, Turbo C++, Spyder`
        };
        break;

      case 'projects':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `ENGINEERING SYSTEMS CATALOG (7 ACTIVE PLATFORMS):
  1. RealtyFlow | Real Estate Automation CRM (MERN, Multi-Tenant, Analytics)
  2. KafkaChat | Real-Time Distributed Messaging (Apache Kafka, WebSockets, MongoDB)
  3. Multi-VLAN Enterprise Topology (Cisco Packet Tracer, OSPF Area 0, 802.1Q, ACL 101)
  4. Smart Door Lock | IoT MFA Security (Arduino, RFID RC522, Keypad 4x4, 12V Solenoid)
  5. Digi-Dine | Smart Canteen Platform (React, Node.js, Express, MongoDB, Razorpay)
  6. Hotel Management Desktop System (Java, MySQL, JDBC, Java Swing GUI)
  7. 2D Retro Snake Engine (Python, Pygame, OOP Vector Physics Loop)`
        };
        break;

      case 'kafka':
        soundManager.playPacketPulse(850);
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[KAFKA CLUSTER STATUS // BOOTSTRAP: localhost:9092]
  Topic:      chat-events-v1
  Brokers:    3 Active Leaders (broker-0, broker-1, broker-2)
  Partitions: P0 (Offset: 1042), P1 (Offset: 914), P2 (Offset: 809)
  In-Sync:    Replication Factor 3, min.insync.replicas=2
  Consumers:  chat-worker-group (Lag: 0 ms, Manual Offset Commit)`
        };
        break;

      case 'iot':
        soundManager.playKeyClick();
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[SMART DOOR LOCK // HARDWARE SCHEMATIC]
  MCU:        ATmega328P / Arduino Nano (16MHz)
  RFID:       MFRC522 SPI (MOSI:11, MISO:12, SCK:13, SDA:10, IRQ:2)
  Keypad:     4x4 Matrix with Hardware Debounce & Pull-ups
  Actuator:   12V DC Solenoid Strike via Opto-Isolated Relay + 1N4007 Diode
  State:      MFA Standby (Awaiting RFID Scan -> PIN Verification)`
        };
        break;

      case 'crm':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[REALTYFLOW CRM // ANALYTICS SUMMARY]
  Tenants:    12 Multi-Tenant Organization Workspaces
  Leads:      142 Active Broker Pipeline Deals ($4.2M Valuation)
  Throughput: 10k+ Req/s, Aggregation Pipelines, JWT Cookie Auth`
        };
        break;

      case 'contact':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `TRANSMISSION ENDPOINTS:
  Email:    ${PERSONAL_INFO.email}
  Phone:    ${PERSONAL_INFO.phone}
  Location: ${PERSONAL_INFO.location}
  LinkedIn: ${PERSONAL_INFO.linkedin}
  GitHub:   ${PERSONAL_INFO.github}
  Ready to receive TCP SYN packets below.`
        };
        break;

      case 'ccna':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: `[CREDENTIAL VERIFIED]
  Certification: Cisco Certified Network Associate (CCNA)
  Exam Code:     200-301 CCNA
  Verification:  ${CERTIFICATIONS[0].verificationId}
  Core Domains:  Routing (OSPF Area 0), Switching (802.1Q Trunks, STP),
                 IP Services (NAT/PAT, DHCP, DNS), Security (Extended ACLs)`
        };
        break;

      case 'whoami':
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `ENGINEER IDENTITY:
  Name:     ${PERSONAL_INFO.name}
  Title:    ${PERSONAL_INFO.title}
  Status:   ${PERSONAL_INFO.status}
  Degree:   B.E. Electronics & Telecommunication (2021–2025)
  Role:     Graduate Trainee @ Specialise Products Pvt. Ltd.
  Focus:    High-availability network backbones, distributed Kafka streaming & embedded hardware.`
        };
        break;

      case 'ping':
        const target = arg || '8.8.8.8';
        soundManager.playPacketPulse();
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `PING ${target} (56 data bytes):
64 bytes from ${target}: icmp_seq=1 ttl=118 time=14.2 ms
64 bytes from ${target}: icmp_seq=2 ttl=118 time=13.8 ms
64 bytes from ${target}: icmp_seq=3 ttl=118 time=14.1 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0.0% packet loss, time 2004ms`
        };
        break;

      case 'traceroute':
        const traceTarget = arg || '8.8.8.8';
        soundManager.playPacketPulse();
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `traceroute to ${traceTarget} (30 hops max, 60 byte packets):
 1  192.168.1.1 (gateway.local)  0.421 ms  0.392 ms
 2  10.240.0.1 (core-sw-01.mgmt)  1.829 ms  1.745 ms
 3  172.16.100.1 (edge-rtr-stick)  3.411 ms  3.290 ms
 4  203.0.113.1 (isp-gw.noc)  8.190 ms  8.045 ms
 5  ${traceTarget} (destination.edge)  14.220 ms [Hop Reached]`
        };
        break;

      case 'cat':
        if (arg === 'resume' || arg === 'profile') {
          outputLine = {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: `===============================================================
UJJWAL GUPTA // CCNA CERTIFIED FULL-STACK & NETWORK ENGINEER
B.E. EXTC (2021–2025) | Specialise Products Pvt. Ltd.
---------------------------------------------------------------
* Cisco Certified Network Associate (CCNA 200-301)
* Linux Essentials Certified (LPI 010-160)
* Distributed Kafka, MERN Platform, IoT Smart Door Lock
Use "Extract Resume (PDF)" button for complete export.`
          };
        } else {
          outputLine = {
            id: (Date.now() + 1).toString(),
            type: 'error',
            content: `cat: ${arg || 'file'}: No such file or directory. Try: cat resume`
          };
        }
        break;

      case 'clear':
        setLines([]);
        setInputValue('');
        return;

      default:
        outputLine = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `bash: command not found: "${trimmed}". Type 'help' for available commands.`
        };
        break;
    }

    setLines(prev => [...prev, newLine, ...(outputLine ? [outputLine] : [])]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputValue(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputValue.trim().toLowerCase();
      const candidates = ['help', 'skills', 'projects', 'kafka', 'iot', 'crm', 'contact', 'ccna', 'whoami', 'ping', 'traceroute', 'clear', 'cat resume'];
      const match = candidates.find(c => c.startsWith(current));
      if (match) {
        setInputValue(match);
      }
    } else {
      soundManager.playKeyClick();
    }
  };

  const copyTerminalOutput = () => {
    const text = lines.map(l => l.content).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetTerminal = () => {
    setLines([
      { id: 'r1', type: 'system', content: 'Terminal session reset. Type \'help\' for available commands.' }
    ]);
  };

  const quickCommands = ['help', 'skills', 'projects', 'kafka', 'iot', 'crm', 'ccna', 'clear'];

  return (
    <div className={`w-full transition-all duration-300 font-mono text-xs ${isMaximized ? 'fixed inset-4 z-50 flex flex-col' : ''}`}>
      <div className="glass-panel rounded-xl border border-red-600/30 overflow-hidden shadow-crimson-md flex flex-col h-full bg-obsidian-850/95">
        {/* Terminal Title Bar */}
        <div className="bg-obsidian-950/95 border-b border-red-600/20 px-3.5 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-crimson inline-block shadow-crimson-sm" />
              <span className="w-3 h-3 rounded-full bg-scarlet/60 inline-block" />
              <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
            </div>
            <span className="text-slate-700 font-bold ml-1">|</span>
            <div className="flex items-center space-x-1.5 text-slate-300 text-[11px]">
              <TerminalIcon className="w-3.5 h-3.5 text-crimson" />
              <span className="text-white font-semibold">ujjwal@noc-crimson:~ (bash)</span>
              <span className="text-slate-500 hidden sm:inline">- 192.168.1.1 [OSPF Area 0]</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <button
              onClick={copyTerminalOutput}
              className="p-1 hover:text-crimson rounded transition-colors"
              title="Copy session output"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-crimson font-bold" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetTerminal}
              className="p-1 hover:text-crimson rounded transition-colors"
              title="Reset terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-crimson rounded transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Terminal Body with Smooth Slide-Up Output */}
        <div
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus()}
          className={`p-4 bg-obsidian-950/98 overflow-y-auto space-y-2 cursor-text select-text ${
            isMaximized ? 'flex-1' : 'h-[320px] sm:h-[370px]'
          }`}
        >
          <AnimatePresence>
            {lines.map((line) => {
              let color = 'text-slate-300';
              if (line.type === 'input') color = 'text-crimson font-bold';
              if (line.type === 'success') color = 'text-scarlet-light font-semibold';
              if (line.type === 'error') color = 'text-red-400';
              if (line.type === 'system') color = 'text-slate-300';

              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`whitespace-pre-wrap leading-relaxed ${color}`}
                >
                  {line.content}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Prompt line with vivid Crimson Caret */}
          <div className="flex items-center space-x-2 text-crimson pt-1">
            <span className="text-white font-bold">ujjwal@noc-core</span>
            <span className="text-slate-600">:</span>
            <span className="text-crimson font-bold">~</span>
            <span className="text-slate-500 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs focus:ring-0 p-0"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            {/* Blinking Crimson Caret */}
            <span className="w-2.5 h-4 bg-crimson animate-caret-crimson inline-block shadow-crimson-sm" />
          </div>
        </div>

        {/* Command Suggestions Footer */}
        <div className="bg-obsidian-900/95 border-t border-red-600/15 px-3 py-2 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 select-none">
          <span className="text-slate-400 mr-1 hidden sm:inline">Try commands:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 hover:text-crimson border border-slate-800 hover:border-red-600/40 transition-all font-mono"
            >
              ${cmd}
            </button>
          ))}
          <span className="ml-auto text-slate-500 hidden md:inline">Press [Tab] to auto-complete</span>
        </div>
      </div>
    </div>
  );
};
