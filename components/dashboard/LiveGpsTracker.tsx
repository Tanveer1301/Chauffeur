'use client';

import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Phone, MessageSquare, ShieldCheck, Navigation, Car, MapPin, Clock, Radio } from 'lucide-react';

export const LiveGpsTracker: React.FC = () => {
  const { activeBooking } = useUserStore();
  const [driverLat, setDriverLat] = useState(40.6413);
  const [driverLng, setDriverLng] = useState(-73.7781);
  const [etaMinutes, setEtaMinutes] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 4));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!activeBooking) return null;

  return (
    <div className="w-full max-w-5xl mx-auto bg-obsidian-card border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold/15 pb-4 gap-3">
        <div className="flex items-center space-x-2">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
              Real-Time GPS Vehicle Telemetry & Radar
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Booking Ref: <span className="font-mono text-gold-light font-bold">{activeBooking.id}</span>
            </p>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CHAUFFEUR EN ROUTE ({etaMinutes} MINS AWAY)</span>
        </span>
      </div>

      {/* Interactive Map Graphic Canvas */}
      <div className="relative w-full h-[360px] bg-gradient-to-br from-[#0D0E15] via-[#121420] to-[#0A0B10] rounded-2xl border border-gold/20 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a28_1px,transparent_1px),linear-gradient(to_bottom,#1a1a28_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* Route Line Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 120,240 C 250,180 420,280 680,120"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Destination Pin */}
        <div className="absolute right-[22%] top-[25%] flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center shadow-gold-glow animate-bounce">
            <MapPin className="w-4 h-4 text-gold" />
          </div>
          <span className="text-[10px] bg-obsidian-card border border-gold/30 text-gold-light px-2 py-0.5 rounded mt-1 font-mono">
            {activeBooking.dropoff.split(',')[0]}
          </span>
        </div>

        {/* Moving Chauffeur Vehicle Marker */}
        <div className="absolute left-[38%] top-[55%] flex flex-col items-center transition-all duration-1000">
          <div className="relative p-3 rounded-full bg-gold text-obsidian shadow-gold-glow-lg">
            <Car className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-obsidian animate-ping" />
          </div>
          <div className="bg-obsidian-card/90 border border-gold/40 px-2.5 py-1 rounded-md text-[10px] font-mono text-gold-light mt-1 shadow-md">
            SUPTA-01 • {activeBooking.vehicle.modelName}
          </div>
        </div>

        {/* Real-time telemetry overlay badge */}
        <div className="absolute bottom-4 left-4 bg-obsidian-card/90 border border-gold/30 backdrop-blur-md p-3 rounded-xl text-xs space-y-1 font-mono">
          <div className="text-gold font-bold">LAT: 40.6413 N • LNG: -73.7781 W</div>
          <div className="text-gray-300">SPEED: 34 MPH • HEADING: NW 310°</div>
          <div className="text-emerald-400">STARLINK TELEMETRY: 100% ONLINE</div>
        </div>
      </div>

      {/* Driver Profile Card */}
      <div className="bg-obsidian-elevated/70 border border-gold/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={activeBooking.driverPhoto}
            alt={activeBooking.driverName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-gold-glow"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-serif text-base font-bold text-gold-light">
                {activeBooking.driverName}
              </h4>
              <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded font-mono font-bold">
                5.0 ★ VIP LEAD CHAUFFEUR
              </span>
            </div>
            <p className="text-xs text-gray-400 font-light mt-0.5">
              Assigned Vehicle: <span className="text-gray-200">{activeBooking.vehicle.name}</span>
            </p>
            <p className="text-[11px] text-gray-400 font-mono">
              License Plate: <span className="text-gold font-bold">{activeBooking.vehiclePlate}</span>
            </p>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <a
            href={`tel:${activeBooking.driverPhone}`}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gold/15 border border-gold/40 text-gold hover:bg-gold/25 transition-all text-xs font-semibold flex items-center justify-center space-x-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver</span>
          </a>
          <a
            href={`sms:${activeBooking.driverPhone}`}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-obsidian-elevated border border-gold/30 text-gray-200 hover:text-gold transition-all text-xs font-semibold flex items-center justify-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send SMS</span>
          </a>
        </div>
      </div>
    </div>
  );
};
