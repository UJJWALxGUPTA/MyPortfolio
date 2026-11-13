import React, { useEffect, useRef, useState } from 'react';
import { Activity, Play, Pause } from 'lucide-react';
import { soundManager } from '../../utils/sound';

type SignalMode = 'dm542_pwm' | 'laser_pulse' | 'sensor_sine' | 'uart_packet';

export const HardwareOscilloscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<SignalMode>('dm542_pwm');
  const [frequency, setFrequency] = useState(25); // in kHz
  const [amplitude, setAmplitude] = useState(1.0);
  const [vpp, setVpp] = useState(5.0);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const freqRef = useRef(frequency);
  freqRef.current = frequency;
  const ampRef = useRef(amplitude);
  ampRef.current = amplitude;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let timeOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw Oscilloscope Crimson/Obsidian Grid Lines
      ctx.strokeStyle = 'rgba(255, 0, 60, 0.08)';
      ctx.lineWidth = 1;

      // Vertical divisions
      const gridX = width / 10;
      for (let x = 0; x <= width; x += gridX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal divisions
      const gridY = height / 8;
      for (let y = 0; y <= height; y += gridY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshairs
      ctx.strokeStyle = 'rgba(255, 0, 60, 0.22)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Advance time offset if running
      if (isRunningRef.current) {
        timeOffset += (freqRef.current / 25) * 0.04;
      }

      // Signal Trace in vivid Crimson Red
      ctx.lineWidth = 2.2;
      let strokeColor = '#ff003c';
      if (modeRef.current === 'laser_pulse') strokeColor = '#f43f5e';
      if (modeRef.current === 'sensor_sine') strokeColor = '#ffffff';
      if (modeRef.current === 'uart_packet') strokeColor = '#e11d48';

      ctx.strokeStyle = strokeColor;
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const scale = (height * 0.35) * ampRef.current;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 16 + timeOffset;
        let y = centerY;

        switch (modeRef.current) {
          case 'dm542_pwm': {
            const phase = (t % 2);
            const high = phase < 1.0;
            const rawVal = high ? 1 : -1;
            const noise = (Math.sin(x * 0.2) + Math.cos(x * 0.4)) * 0.03;
            y = centerY - (rawVal * scale) + (noise * scale * 0.2);
            break;
          }

          case 'laser_pulse': {
            const pulsePhase = (t * 2) % 3;
            let spike = 0;
            if (pulsePhase < 0.4) {
              spike = Math.sin((pulsePhase / 0.4) * Math.PI);
            }
            const opticalNoise = (Math.random() - 0.5) * 0.04;
            y = (centerY + scale * 0.8) - (spike * scale * 1.8) + (opticalNoise * scale);
            break;
          }

          case 'sensor_sine': {
            const primary = Math.sin(t * 3);
            const harmonic = Math.sin(t * 9) * 0.1;
            y = centerY - (primary + harmonic) * scale;
            break;
          }

          case 'uart_packet': {
            const bitIndex = Math.floor(t * 1.8);
            const pseudoBit = ((bitIndex * 37) % 7) > 3 ? 1 : -1;
            y = centerY - (pseudoBit * scale);
            break;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleModeChange = (newMode: SignalMode) => {
    soundManager.playKeyClick();
    setMode(newMode);
    if (newMode === 'dm542_pwm') {
      setFrequency(25);
      setVpp(5.0);
    } else if (newMode === 'laser_pulse') {
      setFrequency(40);
      setVpp(12.0);
    } else if (newMode === 'sensor_sine') {
      setFrequency(15);
      setVpp(3.3);
    } else {
      setFrequency(38);
      setVpp(5.0);
    }
  };

  return (
    <div className="glass-panel rounded-xl border border-red-600/30 overflow-hidden shadow-crimson-md bg-obsidian-850/95">
      {/* Title bar */}
      <div className="bg-obsidian-950/95 border-b border-red-600/20 px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-crimson animate-pulse" />
          <span className="font-mono text-xs font-bold text-white">
            HARDWARE OSCILLOSCOPE // SIGNAL DIAGNOSTICS
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-crimson animate-ping' : 'bg-slate-600'}`} />
          <span className="font-mono text-[10px] text-slate-400">
            {isRunning ? 'TRIGGER: RUN' : 'TRIGGER: HOLD'}
          </span>
        </div>
      </div>

      {/* Screen Area */}
      <div className="relative bg-obsidian-950 p-2">
        <canvas
          ref={canvasRef}
          width={500}
          height={220}
          className="w-full h-48 sm:h-56 rounded-lg bg-obsidian-950 block border border-red-600/15"
        />

        {/* Real-time Telemetry On-Screen HUD Overlay */}
        <div className="absolute top-4 left-4 font-mono text-[10px] space-y-0.5 text-slate-300 pointer-events-none bg-obsidian-950/80 p-1.5 rounded-lg border border-red-600/20">
          <div>CH1: <span className="text-white font-bold">{mode.toUpperCase()}</span></div>
          <div>Vpp: <span className="text-crimson font-bold">{vpp.toFixed(1)} V</span></div>
          <div>Freq: <span className="text-white font-bold">{frequency}.0 kHz</span></div>
          <div>Duty: <span className="text-scarlet font-bold">50.0%</span></div>
          <div>Time/Div: <span className="text-slate-400">10 µs</span></div>
        </div>

        {/* Pulse Status Badge on right */}
        <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-300 pointer-events-none bg-obsidian-900/85 px-2 py-1 rounded border border-red-600/30">
          <span className="text-crimson">●</span> LOGIC LEVEL: TTL 5.0V
        </div>
      </div>

      {/* Controls & Channel Selectors */}
      <div className="bg-obsidian-900/95 border-t border-red-600/15 p-3 space-y-3 font-mono text-xs">
        {/* Channel Selection Buttons */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleModeChange('dm542_pwm')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
              mode === 'dm542_pwm'
                ? 'bg-crimson/25 border-crimson text-white font-bold shadow-crimson-sm'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            DM542 PWM (Step/Dir)
          </button>
          <button
            onClick={() => handleModeChange('laser_pulse')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
              mode === 'laser_pulse'
                ? 'bg-scarlet/25 border-scarlet text-white font-bold shadow-crimson-sm'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Laser Q-Switch (IR/UV)
          </button>
          <button
            onClick={() => handleModeChange('sensor_sine')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
              mode === 'sensor_sine'
                ? 'bg-red-950/60 border-red-500 text-white font-bold shadow-crimson-sm'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Analog Loop (Sine)
          </button>
          <button
            onClick={() => handleModeChange('uart_packet')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
              mode === 'uart_packet'
                ? 'bg-ember/30 border-scarlet text-white font-bold shadow-crimson-sm'
                : 'bg-obsidian-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            RS-485 / UART Bus
          </button>
        </div>

        {/* Sliders and Trigger Control */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-1 border-t border-slate-800/80">
          {/* Frequency Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Frequency:</span>
              <span className="text-crimson font-bold">{frequency} kHz</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-crimson h-1 bg-jet rounded cursor-pointer"
            />
          </div>

          {/* Amplitude Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Volts / Div:</span>
              <span className="text-crimson font-bold">{amplitude.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full accent-crimson h-1 bg-jet rounded cursor-pointer"
            />
          </div>

          {/* Trigger Play/Pause Button */}
          <div className="flex items-center justify-end space-x-2 pt-2 sm:pt-0">
            <button
              onClick={() => {
                soundManager.playKeyClick();
                setIsRunning(!isRunning);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-all text-[11px] font-mono ${
                isRunning
                  ? 'bg-obsidian-800 border-red-600/40 text-slate-200 hover:bg-obsidian-700'
                  : 'bg-crimson text-white border-crimson font-bold shadow-crimson-sm'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-crimson" />
                  <span>FREEZE TRACE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>RESUME TRACE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
