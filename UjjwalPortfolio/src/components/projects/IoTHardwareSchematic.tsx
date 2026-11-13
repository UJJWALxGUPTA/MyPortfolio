import React, { useState } from 'react';
import { Cpu, ShieldAlert, Key, Radio, Lock, Unlock, Zap } from 'lucide-react';
import { soundManager } from '../../utils/sound';

type AuthStep = 'STANDBY' | 'RFID_SCANNED' | 'PIN_VERIFYING' | 'ACCESS_GRANTED' | 'ACCESS_DENIED';

export const IoTHardwareSchematic: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>('STANDBY');
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [enteredPin, setEnteredPin] = useState<string>('');

  const pinDetails: Record<string, { role: string; voltage: string; bus: string }> = {
    'D10 (SDA)': { role: 'MFRC522 Slave Select (SS)', voltage: '3.3V Logic', bus: 'SPI' },
    'D13 (SCK)': { role: 'SPI Serial Clock Master', voltage: '3.3V / 5V', bus: 'SPI' },
    'D11 (MOSI)': { role: 'Master Out Slave In', voltage: '3.3V Logic', bus: 'SPI' },
    'D12 (MISO)': { role: 'Master In Slave Out', voltage: '3.3V Logic', bus: 'SPI' },
    'D2 (IRQ)': { role: 'External Hardware Interrupt (Wakeup)', voltage: 'Active LOW', bus: 'GPIO Interrupt' },
    'D9 (RST)': { role: 'MFRC522 Hardware Reset', voltage: 'Active LOW', bus: 'Reset' },
    'D7 (RELAY)': { role: 'Optocoupler Relay Trigger', voltage: '5V Active HIGH', bus: 'Actuator Logic' },
    'D3-D6': { role: 'Keypad Rows 1-4 Input with Pull-ups', voltage: '5V TTL', bus: 'Matrix Scan' },
  };

  const handleScanCard = () => {
    soundManager.playPacketPulse(700);
    setAuthStep('RFID_SCANNED');
    setEnteredPin('');

    setTimeout(() => {
      soundManager.playKeyClick();
      setAuthStep('PIN_VERIFYING');
    }, 900);
  };

  const handleKeypadPress = (digit: string) => {
    soundManager.playKeyClick();
    if (authStep !== 'PIN_VERIFYING') return;

    const nextPin = enteredPin + digit;
    setEnteredPin(nextPin);

    if (nextPin.length === 4) {
      if (nextPin === '4821') {
        soundManager.playSuccessChime();
        setAuthStep('ACCESS_GRANTED');
      } else {
        soundManager.playBeep(250, 0.3, 'sawtooth', 0.05);
        setAuthStep('ACCESS_DENIED');
      }
    }
  };

  const handleReset = () => {
    soundManager.playKeyClick();
    setAuthStep('STANDBY');
    setEnteredPin('');
  };

  return (
    <div className="w-full rounded-xl bg-obsidian-950/95 border border-red-600/30 p-4 font-mono text-xs overflow-hidden shadow-crimson-md space-y-4">
      {/* Title & Auth Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-600/20">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-crimson animate-pulse" />
          <span className="font-bold text-white text-[11px]">
            SMART DOOR LOCK // HARDWARE SCHEMATIC & MFA STATE
          </span>
        </div>

        {/* Live Hardware Latch State */}
        <div className="flex items-center space-x-2 text-[10px]">
          <span className={`px-2.5 py-0.5 rounded-lg border font-bold flex items-center space-x-1.5 ${
            authStep === 'ACCESS_GRANTED' ? 'bg-crimson/25 text-white border-crimson shadow-crimson-sm animate-pulse' :
            authStep === 'ACCESS_DENIED' ? 'bg-red-950 text-red-400 border-red-600' :
            authStep === 'PIN_VERIFYING' ? 'bg-scarlet/20 text-white border-scarlet' :
            'bg-obsidian-900 text-slate-400 border-slate-800'
          }`}>
            {authStep === 'ACCESS_GRANTED' && <Unlock className="w-3 h-3 text-crimson" />}
            {authStep === 'ACCESS_DENIED' && <ShieldAlert className="w-3 h-3 text-red-400" />}
            {authStep === 'PIN_VERIFYING' && <Key className="w-3 h-3 text-scarlet-light" />}
            {authStep === 'STANDBY' && <Lock className="w-3 h-3 text-slate-400" />}
            <span>STATUS: {authStep}</span>
          </span>

          <button
            onClick={handleReset}
            className="px-2 py-0.5 rounded bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 border border-slate-800 transition-colors"
          >
            Reset Lock
          </button>
        </div>
      </div>

      {/* Hardware Schematic Block Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Module 1: MFRC522 RFID Sensor (SPI) */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-crimson font-bold">
              <span className="flex items-center space-x-1">
                <Radio className="w-3.5 h-3.5 text-crimson" />
                <span>MFRC522 RFID MODULE</span>
              </span>
              <span>13.56 MHz</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Contactless ISO/IEC 14443A reader.
            </div>

            {/* Pinouts list with hover inspection */}
            <div className="flex flex-wrap gap-1 pt-2">
              {['D10 (SDA)', 'D13 (SCK)', 'D11 (MOSI)', 'D12 (MISO)', 'D2 (IRQ)'].map(pin => (
                <button
                  key={pin}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                  className="px-1.5 py-0.5 rounded bg-obsidian-950 text-[9px] text-slate-300 border border-red-600/20 hover:border-crimson"
                >
                  {pin}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleScanCard}
            disabled={authStep === 'PIN_VERIFYING' || authStep === 'ACCESS_GRANTED'}
            className="w-full mt-2 py-1.5 px-2 rounded-lg bg-crimson hover:bg-scarlet text-white border border-red-500/40 text-[10px] font-bold transition-all disabled:opacity-50 shadow-crimson-sm"
          >
            {authStep === 'RFID_SCANNED' ? 'Scanning UID Tag...' : 'Swipe Master RFID Tag'}
          </button>
        </div>

        {/* Module 2: Arduino MCU & Keypad Matrix */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-scarlet-light font-bold">
              <span className="flex items-center space-x-1">
                <Key className="w-3.5 h-3.5" />
                <span>4x4 MATRIX KEYPAD</span>
              </span>
              <span>MFA STAGE 2</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Enter 4-digit PIN (Correct: 4821)
            </div>

            {/* Keypad Display & Matrix Buttons */}
            <div className="my-1.5 p-1.5 rounded bg-obsidian-950 border border-red-600/30 text-center font-mono text-sm tracking-widest text-crimson font-bold">
              {enteredPin.padEnd(4, '•')}
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px]">
              {['1', '2', '3', 'A', '4', '8', '2', '1', '7', '8', '9', 'C', '*', '0', '#', 'D'].slice(0, 8).map(btn => (
                <button
                  key={btn}
                  onClick={() => handleKeypadPress(btn)}
                  disabled={authStep !== 'PIN_VERIFYING'}
                  className="p-1 rounded bg-obsidian-950 hover:bg-obsidian-800 text-slate-300 border border-slate-800 hover:border-crimson transition-colors disabled:opacity-40"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-slate-500 text-center">
            Debounce: 20ms | Lockout: 3 attempts
          </div>
        </div>

        {/* Module 3: 12V Solenoid & Opto-Isolated Relay */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-crimson font-bold">
              <span className="flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5" />
                <span>12V SOLENOID RELAY</span>
              </span>
              <span>ACTUATOR</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Opto-isolated logic with 1N4007 flyback diode protection.
            </div>

            {/* Solenoid Visual Latch */}
            <div className={`mt-3 p-3 rounded-lg border text-center font-bold transition-all ${
              authStep === 'ACCESS_GRANTED'
                ? 'bg-crimson/25 border-crimson text-white shadow-crimson-md'
                : 'bg-obsidian-950 border-slate-800 text-slate-400'
            }`}>
              <div className="text-sm font-sans">
                {authStep === 'ACCESS_GRANTED' ? 'SOLENOID UNLATCHED (12V HIGH)' : 'SOLENOID SECURED (0V LOW)'}
              </div>
              <div className="text-[10px] text-crimson font-mono mt-0.5">
                Pin: D7 (Relay Control)
              </div>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 font-mono text-center">
            Inductive Spike Clamping: Active
          </div>
        </div>

      </div>

      {/* Pinout Inspector Tooltip */}
      {hoveredPin && (
        <div className="p-2 rounded-lg bg-obsidian-900 border border-crimson text-[10px] text-slate-300 flex items-center justify-between">
          <span>PIN: <strong className="text-crimson">{hoveredPin}</strong></span>
          <span>ROLE: <strong className="text-white">{pinDetails[hoveredPin]?.role}</strong></span>
          <span>VOLTAGE: <strong className="text-scarlet-light">{pinDetails[hoveredPin]?.voltage}</strong></span>
          <span>BUS: <strong className="text-white">{pinDetails[hoveredPin]?.bus}</strong></span>
        </div>
      )}
    </div>
  );
};
