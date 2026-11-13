import React, { useState } from 'react';
import { ShieldCheck, X, Check, Award, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/sound';
import { CERTIFICATIONS } from '../../data/portfolioData';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const cert = CERTIFICATIONS[activeTab];

  if (!isOpen) return null;

  const triggerVerificationSuccess = () => {
    soundManager.playSuccessChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff003c', '#e11d48', '#ffffff']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-xl border border-red-600/40 shadow-crimson-lg overflow-hidden font-mono bg-obsidian-950/98">
        
        {/* Header */}
        <div className="bg-obsidian-900 border-b border-red-600/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-crimson/15 border border-crimson/40 flex items-center justify-center text-crimson shadow-crimson-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-crimson tracking-wider uppercase font-bold">
                OFFICIAL CREDENTIAL VERIFICATION
              </div>
              <div className="text-[11px] text-slate-400">
                Cryptographically Signed Verification Protocol
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playKeyClick();
              onClose();
            }}
            className="p-1 rounded-lg bg-obsidian-800 text-slate-400 hover:text-white border border-slate-700 hover:border-crimson"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-obsidian-900/90 px-6 pt-3 gap-2 overflow-x-auto text-xs">
          {CERTIFICATIONS.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playKeyClick();
                setActiveTab(idx);
              }}
              className={`pb-2.5 px-3 border-b-2 font-mono transition-all ${
                activeTab === idx
                  ? 'border-crimson text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.badgeType.toUpperCase()}: {c.code || c.title.substring(0, 15)}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
          {/* Badge & Status Strip */}
          <div className="p-4 rounded-xl bg-obsidian-900 border border-red-600/30 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400">ISSUING AUTHORITY</span>
              <div className="text-base font-bold text-white font-sans">{cert.issuer}</div>
              <div className="text-crimson font-bold">{cert.title}</div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-crimson/20 text-white border border-crimson font-bold shadow-crimson-sm">
                <ShieldCheck className="w-4 h-4 text-crimson" />
                <span>{cert.status}</span>
              </span>
              <div className="text-[10px] text-slate-400 mt-1">ID: {cert.verificationId}</div>
            </div>
          </div>

          {/* Core Tested Domains */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-300 uppercase tracking-wider flex items-center space-x-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-crimson" />
              <span>Tested Curriculum & Domain Mastery</span>
            </div>
            <div className="space-y-1.5">
              {cert.domains.map((domain, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 flex items-start space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-crimson flex-shrink-0 mt-0.5" />
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Signature Hash */}
          <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/15 font-mono text-[10px] text-slate-400 break-all space-y-1">
            <div className="text-crimson font-bold">DIGITAL AUDIT FINGERPRINT (SHA-256):</div>
            <div className="text-slate-300">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={triggerVerificationSuccess}
              className="px-4 py-2 rounded-lg bg-crimson text-white font-bold hover:bg-scarlet transition-all flex items-center space-x-2 shadow-crimson-md"
            >
              <Check className="w-4 h-4" />
              <span>Simulate Cryptographic Audit</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-obsidian-800 text-slate-300 hover:text-white border border-slate-700"
            >
              Close Inspector
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
