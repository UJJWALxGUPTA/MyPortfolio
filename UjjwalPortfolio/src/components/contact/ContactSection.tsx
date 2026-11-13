import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/sound';
import { PERSONAL_INFO } from '../../data/portfolioData';

type HandshakeStep = 'IDLE' | 'SYN' | 'SYN_ACK' | 'ACK' | 'DELIVERED';

export const ContactSection: React.FC = () => {
  const [sourceAddress, setSourceAddress] = useState('');
  const [returnGateway, setReturnGateway] = useState('');
  const [messagePayload, setMessagePayload] = useState('');
  const [handshakeStep, setHandshakeStep] = useState<HandshakeStep>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTransmitPacket = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sourceAddress.trim() || !returnGateway.trim() || !messagePayload.trim()) {
      setErrorMessage('Error: Source Address, Return Gateway, and Message Payload are strictly required for TCP packet delivery.');
      return;
    }

    setErrorMessage('');
    soundManager.playPacketPulse(600);
    setHandshakeStep('SYN');

    // Step 1: SYN
    setTimeout(() => {
      soundManager.playPacketPulse(800);
      setHandshakeStep('SYN_ACK');
    }, 800);

    // Step 2: SYN-ACK
    setTimeout(() => {
      soundManager.playPacketPulse(1000);
      setHandshakeStep('ACK');
    }, 1600);

    // Step 3: ACK & Delivered
    setTimeout(() => {
      soundManager.playSuccessChime();
      setHandshakeStep('DELIVERED');
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff003c', '#e11d48', '#ffffff']
      });
    }, 2400);
  };

  const handleResetForm = () => {
    soundManager.playKeyClick();
    setHandshakeStep('IDLE');
    setSourceAddress('');
    setReturnGateway('');
    setMessagePayload('');
  };

  return (
    <section id="tcp-handshake" className="py-16 lg:py-24 relative border-t border-red-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div>
          <div className="flex items-center space-x-2 text-crimson font-mono text-xs uppercase tracking-wider mb-2">
            <Send className="w-4 h-4 text-crimson animate-pulse" />
            <span>// SECTION 06: TCP 3-WAY HANDSHAKE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Crimson Terminal Packet Dispatch
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
            Transmit an encapsulated message payload directly to Ujjwal Gupta via simulated low-level TCP 3-Way Handshake protocol.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Packet Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Gateways & Endpoints */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-xl border border-red-600/30 p-6 space-y-5 bg-obsidian-850/95 shadow-crimson-md">
              <h3 className="font-mono text-xs font-bold text-crimson uppercase tracking-wider">
                Direct Communication Gateways
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => soundManager.playKeyClick()}
                  className="flex items-start space-x-3 p-3.5 rounded-lg bg-obsidian-900 border border-red-600/20 hover:border-crimson hover:shadow-crimson-sm transition-all group"
                >
                  <Mail className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">RETURN ROUTE / EMAIL</span>
                    <span className="text-white group-hover:text-crimson transition-colors font-semibold">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => soundManager.playKeyClick()}
                  className="flex items-start space-x-3 p-3.5 rounded-lg bg-obsidian-900 border border-red-600/20 hover:border-crimson hover:shadow-crimson-sm transition-all group"
                >
                  <Phone className="w-4 h-4 text-scarlet flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">VOICE INTERFACE / PHONE</span>
                    <span className="text-white group-hover:text-crimson transition-colors font-semibold">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start space-x-3 p-3.5 rounded-lg bg-obsidian-900 border border-red-600/20">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">BASE STATION / LOCATION</span>
                    <span className="text-white font-semibold">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-red-600/15">
                <span className="text-[11px] font-mono text-slate-400 block mb-3">
                  External Network Uplinks:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playKeyClick()}
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-crimson text-slate-300 hover:text-white font-mono text-xs transition-all shadow-sm"
                  >
                    <LinkedinIcon className="w-4 h-4 text-crimson" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playKeyClick()}
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-crimson text-slate-300 hover:text-white font-mono text-xs transition-all shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4 text-crimson" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* NOC Status Indicator */}
              <div className="p-3 rounded-lg bg-obsidian-950 border border-crimson/30 font-mono text-[11px] text-crimson flex items-center space-x-2 shadow-crimson-sm">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-crimson" />
                <span className="font-bold">Socket Port 443 / TLS 1.3 Active for Inbound Traffic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Crimson Terminal Packet Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-xl border border-red-600/30 overflow-hidden shadow-crimson-md bg-obsidian-850/95">
              
              {/* Form Title Bar */}
              <div className="bg-obsidian-950/95 border-b border-red-600/20 px-6 py-3.5 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-crimson" />
                  <span className="text-white font-bold">
                    PACKET TRANSMISSION TERMINAL (TCP/IP)
                  </span>
                </div>
                <div className="text-[10px] text-crimson font-bold">
                  FLAG: SYN_SENT
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {handshakeStep === 'DELIVERED' ? (
                  <div className="py-8 text-center space-y-4 font-mono">
                    <div className="w-14 h-14 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center text-crimson mx-auto shadow-crimson-md">
                      <CheckCircle className="w-7 h-7 text-crimson animate-pulse" />
                    </div>
                    
                    {/* Red Neon Confirmation Banner */}
                    <div className="p-4 rounded-xl bg-crimson/15 border border-crimson text-white shadow-crimson-md max-w-md mx-auto space-y-1">
                      <h4 className="text-lg font-extrabold font-sans text-glow-crimson">
                        [200 OK] Handshake Completed & Payload Delivered!
                      </h4>
                      <p className="text-xs text-slate-200">
                        TCP Connection Established. Message dispatched directly to {PERSONAL_INFO.email}.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-obsidian-950 border border-red-600/20 text-[11px] text-slate-300 max-w-md mx-auto text-left space-y-1">
                      <div>SYN: Seq=100 &rarr; <span className="text-white font-bold">ESTABLISHED</span></div>
                      <div>SYN-ACK: Seq=300, Ack=101 &rarr; <span className="text-crimson font-bold">RECEIVED</span></div>
                      <div>ACK: Seq=101, Ack=301 &rarr; <span className="text-scarlet-light font-bold">CONFIRMED</span></div>
                      <div className="text-crimson font-bold">Payload byte count: {messagePayload.length} bytes</div>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-all"
                    >
                      Transmit Another Packet
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTransmitPacket} className="space-y-4 font-mono text-xs">
                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-crimson text-white text-xs flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-crimson" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Source Address */}
                    <div className="space-y-1.5">
                      <label className="text-slate-200 font-semibold block text-[11px]">
                        SOURCE ADDRESS / NAME:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe / 192.168.1.105"
                        value={sourceAddress}
                        onChange={(e) => setSourceAddress(e.target.value)}
                        disabled={handshakeStep !== 'IDLE'}
                        className="w-full bg-obsidian-950 border border-red-600/25 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-crimson focus:shadow-crimson-sm transition-all"
                      />
                    </div>

                    {/* Return Gateway */}
                    <div className="space-y-1.5">
                      <label className="text-slate-200 font-semibold block text-[11px]">
                        RETURN GATEWAY / EMAIL:
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. enterprise.lead@domain.com"
                        value={returnGateway}
                        onChange={(e) => setReturnGateway(e.target.value)}
                        disabled={handshakeStep !== 'IDLE'}
                        className="w-full bg-obsidian-950 border border-red-600/25 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-crimson focus:shadow-crimson-sm transition-all"
                      />
                    </div>

                    {/* Message Payload */}
                    <div className="space-y-1.5">
                      <label className="text-slate-200 font-semibold block text-[11px]">
                        MESSAGE PAYLOAD:
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Detail network infrastructure requirements, distributed Kafka systems, or embedded hardware collaboration inquiries..."
                        value={messagePayload}
                        onChange={(e) => setMessagePayload(e.target.value)}
                        disabled={handshakeStep !== 'IDLE'}
                        className="w-full bg-obsidian-950 border border-red-600/25 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-crimson focus:shadow-crimson-sm transition-all resize-none"
                      />
                    </div>

                    {/* Animated 3-Way Handshake Step Visualizer */}
                    {handshakeStep !== 'IDLE' && (
                      <div className="p-3.5 rounded-lg bg-obsidian-950 border border-red-600/35 space-y-2">
                        <div className="text-[11px] text-slate-300 uppercase tracking-wider font-bold">
                          Handshake Negotiation in Progress...
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                          <div className={`p-2 rounded-lg border ${handshakeStep === 'SYN' ? 'bg-crimson/30 border-crimson text-white animate-pulse font-bold shadow-crimson-sm' : 'bg-obsidian-900 border-slate-800 text-slate-400'}`}>
                            1. SYN (Seq=100)
                          </div>
                          <div className={`p-2 rounded-lg border ${handshakeStep === 'SYN_ACK' ? 'bg-scarlet/30 border-scarlet text-white animate-pulse font-bold shadow-crimson-sm' : 'bg-obsidian-900 border-slate-800 text-slate-400'}`}>
                            2. SYN-ACK (Ack=101)
                          </div>
                          <div className={`p-2 rounded-lg border ${handshakeStep === 'ACK' ? 'bg-crimson border-crimson text-white animate-pulse font-bold shadow-crimson-md' : 'bg-obsidian-900 border-slate-800 text-slate-400'}`}>
                            3. ACK [ESTABLISHED]
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={handshakeStep !== 'IDLE'}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-crimson hover:bg-scarlet text-white font-bold disabled:opacity-50 transition-all shadow-crimson-md hover:shadow-crimson-lg font-mono text-xs"
                      >
                        <Send className="w-4 h-4" />
                        <span>
                          {handshakeStep === 'IDLE'
                            ? 'DISPATCH TCP SYN PACKET'
                            : 'TRANSMITTING OVER PORT 443...'}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Form Footer */}
              <div className="bg-obsidian-900/95 border-t border-red-600/15 px-6 py-2.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>ENCAPSULATION: RFC 793 TCP Segment</span>
                <span className="text-crimson font-bold">CHECKSUM: 0x4A1F VALID</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
