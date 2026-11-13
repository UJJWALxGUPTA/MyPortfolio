import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Menu, X, Download, Server, Cpu, Network, Send } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('#cli-shell');

  const navLinks = [
    { label: '01. CLI Shell', href: '#cli-shell', icon: Terminal },
    { label: '02. Diagnostics', href: '#diagnostics-matrix', icon: Server },
    { label: '03. Hardware / Exp', href: '#hardware-experience', icon: Cpu },
    { label: '04. Systems Lab', href: '#topology-lab', icon: Network },
    { label: '05. CCNA Credentials', href: '#certifications', icon: Shield },
    { label: '06. TCP Handshake', href: '#tcp-handshake', icon: Send },
  ];

  const handleNavClick = (href: string) => {
    soundManager.playKeyClick();
    setActiveItem(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[33px] z-40 w-full bg-jet/85 backdrop-blur-md border-b border-red-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <a 
          href="#top" 
          onClick={() => handleNavClick('#top')}
          className="flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-obsidian-800 border border-red-600/30 flex items-center justify-center text-crimson group-hover:border-crimson group-hover:shadow-crimson-sm transition-all">
            <Terminal className="w-5 h-5 text-crimson" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold tracking-tight text-white group-hover:text-crimson transition-colors">
                UJJWAL GUPTA
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-crimson animate-pulse" />
            </div>
            <div className="font-mono text-[10px] text-slate-400 tracking-wider">
              FULL-STACK // NETWORKS // IOT // AS65001
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links with Framer Motion Sliding Active Pill */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs bg-obsidian-900/60 p-1.5 rounded-full border border-red-600/15">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeItem === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors flex items-center space-x-1.5 z-10 ${
                  isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-crimson/25 border border-crimson/60 rounded-full shadow-crimson-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-crimson' : 'opacity-70'}`} />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button: Terminal Profile / Resume */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => {
              soundManager.playPacketPulse();
              onOpenResumeModal();
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-crimson hover:text-white border border-red-600/30 hover:border-crimson text-xs font-mono transition-all shadow-sm hover:shadow-crimson-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Terminal Profile</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => {
              soundManager.playKeyClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-obsidian-800 border border-slate-800 text-slate-300 hover:text-crimson"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-jet/98 border-b border-red-600/25 px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeItem === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block px-3 py-2 rounded-lg border flex items-center space-x-2 ${
                  isActive
                    ? 'bg-crimson/20 text-white border-crimson'
                    : 'text-slate-300 hover:text-crimson hover:bg-obsidian-900 border-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-crimson" />
                <span>{link.label}</span>
              </a>
            );
          })}

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                soundManager.playPacketPulse();
                onOpenResumeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-obsidian-800 text-crimson border border-red-600/30 text-xs font-mono"
            >
              <Download className="w-4 h-4" />
              <span>Download Terminal Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
