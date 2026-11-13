import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Building, ShieldCheck } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const RealtyFlowPreview: React.FC = () => {
  const [leadsCount, setLeadsCount] = useState<number>(142);
  const [pipelineValuation, setPipelineValuation] = useState<number>(4.2);

  const handleSimulateLead = () => {
    soundManager.playPacketPulse(650);
    setLeadsCount(prev => prev + 1);
    setPipelineValuation(prev => parseFloat((prev + 0.15).toFixed(2)));
  };

  return (
    <div className="w-full rounded-xl bg-obsidian-950/95 border border-red-600/30 p-4 font-mono text-xs overflow-hidden shadow-crimson-md space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-600/20">
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4 text-crimson" />
          <span className="font-bold text-white text-[11px]">
            REALTYFLOW CRM // MULTI-TENANT ANALYTICS ENGINE
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSimulateLead}
            className="px-2.5 py-1 rounded bg-crimson text-white font-bold hover:bg-scarlet transition-colors text-[10px] shadow-crimson-sm"
          >
            + Ingest New Lead
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>ACTIVE PIPELINE</span>
            <TrendingUp className="w-3.5 h-3.5 text-crimson" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            ${pipelineValuation}M
          </div>
          <div className="text-[9px] text-scarlet-light font-mono mt-0.5 font-bold">
            +18.4% velocity vs last sprint
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>MANAGED CLIENTS</span>
            <Users className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            {leadsCount} Leads
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">
            Multi-Tenant Partitioned
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>TRANSACTION CLOSURE</span>
            <ShieldCheck className="w-3.5 h-3.5 text-crimson" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            94.2% SLA
          </div>
          <div className="text-[9px] text-crimson font-mono mt-0.5 font-bold">
            Automated Escalation Triggers
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] text-slate-400 flex items-center justify-between">
          <span>DEAL FUNNEL STAGES</span>
          <span className="text-crimson text-[9px] font-bold">MongoDB Aggregation Pipeline</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <div className="p-2 rounded-lg bg-obsidian-900 border border-red-600/20">
            <span className="text-slate-400 block text-[9px]">STAGE 1</span>
            <span className="font-bold text-crimson">Inquiry (48)</span>
          </div>
          <div className="p-2 rounded-lg bg-obsidian-900 border border-slate-800">
            <span className="text-slate-400 block text-[9px]">STAGE 2</span>
            <span className="font-bold text-slate-200">Tour Set (34)</span>
          </div>
          <div className="p-2 rounded-lg bg-obsidian-900 border border-scarlet/30">
            <span className="text-slate-400 block text-[9px]">STAGE 3</span>
            <span className="font-bold text-scarlet-light">Offer (22)</span>
          </div>
          <div className="p-2 rounded-lg bg-obsidian-900 border border-crimson/50">
            <span className="text-slate-400 block text-[9px]">STAGE 4</span>
            <span className="font-bold text-white">Closed (38)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
