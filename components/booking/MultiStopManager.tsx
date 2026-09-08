'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Plus, Trash2, MapPin, GripVertical } from 'lucide-react';

export const MultiStopManager: React.FC = () => {
  const { waypoints, addWaypoint, updateWaypoint, removeWaypoint } = useBookingStore();

  return (
    <div className="space-y-2.5">
      {waypoints.map((waypoint, index) => (
        <div
          key={waypoint.id}
          className="flex items-center space-x-2 bg-obsidian-elevated/50 p-2 rounded-xl border border-gold/15 transition-all"
        >
          <GripVertical className="w-4 h-4 text-gray-500 cursor-grab" />
          <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-[10px] font-mono text-gold font-bold">
            {index + 1}
          </div>
          <input
            type="text"
            placeholder={`Waypoint Stop #${index + 1} address (e.g. Wall St offices, Helipad)`}
            value={waypoint.address}
            onChange={(e) => updateWaypoint(waypoint.id, e.target.value)}
            className="flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeWaypoint(waypoint.id)}
            className="text-gray-500 hover:text-red-400 p-1 transition-colors"
            title="Remove Stop"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addWaypoint}
        className="flex items-center space-x-2 text-xs text-gold hover:text-gold-bright transition-colors font-medium pt-1"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Intermediate Waypoint Stop (+$45/stop)</span>
      </button>
    </div>
  );
};
