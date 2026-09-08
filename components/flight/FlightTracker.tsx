'use client';

import React, { useState } from 'react';
import { FlightInfo } from '@/types';
import { Plane, CheckCircle2, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';

interface FlightTrackerProps {
  onOpenSignboardModal?: () => void;
}

export const FlightTracker: React.FC<FlightTrackerProps> = ({ onOpenSignboardModal }) => {
  const [flightQuery, setFlightQuery] = useState('AA 100');
  const [flightData, setFlightData] = useState<FlightInfo>({
    flightNumber: 'AA 100',
    airline: 'American Airlines',
    airport: 'JFK International Airport (New York)',
    terminal: 'Terminal 8 - Gate 14',
    scheduledArrival: '14:15 EST',
    estimatedArrival: '14:35 EST',
    status: 'DELAYED',
    delayMinutes: 20,
    gate: 'B14',
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setFlightData({
        flightNumber: flightQuery.toUpperCase(),
        airline: flightQuery.toUpperCase().includes('BA') ? 'British Airways' : 'American Airlines',
        airport: 'JFK International Airport (New York)',
        terminal: 'Terminal 7 - VIP Gate 4',
        scheduledArrival: '15:00 EST',
        estimatedArrival: '15:00 EST',
        status: 'ON TIME',
        delayMinutes: 0,
        gate: 'A7',
      });
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 p-6 sm:p-8 shadow-xl space-y-6 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-4 gap-3">
        <div className="flex items-center space-x-2">
          <Plane className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h3 className="text-base font-extrabold text-black uppercase tracking-[0.15em]">
              REAL-TIME AVIATION FLIGHT RADAR & DISPATCH SYNC
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Automated driver dispatch adjustments for private jets & commercial flights.
            </p>
          </div>
        </div>
        {onOpenSignboardModal && (
          <button
            onClick={onOpenSignboardModal}
            className="px-4 py-2 border border-black bg-black text-white text-xs font-extrabold hover:bg-[#C5A059] hover:text-black transition-colors flex items-center space-x-1.5 uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Digital iPad Signboard</span>
          </button>
        )}
      </div>

      {/* Flight Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={flightQuery}
          onChange={(e) => setFlightQuery(e.target.value)}
          placeholder="Enter Flight # (e.g. AA 100, BA 178, EK 201)..."
          className="flex-1 bg-gray-50 border border-gray-300 px-4 py-3 text-xs font-mono font-bold text-black placeholder-gray-400 focus:outline-none focus:border-black uppercase tracking-wider"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3 bg-black text-white font-extrabold text-xs uppercase tracking-[0.15em] hover:bg-[#C5A059] hover:text-black transition-colors flex items-center space-x-2 shadow-sm"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Sync Radar</span>}
        </button>
      </form>

      {/* Flight Status Box */}
      <div className="bg-gray-50 border border-gray-300 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg font-extrabold text-black">
                {flightData.flightNumber}
              </span>
              <span className="text-xs text-gray-600 font-bold">({flightData.airline})</span>
            </div>
            <p className="text-xs text-gray-600 font-medium mt-0.5">{flightData.airport}</p>
          </div>

          <div>
            {flightData.status === 'DELAYED' ? (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-3 py-1 font-extrabold uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>DELAYED +{flightData.delayMinutes} MIN</span>
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs px-3 py-1 font-extrabold uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>ON TIME SCHEDULE</span>
              </span>
            )}
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 border border-gray-200 text-xs font-semibold">
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Scheduled Arrival</span>
            <span className="font-mono text-black">{flightData.scheduledArrival}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Estimated Touchdown</span>
            <span className="font-mono text-black font-extrabold">{flightData.estimatedArrival}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Terminal & Gate</span>
            <span className="text-black">{flightData.terminal}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Chauffeur Status</span>
            <span className="text-emerald-700 font-extrabold">Auto-Dispatched</span>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-4 flex items-start space-x-3 text-xs text-black font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block uppercase tracking-wider">Automated Dispatch Sync Active</span>
            <p className="text-gray-600 font-normal text-[11px] mt-0.5">
              Supta Concierge aviation tracker has automatically notified your lead chauffeur (Julian Thorne) to adjust pickup schedule. Complimentary 60-minute wait time starts upon actual flight touchdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
