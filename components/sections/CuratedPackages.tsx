'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { EXPERIENCE_PACKAGES } from '@/data/fleet';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const CuratedPackages: React.FC = () => {
  const { setSelectedPackageId, setMode, setActiveTab } = useBookingStore();

  const handleSelectPackage = (id: string) => {
    setSelectedPackageId(id);
    setMode('experience');
    setActiveTab('booking');
  };

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#C5A059] uppercase tracking-[0.2em] bg-gray-50 px-3.5 py-1 border border-gray-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TAILORED LUXURY LOGISTICS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-[0.15em]">
            CURATED VIP EXPERIENCE PACKAGES
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Pre-engineered luxury transport packages with dedicated dispatch, white-glove chauffeurs, and vintage champagne service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-gray-300 hover:border-black p-6 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-black text-white font-extrabold px-2.5 py-0.5 uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-500">
                    {pkg.durationHours} Hours
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-black uppercase tracking-wider">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-normal mt-1 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-2 text-xs pt-2 border-t border-gray-100">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-800 font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="text-[11px]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">ALL-INCLUSIVE</span>
                  <span className="text-lg font-extrabold text-black">${pkg.fixedPriceUSD} USD</span>
                </div>

                <button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className="px-3.5 py-2 bg-black text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#C5A059] hover:text-black transition-colors flex items-center space-x-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
