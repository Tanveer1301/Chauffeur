'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Crown, ShieldCheck, ArrowRight, Star, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setPickupLocation, setDropoffLocation } = useBookingStore();

  return (
    <section className="relative pt-32 pb-16 bg-white overflow-hidden border-b border-gray-100">
      {/* Subtle Warm Background Radial Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[250px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-1.5 shadow-sm">
            <Crown className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-extrabold text-black tracking-[0.2em] uppercase">
              SUPTA CONCIERGE • NEW YORK CITY
            </span>
          </div>

          {/* Main Title - Pure Black with Gold Highlight */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-[0.08em] leading-[1.15] uppercase">
            PRIVATE CHAUFFEUR & <br />
            <span className="text-[#C5A059]">AVIATION LOGISTICS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-700 font-normal max-w-2xl mx-auto tracking-wide leading-relaxed">
            2026 Cadillac Escalade ESV Concierge & Mercedes-Maybach S-Class transfers for VIP delegations, executive roadshows, and private jet FBO arrivals.
          </p>

          {/* Minimalist White Search Box */}
          <div className="mt-8 p-4 bg-white border border-gray-300 shadow-xl max-w-3xl mx-auto text-left space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3.5 border border-gray-200 space-y-1">
                <label className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] font-extrabold flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pickup Location / FBO Ramp</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. JFK Airport Terminal 8 or Teterboro TEB"
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent text-black font-semibold placeholder-gray-400 focus:outline-none text-xs tracking-wide"
                />
              </div>

              <div className="bg-gray-50 p-3.5 border border-gray-200 space-y-1">
                <label className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] font-extrabold flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Drop-Off Destination</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Plaza Hotel, 5th Ave"
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-transparent text-black font-semibold placeholder-gray-400 focus:outline-none text-xs tracking-wide"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-[11px] text-gray-700 font-bold tracking-wider">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>$5M VIP Insurance</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                  <span>5.0 Rated</span>
                </span>
              </div>

              <button
                onClick={() => setActiveTab('booking')}
                className="w-full sm:w-auto px-8 py-3 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-black transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <span>Calculate Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
