'use client';

import React, { useState, useEffect } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useUserStore } from '@/store/useUserStore';
import { Crown, Car, Calendar, Plane, User, Building2, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useBookingStore();
  const { isCorporateMode, toggleCorporateMode } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'booking', label: 'RESERVE', icon: Calendar },
    { id: 'fleet', label: 'FLEET GALLERY', icon: Car },
    { id: 'flight', label: 'FLIGHT RADAR', icon: Plane },
    { id: 'dashboard', label: 'VIP DASHBOARD', icon: User },
    { id: 'corporate', label: 'CORPORATE', icon: Building2 },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 shadow-sm'
          : 'bg-white py-5 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('booking')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-black flex items-center justify-center border border-black group-hover:bg-[#C5A059] transition-colors">
              <Crown className="w-5 h-5 text-[#C5A059] group-hover:text-black transition-colors" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-[0.25em] text-black uppercase">
                  SUPTA
                </span>
                <span className="text-xs tracking-[0.3em] text-[#C5A059] font-extrabold uppercase">
                  CONCIERGE
                </span>
              </div>
              <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase font-semibold">
                New York VIP Chauffeur
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1 bg-gray-50 p-1.5 border border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-black hover:text-[#C5A059] hover:bg-gray-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-gray-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleCorporateMode}
              className={`hidden md:flex items-center space-x-1.5 text-xs px-3.5 py-2 border font-extrabold tracking-wider uppercase transition-all ${
                isCorporateMode
                  ? 'bg-[#C5A059] border-[#C5A059] text-black'
                  : 'bg-white border-gray-300 text-black hover:border-black'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isCorporateMode ? 'ENT VIP' : 'Personal'}</span>
            </button>

            <a
              href="tel:6315353942"
              className="hidden sm:flex items-center space-x-2 text-xs text-black border border-gray-300 hover:border-black px-3.5 py-2 font-mono font-bold tracking-wider transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>631-535-3942</span>
            </a>

            <button
              onClick={() => setActiveTab('booking')}
              className="px-5 py-2.5 bg-black text-white font-extrabold text-xs tracking-widest uppercase hover:bg-[#C5A059] hover:text-black transition-colors shadow-sm"
            >
              Book Chauffeur
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-around mt-3 pt-2 border-t border-gray-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 text-[10px] font-extrabold tracking-widest transition-colors ${
                  isActive ? 'text-[#C5A059]' : 'text-black'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
