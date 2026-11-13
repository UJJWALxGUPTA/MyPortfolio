import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Terminal, Shield, ArrowRight, Download, Send, Radio, Server, Cpu, Layers } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { PERSONAL_INFO, QUICK_BADGES } from '../../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';
import { TiltCard } from '../ui/TiltCard';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenVerifyModal: () => void;
}

const HERO_ROTATING_SUBHEADS = [
  "Network Engineer | CCNA Certified",
  "Full-Stack & Distributed Systems Developer",
  "Embedded Systems & Hardware Diagnostics"
];

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenVerifyModal }) => {
  const [subheadIndex, setSubheadIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect with blinking Crimson caret
  useEffect(() => {
    const currentFullText = HERO_ROTATING_SUBHEADS[subheadIndex];
    let typingSpeed = isDeleting ? 28 : 60;

    if (!isDeleting && displayText === currentFullText) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setSubheadIndex(prev => (prev + 1) % HERO_ROTATING_SUBHEADS.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, subheadIndex]);

  const iconMap: Record<string, React.ElementType> = {
    Network,
    Terminal,
    Cpu,
    Layers,
    Server,
  };

  return (
    <section id="top" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Identity, Dynamic Subhead & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-obsidian-850 border border-red-600/30 text-xs font-mono text-slate-300 shadow-crimson-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson" />
              </span>
              <span className="text-crimson font-bold">CRIMSON NOC //</span>
              <span className="text-slate-300">SYSTEMS READY & CONVERGED</span>
            </div>

            {/* Engineer Name & Dynamic Typing Subhead */}
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 text-crimson animate-pulse" />
                <span>NOC Telemetry & Distributed Systems Architect</span>
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-sans">
                {PERSONAL_INFO.name}
              </h1>

              {/* Dynamic Subhead Switcher with Blinking Crimson Caret */}
              <div className="h-8 flex items-center">
                <span className="text-base sm:text-lg font-mono text-crimson font-bold tracking-tight text-glow-crimson">
                  {displayText}
                </span>
                <span className="w-2.5 h-5 bg-crimson animate-caret-crimson ml-1 inline-block shadow-crimson-sm" />
              </div>
            </div>

            {/* Updated Core Subtext */}
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
              Designing high-availability networks, real-time event-driven systems, and hardware-software interfaces from bare metal to the cloud.
            </p>

            {/* Quick Badges with 3D Tilt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {QUICK_BADGES.map((badge, idx) => {
                const IconComponent = iconMap[badge.icon] || Server;
                return (
                  <TiltCard
                    key={idx}
                    enableTilt={true}
                    onClick={() => {
                      if (badge.label.includes('CCNA')) {
                        soundManager.playSuccessChime();
                        onOpenVerifyModal();
                      } else {
                        soundManager.playKeyClick();
                      }
                    }}
                    className="p-3 cursor-pointer group flex flex-col justify-between hover:border-crimson"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <IconComponent className="w-4 h-4 text-crimson group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-mono text-crimson font-bold bg-crimson/15 px-1.5 py-0.5 rounded border border-crimson/30">
                        ACTIVE
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-white line-clamp-1">
                        {badge.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {badge.code}
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* CTA 1: Initialize Handshake (Contact) */}
              <a
                href="#tcp-handshake"
                onClick={() => soundManager.playPacketPulse()}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-crimson text-white hover:bg-scarlet font-mono text-xs font-bold transition-all shadow-crimson-md hover:shadow-crimson-lg group"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Initialize Handshake (Contact)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* CTA 2: Inspect Topologies & Projects */}
              <a
                href="#topology-lab"
                onClick={() => soundManager.playKeyClick()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 hover:text-white border border-red-600/30 hover:border-crimson font-mono text-xs font-semibold transition-all shadow-sm"
              >
                <Network className="w-4 h-4 text-crimson" />
                <span>Inspect Topologies & Projects</span>
              </a>

              {/* CTA 3: Extract Resume (PDF) */}
              <button
                onClick={() => {
                  soundManager.playPacketPulse();
                  onOpenResumeModal();
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-crimson border border-slate-800 hover:border-crimson/50 font-mono text-xs transition-all"
              >
                <Download className="w-3.5 h-3.5 text-crimson" />
                <span>Extract Resume (PDF)</span>
              </button>
            </div>

            {/* Quick Terminal Meta line */}
            <div className="pt-2 font-mono text-[11px] text-slate-400 flex items-center space-x-4">
              <span className="flex items-center space-x-1 text-slate-300">
                <Shield className="w-3 h-3 text-crimson" />
                <span>Kafka Event Broker // AS65001</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-slate-400">OSPF Area 0 Backbones & Bare-Metal Sockets</span>
            </div>
          </motion.div>

          {/* Right Column: Hero CLI Terminal Widget */}
          <motion.div
            id="cli-shell"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            <InteractiveTerminal />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
