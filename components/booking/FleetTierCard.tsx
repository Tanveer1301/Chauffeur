'use client';

import React, { useState } from 'react';
import { VehicleTier } from '@/types';
import { useBookingStore } from '@/store/useBookingStore';
import { FleetDetailModal } from '../fleet/FleetDetailModal';
import { Users, Briefcase, Check, Info } from 'lucide-react';

interface FleetTierCardProps {
  tier: VehicleTier;
}

export const FleetTierCard: React.FC<FleetTierCardProps> = ({ tier }) => {
  const { selectedVehicle, setSelectedVehicle, mode, durationHours } = useBookingStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isSelected = selectedVehicle === tier.id;

  const getDisplayedRate = () => {
    if (mode === 'hourly') {
      return `$${tier.hourlyRate * durationHours} (${durationHours}h)`;
    }
    return `From $${tier.baseRate}`;
  };

  return (
    <>
      <div
        onClick={() => setSelectedVehicle(tier.id)}
        className={`relative border transition-all duration-200 cursor-pointer overflow-hidden p-4 ${
          isSelected
            ? 'bg-gray-50 border-black shadow-md'
            : 'bg-white border-gray-200 hover:border-gray-400'
        }`}
      >
        {isSelected && (
          <div className="absolute top-3 right-3 bg-black text-white px-2.5 py-0.5 font-extrabold text-[10px] uppercase tracking-[0.15em] flex items-center space-x-1">
            <Check className="w-3 h-3 stroke-[3] text-[#C5A059]" />
            <span>SELECTED TIER</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-44 h-28 border border-gray-300 bg-black overflow-hidden group">
            <img
              src={tier.image}
              alt={tier.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1.5 left-2 text-[10px] text-[#C5A059] font-mono font-bold bg-black/90 px-1.5 py-0.5 border border-[#C5A059]">
              {tier.modelName}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-extrabold text-black tracking-wider uppercase">
                {tier.name}
              </h3>
              <span className="text-[10px] text-gray-500 font-bold">• {tier.subtitle}</span>
            </div>

            <p className="text-xs text-gray-600 font-normal line-clamp-1">
              {tier.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-800 pt-1 font-semibold tracking-wide">
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Up to {tier.passengers} Pax</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{tier.luggage} Luggage</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDetailOpen(true);
                }}
                className="flex items-center space-x-1 text-xs text-black hover:text-[#C5A059] font-extrabold uppercase tracking-wider transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>View Specs</span>
              </button>
            </div>
          </div>

          {/* Rate */}
          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4 min-w-[120px]">
            <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-extrabold block">
              ESTIMATED RATE
            </span>
            <span className="text-base font-extrabold text-black tracking-wider">
              {getDisplayedRate()} USD
            </span>
          </div>
        </div>
      </div>

      <FleetDetailModal
        tier={tier}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};
