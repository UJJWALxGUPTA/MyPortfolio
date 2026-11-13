import React from 'react';
import { Cpu, Calendar, MapPin, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { WORK_EXPERIENCE } from '../../data/portfolioData';
import { HardwareOscilloscope } from './HardwareOscilloscope';
import { TiltCard } from '../ui/TiltCard';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="hardware-experience" className="py-16 lg:py-24 relative border-t border-red-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-crimson font-mono text-xs uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4 text-crimson animate-pulse" />
            <span>// SECTION 03: HARDWARE & NOC EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Hardware Diagnostics & Work Experience
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
            Low-level hardware telemetry, industrial laser calibration, motor driver tuning, and host control software execution.
          </p>
        </div>

        {/* 2-Column Grid: Timeline Card on Left, Interactive Oscilloscope on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Chronological Experience Card with Live Status LEDs */}
          <div className="lg:col-span-6 space-y-6">
            {WORK_EXPERIENCE.map((job) => (
              <TiltCard
                key={job.id}
                enableTilt={true}
                borderBeam={true}
                className="p-6 relative overflow-hidden"
              >
                {/* Status LED glow strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson via-scarlet to-ember" />

                {/* Role Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-80" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-crimson" />
                      </span>
                      <h3 className="text-lg font-extrabold text-white font-sans">
                        {job.role}
                      </h3>
                    </div>
                    <div className="text-sm font-semibold text-crimson font-mono mt-1">
                      {job.company}
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-400">
                    <div className="flex items-center space-x-1.5 text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-crimson" />
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Highlights Bullet points */}
                <div className="space-y-3 font-sans text-xs text-slate-300 mb-6">
                  {job.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-white">
                          {highlight.split(':')[0]}:
                        </strong>
                        {highlight.substring(highlight.indexOf(':') + 1)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hardware Tags */}
                <div className="pt-3 border-t border-red-600/15">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">
                    // Toolchains & Hardware Modules:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.hardwareTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono bg-obsidian-900 text-slate-200 px-2.5 py-1 rounded-lg border border-red-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-red-600/15 font-mono">
                  {job.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-obsidian-950 border border-red-600/15 text-center">
                      <div className="text-xs font-bold text-white">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            ))}

            {/* Hardware Note Alert */}
            <div className="p-4 rounded-xl bg-obsidian-850/80 border border-scarlet/30 font-mono text-xs text-slate-300 flex items-start space-x-3 shadow-crimson-sm">
              <Zap className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-crimson font-bold">Signal Isolation Telemetry:</span> Industrial DM542 motor drives utilize optical isolation to prevent electrical back-EMF spikes from corrupting logic signals. Digital oscilloscope tests monitor square pulse rise-times to ensure jitter remains under 50ns.
              </div>
            </div>
          </div>

          {/* Right Column: Hardware Oscilloscope Widget */}
          <div className="lg:col-span-6 w-full sticky top-28">
            <HardwareOscilloscope />

            {/* Calibration status summary */}
            <div className="mt-4 p-4 rounded-xl bg-obsidian-850/80 border border-red-600/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>DIAGNOSTIC TESTBENCH // CALIBRATION STATUS</span>
                <span className="text-crimson font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-crimson" />
                  <span>ALL CHANNELS PASS</span>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <div className="text-[10px] text-slate-400">IR Wavelength</div>
                  <div className="font-bold text-white">1064 nm</div>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <div className="text-[10px] text-slate-400">UV Wavelength</div>
                  <div className="font-bold text-scarlet-light">355 nm</div>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <div className="text-[10px] text-slate-400">Motor Pulse</div>
                  <div className="font-bold text-crimson">25 kHz</div>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-950 border border-red-600/20">
                  <div className="text-[10px] text-slate-400">Driver Model</div>
                  <div className="font-bold text-white">DM542</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
