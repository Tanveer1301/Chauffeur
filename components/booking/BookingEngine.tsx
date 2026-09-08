'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { ModeSelector } from './ModeSelector';
import { MultiStopManager } from './MultiStopManager';
import { FleetTierCard } from './FleetTierCard';
import { LuxuryAddons } from './LuxuryAddons';
import { FLEET_TIERS, EXPERIENCE_PACKAGES } from '@/data/fleet';
import { MapPin, Calendar, Clock, Plane, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingEngineProps {
  onOpenSignboardModal?: () => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({ onOpenSignboardModal }) => {
  const {
    mode,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    durationHours,
    setDurationHours,
    flightNumber,
    setFlightNumber,
    terminal,
    setTerminal,
    meetAndGreet,
    setMeetAndGreet,
    signboardName,
    setSignboardName,
    selectedPackageId,
    setSelectedPackageId,
    setCheckoutOpen,
    getFormattedFare,
  } = useBookingStore();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-300 p-6 sm:p-8 shadow-xl space-y-8 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-black uppercase tracking-[0.15em]">
            EXECUTIVE CHAUFFEUR RESERVATION
          </h2>
          <p className="text-xs text-gray-600 font-medium tracking-wide mt-1">
            Instant point-to-point, hourly as-directed, or airport VIP escort.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-gray-50 border border-gray-300 px-3.5 py-2 text-black font-extrabold tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>GUARANTEED ALL-INCLUSIVE FARE</span>
        </div>
      </div>

      {/* Mode Selector */}
      <ModeSelector />

      {/* Mode Specific Inputs */}
      {mode === 'experience' ? (
        <div className="space-y-4">
          <label className="text-xs font-extrabold text-black uppercase tracking-[0.2em] block">
            SELECT BESPOKE EXPERIENCE PACKAGE
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPERIENCE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`p-5 border transition-all cursor-pointer space-y-2 ${
                  selectedPackageId === pkg.id
                    ? 'bg-gray-50 border-black text-black shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-black text-white font-extrabold px-2.5 py-0.5 uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <span className="font-extrabold text-sm text-[#C5A059] tracking-wider">
                    ${pkg.fixedPriceUSD} USD
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-black uppercase tracking-wider">{pkg.title}</h4>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pickup & Destination Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-[0.15em] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Pickup Location / FBO Ramp</span>
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="e.g. JFK Airport Terminal 8, Teterboro TEB, or Wall St"
                className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-xs text-black font-semibold placeholder-gray-400 focus:outline-none focus:border-black tracking-wide"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-[0.15em] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Drop-Off Destination</span>
              </label>
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="e.g. The Plaza Hotel, 5th Ave"
                className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-xs text-black font-semibold placeholder-gray-400 focus:outline-none focus:border-black tracking-wide"
              />
            </div>
          </div>

          <MultiStopManager />

          {/* Date & Time Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-[0.15em] flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Pickup Date</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-[0.15em] flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Pickup Time</span>
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
              />
            </div>

            {mode === 'hourly' && (
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-black uppercase tracking-[0.15em] flex items-center justify-between">
                  <span>Duration: {durationHours} Hours</span>
                  <span className="text-[10px] text-gray-500 font-normal">Min 2h</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value))}
                  className="w-full accent-black bg-gray-200"
                />
              </div>
            )}
          </div>

          {/* Airport Intake */}
          {mode === 'airport' && (
            <div className="bg-gray-50 border border-gray-300 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-[#C5A059]" />
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-[0.15em]">
                    Aviation & Flight Intake Sync
                  </h4>
                </div>
                <span className="text-[10px] bg-black text-white font-extrabold px-2.5 py-0.5 uppercase tracking-wider">
                  Real-Time Tracking Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-gray-700 block mb-1 font-bold">Flight Number</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. AA 100 or BA 178"
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-black font-mono font-bold focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block mb-1 font-bold">Arrival Terminal</label>
                  <input
                    type="text"
                    value={terminal}
                    onChange={(e) => setTerminal(e.target.value)}
                    placeholder="e.g. Terminal 8 or FBO Gate"
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block mb-1 font-bold">Arrival Signboard Name</label>
                  <input
                    type="text"
                    value={signboardName}
                    onChange={(e) => setSignboardName(e.target.value)}
                    placeholder="e.g. LORD MONTAGUE"
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-black font-extrabold focus:outline-none focus:border-black uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-gray-200">
                <label className="flex items-center space-x-2 cursor-pointer text-xs text-black font-bold">
                  <input
                    type="checkbox"
                    checked={meetAndGreet}
                    onChange={(e) => setMeetAndGreet(e.target.checked)}
                    className="rounded accent-black"
                  />
                  <span>VIP Baggage Concierge & Terminal Meet-and-Greet (+$60)</span>
                </label>

                {onOpenSignboardModal && (
                  <button
                    type="button"
                    onClick={onOpenSignboardModal}
                    className="text-xs text-black hover:text-[#C5A059] flex items-center space-x-1 font-extrabold uppercase tracking-wider transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Preview iPad Signboard</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fleet Tiers */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold text-black uppercase tracking-[0.2em] block">
          SELECT FLEET CLASS TIER
        </label>
        <div className="grid grid-cols-1 gap-3">
          {FLEET_TIERS.map((tier) => (
            <FleetTierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      <LuxuryAddons />

      {/* Dynamic Summary Bar */}
      <div className="bg-gray-50 border border-gray-300 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-extrabold block">
            ESTIMATED ALL-INCLUSIVE FARE
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-black tracking-wider">
              {getFormattedFare()} USD
            </span>
            <span className="text-xs text-gray-600">
              (Includes fuel, tolls, gratuity & luxury amenities)
            </span>
          </div>
        </div>

        <button
          onClick={() => setCheckoutOpen(true)}
          className="w-full sm:w-auto px-8 py-4 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <span>PROCEED TO VIP CHECKOUT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
