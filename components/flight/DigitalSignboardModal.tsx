'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { X, Crown, Building2, Monitor } from 'lucide-react';

interface DigitalSignboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalSignboardModal: React.FC<DigitalSignboardModalProps> = ({ isOpen, onClose }) => {
  const { signboardName, setSignboardName, flightNumber } = useBookingStore();
  const [logoStyle, setLogoStyle] = useState<'crown' | 'corporate' | 'monogram'>('crown');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0E0E12] border border-gold/40 rounded-none shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 bg-[#14141A]">
          <div className="flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-gold" />
            <h3 className="text-sm font-extrabold text-white tracking-[0.2em] uppercase">
              AIRPORT TERMINAL DIGITAL SIGNBOARD BUILDER
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gold transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gold font-bold uppercase tracking-[0.15em] block mb-1">
                Passenger / Delegation Name
              </label>
              <input
                type="text"
                value={signboardName}
                onChange={(e) => setSignboardName(e.target.value.toUpperCase())}
                placeholder="e.g. LORD ALEXANDER MONTAGUE"
                className="w-full bg-[#14141A] border border-gold/30 px-4 py-2.5 text-white font-extrabold tracking-[0.2em] focus:outline-none focus:border-gold uppercase"
              />
            </div>

            <div>
              <label className="text-gold font-bold uppercase tracking-[0.15em] block mb-1">
                Header Crest / Logo Style
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#14141A] p-1 border border-gold/20">
                <button
                  onClick={() => setLogoStyle('crown')}
                  className={`py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all ${
                    logoStyle === 'crown' ? 'bg-gold text-black' : 'text-gray-400'
                  }`}
                >
                  Crown
                </button>
                <button
                  onClick={() => setLogoStyle('corporate')}
                  className={`py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all ${
                    logoStyle === 'corporate' ? 'bg-gold text-black' : 'text-gray-400'
                  }`}
                >
                  Corporate
                </button>
                <button
                  onClick={() => setLogoStyle('monogram')}
                  className={`py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all ${
                    logoStyle === 'monogram' ? 'bg-gold text-black' : 'text-gray-400'
                  }`}
                >
                  Monogram
                </button>
              </div>
            </div>
          </div>

          {/* New York High Contrast iPad Display Mockup */}
          <div className="relative w-full aspect-[4/3] max-h-[380px] bg-[#050507] border-[10px] border-[#1C1C24] p-8 flex flex-col justify-between items-center text-center overflow-hidden my-4 ring-1 ring-gold/40">
            {/* Crest Logo */}
            <div className="flex flex-col items-center pt-2">
              {logoStyle === 'crown' && (
                <div className="w-14 h-14 bg-black border border-gold flex items-center justify-center mb-2 shadow-lg">
                  <Crown className="w-8 h-8 text-gold" />
                </div>
              )}
              {logoStyle === 'corporate' && (
                <div className="w-14 h-14 bg-black border border-gold flex items-center justify-center mb-2 shadow-lg">
                  <Building2 className="w-8 h-8 text-gold" />
                </div>
              )}
              {logoStyle === 'monogram' && (
                <div className="w-14 h-14 border-2 border-gold flex items-center justify-center mb-2 text-xl font-extrabold text-gold shadow-lg">
                  {signboardName.charAt(0) || 'S'}
                </div>
              )}
              <span className="text-xs tracking-[0.35em] text-gold uppercase font-extrabold">
                SUPTA CONCIERGE NEW YORK
              </span>
            </div>

            {/* Passenger Name Display */}
            <div className="my-auto space-y-2 max-w-xl">
              <span className="text-[11px] tracking-[0.3em] text-gray-300 uppercase block font-medium">
                WELCOME & ESCORT FOR
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-white uppercase leading-tight">
                {signboardName || 'LORD ALEXANDER MONTAGUE'}
              </h1>
            </div>

            {/* Footer */}
            <div className="w-full border-t border-gold/30 pt-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
              <span className="text-gold font-bold">FLIGHT: {flightNumber || 'AA 100'}</span>
              <span className="tracking-widest">VIP ESCORT</span>
              <span className="text-gold font-bold">SUPTA-01</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gold text-black font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              SAVE SIGNBOARD SPEC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
