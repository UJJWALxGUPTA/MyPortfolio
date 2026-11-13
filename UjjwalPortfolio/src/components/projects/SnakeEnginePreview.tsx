import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const SnakeEnginePreview: React.FC = () => {
  const [score, setScore] = useState<number>(14);
  const [snakeHead, setSnakeHead] = useState<{ x: number; y: number }>({ x: 8, y: 5 });
  const [tickRate] = useState<number>(60);

  const simulateStep = () => {
    soundManager.playKeyClick();
    setSnakeHead(prev => {
      let nextX = (prev.x + 1) % 16;
      return { x: nextX, y: prev.y };
    });
    setScore(prev => prev + 1);
  };

  return (
    <div className="w-full rounded-xl bg-obsidian-950/95 border border-red-600/30 p-4 font-mono text-xs overflow-hidden shadow-crimson-md space-y-3">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-red-600/20">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-crimson" />
          <span className="font-bold text-white text-[11px]">
            PYGAME 2D ARCADE ENGINE // TICK: {tickRate} FPS
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[10px]">
          <span className="text-slate-400">Score: <strong className="text-crimson font-bold">{score}</strong></span>
          <button
            onClick={simulateStep}
            className="px-2 py-0.5 rounded bg-crimson text-white font-bold hover:bg-scarlet text-[10px] shadow-crimson-sm"
          >
            Advance Tick
          </button>
        </div>
      </div>

      {/* Mini 16x8 ASCII / Vector Grid */}
      <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 flex flex-col items-center justify-center space-y-1">
        <div className="text-[10px] text-slate-400 font-mono tracking-widest text-center">
          +--------------------------------+<br/>
          | . . . . . . . . . . . . . . . .|<br/>
          | . . . . . . . . . . . . . . . .|<br/>
          | . . . . <span className="text-scarlet">[###][###]</span><span className="text-crimson font-bold">[O]</span> &lt; HEAD .|<br/>
          | . . . . . . . . . . . . . . . .|<br/>
          | . . . . . . . . . . . <span className="text-white font-bold">[*]</span> FOOD |<br/>
          +--------------------------------+
        </div>
      </div>

      {/* Engine Math Spec */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 pt-1">
        <div className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800">
          <span>Head Coord:</span> <strong className="text-white">({snakeHead.x}, {snakeHead.y})</strong>
        </div>
        <div className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800">
          <span>Collision:</span> <strong className="text-crimson font-bold">O(1) Spatial Hash</strong>
        </div>
        <div className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800">
          <span>State:</span> <strong className="text-scarlet-light">FSM In-Game</strong>
        </div>
      </div>
    </div>
  );
};
