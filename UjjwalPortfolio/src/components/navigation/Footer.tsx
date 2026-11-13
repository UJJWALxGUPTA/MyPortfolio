import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

interface FooterProps {
  onOpenResumeModal: () => void;
  onOpenVerifyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal, onOpenVerifyModal }) => {
  const scrollToTop = () => {
    soundManager.playKeyClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-jet border-t border-red-600/20 py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-crimson" />
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-slate-700">//</span>
              <span className="text-crimson font-normal text-xs">CCNA & FULL-STACK ENGINEER</span>
            </div>
            <p className="text-slate-400 text-[11px] max-w-md">
              High-Availability Network Backbones, Distributed Kafka Systems, and Low-Level Embedded Telemetry.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playKeyClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-slate-800 hover:border-crimson text-[11px] transition-colors shadow-sm"
              title="GitHub Profile (UJJWALxGUPTA)"
            >
              <GithubIcon className="w-3.5 h-3.5 text-crimson" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playKeyClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-slate-800 hover:border-crimson text-[11px] transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-crimson" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => {
                soundManager.playKeyClick();
                onOpenVerifyModal();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-scarlet-light border border-red-600/30 text-[11px] transition-colors shadow-sm"
            >
              Verify CCNA Hash
            </button>

            <button
              onClick={() => {
                soundManager.playPacketPulse();
                onOpenResumeModal();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-crimson hover:text-white border border-red-600/30 text-[11px] transition-colors shadow-sm"
            >
              Extract Resume Profile
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-slate-300 hover:text-crimson border border-slate-800 transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Meta Telemetry Strip */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>ASN: <strong className="text-white">{PERSONAL_INFO.asn}</strong></span>
            <span>•</span>
            <span>GATEWAY: <strong className="text-white">{PERSONAL_INFO.gatewayIp}</strong></span>
            <span>•</span>
            <span>MTU: <strong className="text-white">1500 BYTES</strong></span>
            <span>•</span>
            <span>ROUTING: <strong className="text-crimson font-bold">OSPF AREA 0</strong></span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Ujjwal Gupta. All packets cryptographically signed & verified.
          </div>
        </div>

      </div>
    </footer>
  );
};
