import React, { useState } from 'react';
import { X, Download, Copy, Check, Terminal } from 'lucide-react';
import { generateResumePlainText, downloadResumeFile } from '../../utils/helpers';
import { soundManager } from '../../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const resumeText = generateResumePlainText();

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playKeyClick();
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundManager.playSuccessChime();
    downloadResumeFile();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-xl border border-red-600/40 shadow-crimson-lg overflow-hidden font-mono flex flex-col max-h-[85vh] bg-obsidian-950/98">
        
        {/* Header */}
        <div className="bg-obsidian-900 border-b border-red-600/20 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-crimson" />
            <span className="text-xs font-bold text-white tracking-wider">
              UJJWAL_GUPTA_PROFILE.TXT // TERMINAL MANIFEST
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-obsidian-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-crimson" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-crimson text-white font-bold hover:bg-scarlet text-xs transition-all shadow-crimson-sm"
              title="Download TXT/PDF manifest"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

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
        </div>

        {/* Text Area */}
        <div className="p-6 bg-obsidian-950 overflow-y-auto text-xs text-slate-300 leading-relaxed whitespace-pre font-mono flex-1 select-text">
          {resumeText}
        </div>

        {/* Footer */}
        <div className="bg-obsidian-900 border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Format: UTF-8 Terminal Profile (Full-Stack & CCNA Infrastructure)</span>
          <span className="text-crimson font-bold">READY TO DEPLOY</span>
        </div>

      </div>
    </div>
  );
};
