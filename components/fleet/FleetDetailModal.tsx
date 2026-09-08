'use client';

import React from 'react';
import { VehicleTier } from '@/types';
import { useBookingStore } from '@/store/useBookingStore';
import { X, Users, Briefcase, Check, ShieldCheck, ArrowRight, Star, Sparkles } from 'lucide-react';

interface FleetDetailModalProps {
  tier: VehicleTier | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FleetDetailModal: React.FC<FleetDetailModalProps> = ({ tier, isOpen, onClose }) => {
  const { setSelectedVehicle, setActiveTab } = useBookingStore();

  if (!isOpen || !tier) return null;

  const handleBookNow = () => {
    setSelectedVehicle(tier.id);
    onClose();
    setActiveTab('booking');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20 pb-10 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-gray-300 shadow-2xl overflow-hidden my-auto text-black">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="font-extrabold text-xs tracking-[0.15em] uppercase text-black">
              VEHICLE SPECIFICATIONS & AMENITIES
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Image Banner */}
          <div className="relative w-full h-72 sm:h-80 border border-gray-300 bg-black overflow-hidden shadow-md">
            <img
              src={tier.image}
              alt={tier.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-gray-700">
              {tier.modelName}
            </div>
            <div className="absolute bottom-4 right-4 bg-black text-[#C5A059] px-4 py-1.5 font-extrabold text-sm tracking-wider uppercase border border-[#C5A059]">
              FROM ${tier.baseRate} USD / TRIP
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <span className="text-xs text-[#C5A059] font-bold uppercase tracking-[0.2em] block">
              {tier.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-[0.1em] mt-1">
              {tier.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-2">
              {tier.description}
            </p>
          </div>

          {/* Capacity Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 border border-gray-200 text-xs">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Passenger Limit</span>
              <span className="font-bold text-black flex items-center space-x-1.5 mt-1 text-sm">
                <Users className="w-4 h-4 text-[#C5A059]" />
                <span>Up to {tier.passengers} VIP Pax</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Luggage Capacity</span>
              <span className="font-bold text-black flex items-center space-x-1.5 mt-1 text-sm">
                <Briefcase className="w-4 h-4 text-[#C5A059]" />
                <span>{tier.luggage} Cases</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Hourly Rate</span>
              <span className="font-extrabold text-[#C5A059] text-sm mt-1 block">${tier.hourlyRate} USD / Hour</span>
            </div>
          </div>

          {/* Detailed Features Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]">
              Executive Cabin Amenities & Safety Protocol
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {tier.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-gray-50 p-2.5 border border-gray-200 text-gray-800 font-medium">
                  <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="text-xs">{feat}</span>
                </div>
              ))}
              <div className="flex items-center space-x-2 bg-gray-50 p-2.5 border border-gray-200 text-gray-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="text-xs">NDAA Compliant & $5M Liability Insured</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-black border border-gray-300 font-extrabold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              ← BACK TO VEHICLES
            </button>

            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-8 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-black transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <span>RESERVE THIS {tier.modelName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
