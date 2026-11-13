import React, { useState, useEffect } from 'react';
import { Play, Activity, Server, Radio } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface KafkaMessage {
  id: string;
  partition: number;
  offset: number;
  key: string;
  payload: string;
  timestamp: string;
}

export const KafkaStreamVisualizer: React.FC = () => {
  const [messages, setMessages] = useState<KafkaMessage[]>([
    { id: '1', partition: 0, offset: 1042, key: 'room_alpha', payload: '{"event":"msg","user":"alice","txt":"Handshake OK"}', timestamp: '11:24:02.102' },
    { id: '2', partition: 1, offset: 914, key: 'room_beta', payload: '{"event":"typing","user":"bob"}', timestamp: '11:24:02.340' },
    { id: '3', partition: 2, offset: 809, key: 'room_gamma', payload: '{"event":"join","user":"carol"}', timestamp: '11:24:02.580' },
  ]);
  const [activePartition, setActivePartition] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [totalProduced, setTotalProduced] = useState<number>(54190);

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const p = Math.floor(Math.random() * 3);
      const rooms = ['room_alpha', 'room_beta', 'room_gamma', 'room_noc'];
      const users = ['ujjwal', 'dev_ops', 'client_node', 'broker_relay'];
      const evts = ['chat_msg', 'read_ack', 'typing_status', 'heartbeat'];

      const newMsg: KafkaMessage = {
        id: Date.now().toString(),
        partition: p,
        offset: Math.floor(1000 + Math.random() * 9000),
        key: rooms[Math.floor(Math.random() * rooms.length)],
        payload: `{"event":"${evts[Math.floor(Math.random() * evts.length)]}","user":"${users[Math.floor(Math.random() * users.length)]}"}`,
        timestamp: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
      };

      setMessages(prev => [newMsg, ...prev.slice(0, 5)]);
      setTotalProduced(prev => prev + 1);
      setActivePartition(p);
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleProduceManualEvent = () => {
    soundManager.playPacketPulse(850);
    const p = Math.floor(Math.random() * 3);
    const newMsg: KafkaMessage = {
      id: Date.now().toString(),
      partition: p,
      offset: totalProduced + 1,
      key: 'room_priority',
      payload: '{"event":"CRIMSON_DISPATCH","user":"guest_tester","payload":"RFC 6455 Socket"}',
      timestamp: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
    };
    setMessages(prev => [newMsg, ...prev.slice(0, 5)]);
    setTotalProduced(prev => prev + 1);
    setActivePartition(p);
  };

  return (
    <div className="w-full rounded-xl bg-obsidian-950/95 border border-red-600/30 p-4 font-mono text-xs overflow-hidden shadow-crimson-md space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-600/20">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-crimson animate-pulse" />
          <span className="font-bold text-white text-[11px]">
            KAFKA EVENT PIPELINE // TOPIC: [chat-events-v1]
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[10px]">
          <span className="text-slate-400">Total Offsets: <strong className="text-crimson font-bold">{totalProduced.toLocaleString()}</strong></span>
          <button
            onClick={handleProduceManualEvent}
            className="px-2.5 py-1 rounded bg-crimson text-white font-bold hover:bg-scarlet transition-colors flex items-center space-x-1 shadow-crimson-sm"
          >
            <Play className="w-3 h-3" />
            <span>Produce Event</span>
          </button>
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-2 py-1 rounded border transition-colors ${
              isStreaming ? 'bg-obsidian-800 border-slate-700 text-slate-300' : 'bg-crimson/20 border-crimson text-white'
            }`}
          >
            {isStreaming ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-1 text-center items-stretch">
        
        {/* Stage 1: Producer */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">PRODUCER CLIENTS</div>
            <div className="text-white font-bold text-xs flex items-center justify-center space-x-1">
              <Radio className="w-3.5 h-3.5 text-crimson" />
              <span>Node.js REST / WS</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Key: Hash(RoomID)</div>
          </div>
          <div className="text-[9px] text-scarlet-light font-mono pt-2">ACK: all (In-Sync Replicas)</div>
        </div>

        {/* Stage 2: Kafka Partitions */}
        <div className="md:col-span-2 p-3 rounded-lg bg-obsidian-900/90 border border-red-600/25 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>KAFKA CLUSTER (3 PARTITIONS)</span>
            <span className="text-crimson font-semibold">LEADER REPLICAS: 3/3</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            {[0, 1, 2].map((pId) => {
              const isActive = activePartition === pId;
              return (
                <div
                  key={pId}
                  className={`p-2 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-crimson/20 border-crimson text-white shadow-crimson-sm'
                      : 'bg-obsidian-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>P-{pId}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5 truncate">
                    Lag: 0 ms
                  </div>
                  <div className="text-[9px] text-scarlet-light font-mono mt-0.5 font-bold">
                    Offset Commit OK
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 3: Consumer Group */}
        <div className="p-3 rounded-lg bg-obsidian-900 border border-red-600/20 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">CONSUMER GROUP</div>
            <div className="text-white font-bold text-xs flex items-center justify-center space-x-1">
              <Server className="w-3.5 h-3.5 text-scarlet" />
              <span>ws:// Gateways</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Group: chat-workers</div>
          </div>
          <div className="text-[9px] text-crimson font-mono pt-2 font-bold">Sub-12ms Broadcast</div>
        </div>

      </div>

      {/* Live Stream Table */}
      <div className="bg-obsidian-950 rounded-lg border border-red-600/15 p-2.5 space-y-1.5 max-h-36 overflow-y-auto">
        <div className="text-[10px] text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1">
          <span>PARTITION // OFFSET</span>
          <span>ROUTING KEY</span>
          <span>PAYLOAD SNAPSHOT</span>
          <span>TIMESTAMP</span>
        </div>

        {messages.map((m) => (
          <div key={m.id} className="text-[10px] font-mono grid grid-cols-4 gap-2 text-slate-300 hover:text-white transition-colors">
            <span className="text-crimson font-bold">P{m.partition} #{m.offset}</span>
            <span className="text-white">{m.key}</span>
            <span className="truncate text-slate-400">{m.payload}</span>
            <span className="text-slate-500 text-right">{m.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
