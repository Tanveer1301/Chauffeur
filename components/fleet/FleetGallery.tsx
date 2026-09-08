'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { FLEET_TIERS } from '@/data/fleet';
import { VehicleCategory, VehicleTier } from '@/types';
import { FleetDetailModal } from './FleetDetailModal';
import { Users, Briefcase, ArrowRight, Check, Sparkles, Info } from 'lucide-react';

export const FleetGallery: React.FC = () => {
  const { setSelectedVehicle, setActiveTab } = useBookingStore();
  const [activeTierId, setActiveTierId] = useState<VehicleCategory>('sedan');
  const [selectedColor, setSelectedColor] = useState('Obsidian Black');
  const [detailModalTier, setDetailModalTier] = useState<VehicleTier | null>(null);

  const selectedTier = FLEET_TIERS.find((v) => v.id === activeTierId) || FLEET_TIERS[0];

  const colorOptions = [
    { name: 'Obsidian Black', hex: '#0B0B0E' },
    { name: 'Brushed Gold', hex: '#C5A059' },
    { name: 'Pearl White', hex: '#F4F4F6' },
    { name: 'Midnight Velvet', hex: '#0F2C23' },
  ];

  const handleBookVehicle = (id: VehicleCategory) => {
    setSelectedVehicle(id);
    setActiveTab('booking');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-black">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 px-3.5 py-1 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LUXURY EXECUTIVE FLEET</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-[0.15em]">
          NEW YORK FLEET SHOWCASE
        </h2>
        <p className="text-xs text-gray-600 font-medium tracking-wide">
          Click any vehicle card to view detailed specifications, cabin amenities, and instant reservation options.
        </p>
      </div>

      {/* Fleet Tier Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-100 p-2 border border-gray-200">
        {FLEET_TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setActiveTierId(tier.id)}
            className={`p-3.5 text-left transition-all ${
              activeTierId === tier.id
                ? 'bg-black text-white font-extrabold shadow-sm'
                : 'bg-white text-gray-700 hover:text-black hover:bg-gray-200/50'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-[0.15em] block">
              {tier.name}
            </span>
            <span className={`text-[10px] font-mono font-bold mt-1 block ${activeTierId === tier.id ? 'text-[#C5A059]' : 'text-gray-500'}`}>
              From ${tier.baseRate} USD
            </span>
          </button>
        ))}
      </div>

      {/* Main Selected Vehicle Showcase Card */}
      <div className="bg-white border border-gray-300 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: High-Res Image (Clickable for full modal) */}
        <div className="space-y-4">
          <div
            onClick={() => setDetailModalTier(selectedTier)}
            className="relative w-full h-72 sm:h-80 border border-gray-300 bg-black overflow-hidden shadow-md cursor-pointer group"
          >
            <img
              src={selectedTier.image}
              alt={selectedTier.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-gray-700">
              {selectedTier.modelName}
            </div>
            <div className="absolute bottom-3 right-3 bg-black text-[#C5A059] text-[10px] px-2.5 py-1 border border-[#C5A059] font-bold uppercase tracking-widest flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>Click for Full Specs</span>
            </div>
          </div>

          {/* Color Switcher */}
          <div className="flex items-center justify-between bg-gray-50 p-3 border border-gray-200">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-[0.15em]">
              Exterior Color:
            </span>
            <div className="flex items-center space-x-3">
              {colorOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === c.name ? 'border-[#C5A059] scale-110' : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <Check className="w-3 h-3 text-[#C5A059]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] text-[#C5A059] font-extrabold uppercase tracking-[0.2em] block">
              {selectedTier.subtitle}
            </span>
            <h3 className="text-2xl font-extrabold text-black uppercase tracking-[0.1em] mt-1">
              {selectedTier.name}
            </h3>
            <p className="text-xs text-gray-600 font-normal leading-relaxed mt-2">
              {selectedTier.description}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 border border-gray-200 text-xs">
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Capacity</span>
              <span className="font-bold text-black flex items-center space-x-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{selectedTier.passengers} VIP Pax</span>
              </span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Luggage</span>
              <span className="font-bold text-black flex items-center space-x-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{selectedTier.luggage} Cases</span>
              </span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Base Rate</span>
              <span className="font-extrabold text-black mt-0.5 block">${selectedTier.baseRate} USD</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setDetailModalTier(selectedTier)}
              className="flex-1 py-3 bg-gray-100 text-black border border-gray-300 font-extrabold text-xs uppercase tracking-[0.15em] hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
            >
              <Info className="w-4 h-4 text-[#C5A059]" />
              <span>Full Details & Specs</span>
            </button>

            <button
              onClick={() => handleBookVehicle(selectedTier.id)}
              className="flex-1 py-3 bg-black text-white font-extrabold text-xs uppercase tracking-[0.15em] hover:bg-[#C5A059] hover:text-black transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Reserve Vehicle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <FleetDetailModal
        tier={detailModalTier}
        isOpen={!!detailModalTier}
        onClose={() => setDetailModalTier(null)}
      />
    </div>
  );
};
