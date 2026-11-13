import React from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';
import { TiltCard } from '../ui/TiltCard';

interface CertificationsSectionProps {
  onOpenVerifyModal: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onOpenVerifyModal }) => {
  return (
    <section id="certifications" className="py-16 lg:py-24 relative border-t border-red-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div>
          <div className="flex items-center space-x-2 text-crimson font-mono text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-crimson animate-pulse" />
            <span>// SECTION 05: CREDENTIALS & ACADEMIC AUDIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Certifications & Academic Foundations
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
            Verified network engineering credentials, vendor-agnostic Linux proficiencies, and electronics & telecommunication degree.
          </p>
        </div>

        {/* ================= CERTIFICATIONS GRID ================= */}
        <div>
          <h3 className="font-mono text-sm font-bold text-crimson uppercase tracking-wider mb-6 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-crimson" />
            <span>Industry Accreditations</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <TiltCard
                key={cert.id}
                enableTilt={true}
                borderBeam={true}
                className="p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[10px] bg-crimson/15 text-white border border-crimson/40 px-2 py-0.5 rounded font-bold flex items-center space-x-1 shadow-crimson-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                      <span>{cert.status}</span>
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white font-sans group-hover:text-crimson transition-colors">
                    {cert.title}
                  </h4>

                  {cert.code && (
                    <div className="font-mono text-xs text-crimson mt-1 font-bold">
                      Exam Code: {cert.code}
                    </div>
                  )}

                  <div className="font-mono text-[11px] text-slate-400 mt-2">
                    ID: {cert.verificationId}
                  </div>

                  <div className="mt-4 pt-3 border-t border-red-600/15 space-y-1.5">
                    {cert.domains.slice(0, 3).map((d, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-red-600/15">
                  <button
                    onClick={() => {
                      soundManager.playKeyClick();
                      onOpenVerifyModal();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-obsidian-800 hover:bg-crimson text-slate-200 hover:text-white border border-red-600/30 hover:border-crimson font-mono text-xs transition-all shadow-sm hover:shadow-crimson-sm"
                  >
                    <span>Inspect Credential Hash</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* ================= ACADEMIC EDUCATION TIMELINE ================= */}
        <div>
          <h3 className="font-mono text-sm font-bold text-slate-200 uppercase tracking-wider mb-6 flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-scarlet" />
            <span>Academic Qualifications</span>
          </h3>

          <div className="space-y-4">
            {EDUCATION_DATA.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl border border-red-600/15 hover:border-crimson/40 p-6 transition-all bg-obsidian-850/80"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white font-sans">
                      {edu.degree}
                    </h4>
                    <div className="text-sm font-mono text-crimson font-semibold mt-0.5">
                      {edu.institution}
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-base font-bold text-white block">
                      {edu.score}
                    </span>
                    <span className="text-slate-400">{edu.period}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-mono mb-2">
                  Focus: {edu.specialization}
                </div>

                {edu.highlights.length > 0 && (
                  <div className="space-y-1 font-sans text-xs text-slate-400 pt-2 border-t border-slate-800">
                    {edu.highlights.map((h, hIdx) => (
                      <p key={hIdx} className="leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
