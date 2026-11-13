import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Server, ExternalLink, CheckCircle2, Layers, Cpu, Code2, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { ProjectFilterCategory, ProjectItem } from '../../types/portfolio';
import { soundManager } from '../../utils/sound';
import { TiltCard } from '../ui/TiltCard';

// Interactive Embedded Previews
import { NetworkTopologyVisualizer } from './NetworkTopologyVisualizer';
import { KafkaStreamVisualizer } from './KafkaStreamVisualizer';
import { IoTHardwareSchematic } from './IoTHardwareSchematic';
import { RealtyFlowPreview } from './RealtyFlowPreview';
import { RoomMatrixPreview } from './RoomMatrixPreview';
import { SnakeEnginePreview } from './SnakeEnginePreview';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectFilterCategory>('all');

  // Exact 4 Tabs from Prompt
  const filterTabs: { id: ProjectFilterCategory; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'all', label: 'All Systems', icon: Layers, count: FEATURED_PROJECTS.length },
    { id: 'fullstack', label: 'Full-Stack & Distributed', icon: Server, count: FEATURED_PROJECTS.filter(p => p.tabCategory === 'fullstack').length },
    { id: 'networks', label: 'Networks & Infrastructure', icon: Network, count: FEATURED_PROJECTS.filter(p => p.tabCategory === 'networks').length },
    { id: 'embedded', label: 'Embedded & IoT', icon: Cpu, count: FEATURED_PROJECTS.filter(p => p.tabCategory === 'embedded').length },
  ];

  const filteredProjects = FEATURED_PROJECTS.filter(project => {
    if (activeTab === 'all') return true;
    return project.tabCategory === activeTab;
  });

  const renderInteractiveWidget = (project: ProjectItem) => {
    switch (project.interactiveType) {
      case 'topology':
        return <NetworkTopologyVisualizer />;
      case 'kafka_stream':
        return <KafkaStreamVisualizer />;
      case 'iot_schematic':
        return <IoTHardwareSchematic />;
      case 'crm_analytics':
        return <RealtyFlowPreview />;
      case 'room_matrix':
        return <RoomMatrixPreview />;
      case 'game_loop':
        return <SnakeEnginePreview />;
      default:
        return null;
    }
  };

  return (
    <section id="topology-lab" className="py-16 lg:py-24 relative border-t border-red-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-crimson font-mono text-xs uppercase tracking-wider mb-2">
              <Code2 className="w-4 h-4 text-crimson animate-pulse" />
              <span>// SECTION 04: ARCHITECTURE & SYSTEMS SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Distributed Systems, Networks & IoT
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
              Filter through full-stack distributed engines, Cisco campus network backbones, and low-level embedded hardware systems.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 flex items-center space-x-2 bg-obsidian-850 px-3 py-1.5 rounded-lg border border-red-600/25 shadow-crimson-sm">
            <Sparkles className="w-3.5 h-3.5 text-crimson" />
            <span className="text-white font-semibold">Interactive Simulators Attached</span>
          </div>
        </div>

        {/* Category Filter Tabs with Smooth Spring layoutId */}
        <div className="flex flex-wrap gap-2 border-b border-red-600/15 pb-4">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playKeyClick();
                  setActiveTab(tab.id);
                }}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all border ${
                  isActive
                    ? 'bg-crimson/20 text-white border-crimson font-bold shadow-crimson-sm'
                    : 'bg-obsidian-850/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-crimson' : 'text-slate-400'}`} />
                <span>[{tab.label}]</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-crimson/40 text-white' : 'bg-obsidian-800 text-slate-400'}`}>
                  {tab.count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadgeCrimson"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson shadow-crimson-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Project Cards with Layout Morphing (stiffness: 300, damping: 25) */}
        <motion.div layout className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  layout: { type: 'spring', stiffness: 300, damping: 25 },
                  opacity: { duration: 0.25 },
                }}
                className="space-y-4"
              >
                {/* Main Project Card with 3D Tilt & Magnetic Hover */}
                <TiltCard
                  enableTilt={true}
                  borderBeam={true}
                  className="p-6 sm:p-8 space-y-6"
                >
                  {/* Top Metadata & Action Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-crimson/15 border border-crimson/35 text-[11px] font-mono text-scarlet-light font-bold">
                        <span>{project.displayBadge}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                        {project.title}
                      </h3>
                      <p className="text-sm font-mono text-crimson font-semibold">
                        {project.headline}
                      </p>
                    </div>

                    {/* Actions & Metrics */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundManager.playKeyClick()}
                          className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 hover:text-white border border-red-600/30 hover:border-crimson font-mono text-xs transition-all shadow-sm"
                        >
                          <GithubIcon className="w-4 h-4 text-crimson" />
                          <span>Source Code</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
                        </a>
                      )}

                      {/* Metrics Pills */}
                      <div className="flex items-center space-x-2">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-obsidian-900 border border-red-600/20 text-center font-mono">
                            <div className="text-xs font-bold text-white">{m.value}</div>
                            <div className="text-[9px] text-slate-400">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Overview Text */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {project.overview}
                  </p>

                  {/* Architecture Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
                    {project.architectureDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-lg bg-obsidian-900/90 border border-red-600/15">
                        <CheckCircle2 className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
                        <p className="text-slate-300 leading-relaxed">
                          <strong className="text-white">{detail.split(':')[0]}:</strong>
                          {detail.substring(detail.indexOf(':') + 1)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-red-600/15">
                    <span className="text-[11px] font-mono text-slate-400 mr-2">Architecture Stack:</span>
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="text-xs font-mono bg-obsidian-900 text-slate-200 px-2.5 py-1 rounded-lg border border-red-600/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltCard>

                {/* Interactive Embedded Visualizer Widget */}
                {renderInteractiveWidget(project)}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
