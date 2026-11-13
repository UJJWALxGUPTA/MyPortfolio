import React, { useState } from 'react';
import { BedDouble } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface Room {
  id: string;
  type: 'Deluxe' | 'Suite' | 'Standard';
  status: 'Vacant' | 'Occupied' | 'Reserved' | 'Maintenance';
  rate: number;
}

export const RoomMatrixPreview: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '101', type: 'Deluxe', status: 'Occupied', rate: 180 },
    { id: '102', type: 'Deluxe', status: 'Vacant', rate: 180 },
    { id: '103', type: 'Suite', status: 'Reserved', rate: 320 },
    { id: '104', type: 'Standard', status: 'Vacant', rate: 120 },
    { id: '201', type: 'Suite', status: 'Occupied', rate: 320 },
    { id: '202', type: 'Standard', status: 'Vacant', rate: 120 },
    { id: '203', type: 'Deluxe', status: 'Maintenance', rate: 180 },
    { id: '204', type: 'Suite', status: 'Vacant', rate: 320 },
  ]);

  const toggleRoomStatus = (id: string) => {
    soundManager.playKeyClick();
    setRooms(prev => prev.map(r => {
      if (r.id !== id) return r;
      const nextStatus = r.status === 'Vacant' ? 'Occupied' : r.status === 'Occupied' ? 'Reserved' : 'Vacant';
      return { ...r, status: nextStatus };
    }));
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Vacant': return 'text-white bg-crimson/20 border-crimson/50 shadow-crimson-sm';
      case 'Occupied': return 'text-red-400 bg-red-950/40 border-red-700/50';
      case 'Reserved': return 'text-scarlet-light bg-scarlet/15 border-scarlet/40';
      case 'Maintenance': return 'text-slate-400 bg-obsidian-900 border-slate-800';
    }
  };

  return (
    <div className="w-full rounded-xl bg-obsidian-950/95 border border-red-600/30 p-4 font-mono text-xs overflow-hidden shadow-crimson-md space-y-3">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-red-600/20">
        <div className="flex items-center space-x-2">
          <BedDouble className="w-4 h-4 text-crimson" />
          <span className="font-bold text-white text-[11px]">
            HOTEL OPERATIONS // REAL-TIME ROOM OCCUPANCY MATRIX (JAVA / JDBC)
          </span>
        </div>

        <div className="text-[10px] text-slate-400">
          Click any room to cycle state
        </div>
      </div>

      {/* Grid of rooms */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => toggleRoomStatus(room.id)}
            className={`p-2.5 rounded-lg border text-left transition-all hover:scale-102 ${getStatusColor(room.status)}`}
          >
            <div className="flex items-center justify-between font-bold text-white text-xs">
              <span>Room {room.id}</span>
              <span className="text-[10px] text-slate-300">{room.type}</span>
            </div>
            <div className="text-[10px] font-mono mt-1 flex items-center justify-between">
              <span>{room.status}</span>
              <span>${room.rate}/day</span>
            </div>
          </button>
        ))}
      </div>

      {/* SQL JDBC Prepared Statement Log */}
      <div className="p-2 rounded-lg bg-obsidian-900 border border-red-600/20 text-[10px] text-slate-400 flex items-center justify-between">
        <span>JDBC PREPARED STATEMENT:</span>
        <code className="text-crimson font-bold">UPDATE rooms SET status=? WHERE room_id=? AND version_lock=?</code>
        <span className="text-scarlet-light font-bold">ACID OK</span>
      </div>
    </div>
  );
};
