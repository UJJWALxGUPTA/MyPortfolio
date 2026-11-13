import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layers, Server, Terminal, Cpu, Network, Shield, ChevronRight, Activity, Wrench } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { SKILLS_DATA } from '../../data/portfolioData';
import { SkillItem, SkillCategory } from '../../types/portfolio';
import { TiltCard } from '../ui/TiltCard';

export const DiagnosticsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(SKILLS_DATA[0]);

  // 4 Core Obsidian Red Categories according to prompt
  const categories: { id: SkillCategory | 'all'; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'all', label: 'All Systems', icon: Layers, count: SKILLS_DATA.length },
    { id: 'networking', label: 'Networks & Protocols', icon: Network, count: SKILLS_DATA.filter(s => s.category === 'networking').length },
    { id: 'backend_distributed', label: 'Full-Stack & Distributed', icon: Server, count: SKILLS_DATA.filter(s => s.category === 'backend_distributed').length },
    { id: 'embedded_iot', label: 'Embedded & EDA', icon: Cpu, count: SKILLS_DATA.filter(s => s.category === 'embedded_iot' || s.category === 'tools_eda').length },
    { id: 'os_scripting', label: 'System & Analysis Tools', icon: Terminal, count: SKILLS_DATA.filter(s => s.category === 'os_scripting').length },
  ];

  const filteredSkills = SKILLS_DATA.filter(skill => {
    let matchesCategory = activeCategory === 'all';
    if (activeCategory === 'networking') matchesCategory = skill.category === 'networking';
    if (activeCategory === 'backend_distributed') matchesCategory = skill.category === 'backend_distributed';
    if (activeCategory === 'embedded_iot') matchesCategory = skill.category === 'embedded_iot' || skill.category === 'tools_eda';
    if (activeCategory === 'os_scripting') matchesCategory = skill.category === 'os_scripting';

    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (skill.commandExample && skill.commandExample.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleSelectSkill = (skill: SkillItem) => {
    soundManager.playKeyClick();
    setSelectedSkill(skill);
  };

  return (
    <section id="diagnostics-matrix" className="py-16 lg:py-24 relative border-t border-red-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-crimson font-mono text-xs uppercase tracking-wider mb-2">
              <Activity className="w-4 h-4 text-crimson animate-pulse" />
              <span>// SECTION 02: TELEMETRY & SKILLS MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Interactive Diagnostics Matrix
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
              Architectural capabilities across Cisco network suites, distributed Kafka streaming, low-level microcontrollers, and system analysis tools.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Kafka, OSPF, Ki-Cad, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian-850 border border-red-600/25 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-400 focus:outline-none focus:border-crimson focus:shadow-crimson-sm transition-all"
            />
          </div>
        </div>

        {/* Category Tabs with Animated Spring Pill */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playKeyClick();
                  setActiveCategory(cat.id);
                }}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all border ${
                  isActive
                    ? 'bg-crimson/20 text-white border-crimson font-bold shadow-crimson-sm'
                    : 'bg-obsidian-850/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-crimson' : 'text-slate-400'}`} />
                <span>[{cat.label}]</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-crimson/40 text-white' : 'bg-obsidian-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matrix Grid: Left Skills Cards, Right Packet Inspector Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Skill Cards List with 3D Tilt */}
          <div className="lg:col-span-7 space-y-3">
            {filteredSkills.length === 0 ? (
              <div className="p-8 rounded-xl border border-slate-800 bg-obsidian-850/50 text-center font-mono text-xs text-slate-400">
                No telemetry signatures matching "{searchQuery}".
              </div>
            ) : (
              filteredSkills.map(skill => {
                const isSelected = selectedSkill?.id === skill.id;
                return (
                  <TiltCard
                    key={skill.id}
                    enableTilt={true}
                    borderBeam={isSelected}
                    onClick={() => handleSelectSkill(skill)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-crimson bg-obsidian-800 shadow-crimson-md'
                        : 'border-red-600/15 hover:border-red-600/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-sans font-semibold text-sm text-white group-hover:text-crimson transition-colors">
                            {skill.name}
                          </span>
                          {skill.osiLayer && (
                            <span className="font-mono text-[10px] bg-crimson/10 text-crimson border border-crimson/25 px-2 py-0.5 rounded">
                              {skill.osiLayer}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 font-sans mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0 font-mono">
                        <span className="text-xs font-bold text-crimson">
                          {skill.proficiencyPercent}%
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {skill.level}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Tags */}
                    <div className="space-y-2 pt-1 font-mono">
                      <div className="w-full h-1 bg-jet rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-ember to-crimson transition-all duration-500"
                          style={{ width: `${skill.proficiencyPercent}%` }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px]">
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-obsidian-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-crimson group-hover:translate-x-1 transition-transform flex items-center font-bold">
                          Inspect Dissector <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                );
              })
            )}
          </div>

          {/* Right: Dynamic Packet & Telemetry Inspector Card */}
          <div className="lg:col-span-5 sticky top-28">
            {selectedSkill ? (
              <div className="glass-panel rounded-xl border border-red-600/30 overflow-hidden shadow-crimson-md bg-obsidian-850/95">
                {/* Header */}
                <div className="bg-obsidian-950/95 border-b border-red-600/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-crimson font-mono text-xs">
                      <Shield className="w-3.5 h-3.5" />
                      <span>DISSECTOR // {selectedSkill.id.toUpperCase()}</span>
                    </div>
                    <span className="font-mono text-[10px] text-crimson bg-crimson/15 px-2 py-0.5 rounded border border-crimson/30 font-bold">
                      {selectedSkill.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedSkill.name}
                  </h3>
                  {selectedSkill.protocolStandard && (
                    <div className="font-mono text-xs text-crimson mt-0.5">
                      Standard: {selectedSkill.protocolStandard}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-4 font-mono text-xs">
                  {/* Detailed Description */}
                  <div className="space-y-1 font-sans">
                    <div className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                      // Architectural Implementation
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {selectedSkill.description}
                    </p>
                  </div>

                  {/* Wire Format / Record Anatomy */}
                  {selectedSkill.packetHeaderSummary && (
                    <div className="space-y-1.5">
                      <div className="text-slate-400 text-[11px] font-mono uppercase tracking-wider flex items-center justify-between">
                        <span>// Wire Format / Record Anatomy</span>
                        <span className="text-crimson text-[10px]">Binary Protocol</span>
                      </div>
                      <div className="p-2.5 rounded bg-obsidian-950 border border-red-600/20 text-[11px] text-slate-200 break-words leading-relaxed font-mono">
                        {selectedSkill.packetHeaderSummary}
                      </div>
                    </div>
                  )}

                  {/* CLI Command / Code Syntax Example */}
                  {selectedSkill.commandExample && (
                    <div className="space-y-1.5">
                      <div className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                        // Execution Syntax
                      </div>
                      <div className="p-2.5 rounded bg-obsidian-950 border border-red-600/20 text-scarlet-light font-mono text-[11px] flex items-center justify-between overflow-x-auto">
                        <code>{selectedSkill.commandExample}</code>
                      </div>
                    </div>
                  )}

                  {/* Protocol Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div className="p-2 rounded bg-obsidian-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">OSI / Firmware Layer</div>
                      <div className="text-xs text-white font-semibold mt-0.5">
                        {selectedSkill.osiLayer || 'Cross-Platform'}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-obsidian-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Status</div>
                      <div className="text-xs text-crimson font-semibold mt-0.5 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
                        <span>OPERATIONAL</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link to CLI */}
                  <div className="pt-2">
                    <a
                      href="#cli-shell"
                      onClick={() => soundManager.playKeyClick()}
                      className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-crimson hover:text-white border border-red-600/30 text-xs font-mono transition-all"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Test in Interactive CLI Shell</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
