'use client';

import React from 'react';
import { useFleetStore } from '@/store/useFleetStore';
import { useBookingStore } from '@/store/useBookingStore';
import { FLEET_TIERS } from '@/data/fleet';
import { VehicleCategory } from '@/types';
import { Palette, Eye, RotateCw, Check, Disc } from 'lucide-react';

export const ConfiguratorPanel: React.FC = () => {
  const {
    selectedVehicleId,
    setSelectedVehicleId,
    paintColor,
    setPaintColor,
    paintFinish,
    setPaintFinish,
    rimStyle,
    setRimStyle,
    tintLevel,
    setTintLevel,
    interiorMode,
    setInteriorMode,
    autoRotate,
    setAutoRotate,
  } = useFleetStore();

  const { setSelectedVehicle, setActiveTab } = useBookingStore();

  const colorSwatches = [
    { name: 'Obsidian Black', hex: '#0B0B0E' },
    { name: 'Brushed Gold', hex: '#C5A059' },
    { name: 'Pearl White', hex: '#F4F4F6' },
    { name: 'Emerald Velvet', hex: '#0F2C23' },
    { name: 'Royal Sapphire', hex: '#0E1D38' },
  ];

  const rimOptions = [
    { id: 'gold-spoke', label: 'Gold Spoke' },
    { id: 'black-concave', label: 'Gloss Black' },
    { id: 'chrome', label: 'Chrome' },
  ] as const;

  const tintOptions = [
    { level: 0.1, label: 'Clear 10%' },
    { level: 0.85, label: 'Executive 85%' },
    { level: 0.98, label: 'Limo 98%' },
  ];

  const handleVehicleSelect = (id: VehicleCategory) => {
    setSelectedVehicleId(id);
    setSelectedVehicle(id);
  };

  return (
    <div className="w-full max-w-sm bg-[#0E0E12] border border-gold/30 p-5 shadow-2xl space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gold/20 pb-3">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-gold" />
          <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em]">
            3D STUDIO CONFIGURATOR
          </h3>
        </div>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 border text-xs flex items-center space-x-1 font-bold tracking-wider uppercase transition-colors ${
            autoRotate ? 'bg-gold border-gold text-black' : 'border-gray-800 text-gray-400'
          }`}
          title="Toggle Auto 360° Orbit"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="text-[10px]">360°</span>
        </button>
      </div>

      {/* Fleet Model Selector Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] block">
          SELECT FLEET CLASS
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FLEET_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => handleVehicleSelect(tier.id)}
              className={`p-2.5 text-left border transition-all text-xs flex flex-col justify-between ${
                selectedVehicleId === tier.id
                  ? 'bg-gold border-gold text-black font-extrabold shadow-md'
                  : 'bg-[#14141A] border-gold/20 text-gray-300 hover:border-gold/40'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider truncate">
                {tier.name}
              </span>
              <span className={`text-[9px] font-mono font-bold mt-1 ${selectedVehicleId === tier.id ? 'text-black' : 'text-gold'}`}>
                From ${tier.baseRate} USD
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Exterior Paint Swatches */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] flex items-center justify-between">
          <span>PAINT COLOR</span>
          <span className="text-[10px] text-gold font-bold">
            {colorSwatches.find((c) => c.hex === paintColor)?.name}
          </span>
        </label>
        <div className="flex items-center space-x-3 pt-1">
          {colorSwatches.map((c) => (
            <button
              key={c.hex}
              onClick={() => setPaintColor(c.hex)}
              className={`w-7 h-7 rounded-full border-2 transition-transform duration-200 relative flex items-center justify-center ${
                paintColor === c.hex
                  ? 'border-gold scale-110 shadow-lg'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {paintColor === c.hex && (
                <Check className={`w-3.5 h-3.5 ${c.hex === '#F4F4F6' ? 'text-black' : 'text-gold'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Paint Finish Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] block">
          FINISH TEXTURE
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#14141A] p-1 border border-gold/20">
          {(['metallic', 'satin', 'pearl'] as const).map((finish) => (
            <button
              key={finish}
              onClick={() => setPaintFinish(finish)}
              className={`py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                paintFinish === finish
                  ? 'bg-gold text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {finish}
            </button>
          ))}
        </div>
      </div>

      {/* Rim Style Options */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] flex items-center space-x-1">
          <Disc className="w-3.5 h-3.5 text-gold" />
          <span>WHEEL RIMS</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {rimOptions.map((rim) => (
            <button
              key={rim.id}
              onClick={() => setRimStyle(rim.id)}
              className={`p-2 text-[10px] font-bold text-center border uppercase tracking-wider transition-all ${
                rimStyle === rim.id
                  ? 'bg-gold border-gold text-black'
                  : 'bg-[#14141A] border-gold/20 text-gray-400 hover:border-gold/40'
              }`}
            >
              {rim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Window Tint */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] block">
          ACOUSTIC GLASS TINT
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {tintOptions.map((opt) => (
            <button
              key={opt.level}
              onClick={() => setTintLevel(opt.level)}
              className={`py-1.5 text-[10px] font-bold text-center border tracking-wider uppercase transition-all ${
                tintLevel === opt.level
                  ? 'bg-gold border-gold text-black'
                  : 'bg-[#14141A] border-gold/20 text-gray-400 hover:border-gold/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interior Mode Toggle */}
      <button
        onClick={() => setInteriorMode(!interiorMode)}
        className={`w-full py-2.5 border text-xs font-extrabold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all ${
          interiorMode
            ? 'bg-gold border-gold text-black shadow-md'
            : 'bg-[#14141A] border-gold/30 text-gold hover:bg-gold/10'
        }`}
      >
        <Eye className="w-4 h-4" />
        <span>{interiorMode ? 'Exterior View' : 'Inspect Luxury Cabin'}</span>
      </button>

      {/* Book Configured Vehicle */}
      <button
        onClick={() => {
          setSelectedVehicle(selectedVehicleId);
          setActiveTab('booking');
        }}
        className="w-full py-3 bg-gold text-black font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors shadow-lg"
      >
        BOOK THIS CONFIGURATION
      </button>
    </div>
  );
};
