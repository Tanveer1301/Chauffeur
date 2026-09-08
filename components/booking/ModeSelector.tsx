'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { BookingMode } from '@/types';
import { Navigation, Clock, Plane, Sparkles } from 'lucide-react';

export const ModeSelector: React.FC = () => {
  const { mode, setMode } = useBookingStore();

  const modes = [
    {
      id: 'point-to-point',
      label: 'POINT-TO-POINT',
      subtitle: 'Direct Routing A to B',
      icon: Navigation,
    },
    {
      id: 'hourly',
      label: 'HOURLY CHAUFFEUR',
      subtitle: 'As-Directed Flexible (Min 2h)',
      icon: Clock,
    },
    {
      id: 'airport',
      label: 'AIRPORT TRANSFER',
      subtitle: 'Flight Tracking & Meet-Greet',
      icon: Plane,
    },
    {
      id: 'experience',
      label: 'VIP EXPERIENCE',
      subtitle: 'Curated Event Packages',
      icon: Sparkles,
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100 p-2 border border-gray-300">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMode(m.id as BookingMode)}
            className={`p-3.5 text-left transition-all duration-200 flex flex-col justify-between ${
              isActive
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-black hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-black'}`} />
            </div>
            <div>
              <p className={`text-xs font-extrabold tracking-[0.12em] uppercase ${isActive ? 'text-white' : 'text-black'}`}>
                {m.label}
              </p>
              <p className={`text-[10px] tracking-wide font-medium mt-0.5 truncate ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                {m.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
