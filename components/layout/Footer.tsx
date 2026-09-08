'use client';

import React from 'react';
import { Crown, Phone, Mail, MapPin, ShieldCheck, Lock, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050507] border-t border-gold/30 pt-16 pb-12 overflow-hidden text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold/20">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 border border-gold flex items-center justify-center bg-black">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white uppercase tracking-[0.2em]">
                  SUPTA CONCIERGE
                </h3>
                <p className="text-[10px] text-gold uppercase tracking-[0.25em] font-semibold">
                  Service LLC • New York City
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4 font-normal tracking-wide">
              Pinnacle private aviation transfers, corporate roadshows, and executive chauffeur logistics engineered for high-net-worth individuals and VIP delegations.
            </p>
            <div className="space-y-2 text-xs font-medium tracking-wide">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span className="font-mono text-gold">631-535-3942</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>supta@suptaconcierge.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Manhattan • JFK • Teterboro (TEB)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-extrabold text-gold mb-4 uppercase tracking-[0.2em]">
              SERVICES & SPECIALTIES
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wide">
              {[
                'Private Chauffeur (2026 Escalade ESV & Maybach)',
                'Airport & Private Aviation Transfers',
                'Corporate Financial Roadshows',
                'Secure Hourly / As-Directed Booking',
                'Bespoke Concierge Logistics & Security',
                'Wedding & Red Carpet Gala Escorts',
              ].map((service, idx) => (
                <li key={idx} className="flex items-center space-x-2 hover:text-gold transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-gold" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Airports */}
          <div>
            <h4 className="text-xs font-extrabold text-gold mb-4 uppercase tracking-[0.2em]">
              PRIVATE AVIATION FBOs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between border-b border-gold/15 pb-1.5">
                <span className="text-white font-medium">Teterboro Airport (TEB)</span>
                <span className="text-gold text-[10px] font-bold uppercase">Signature / Meridian</span>
              </li>
              <li className="flex justify-between border-b border-gold/15 pb-1.5">
                <span className="text-white font-medium">John F. Kennedy (JFK)</span>
                <span className="text-gold text-[10px] font-bold uppercase">Terminal 4 & 8 VIP</span>
              </li>
              <li className="flex justify-between border-b border-gold/15 pb-1.5">
                <span className="text-white font-medium">Westchester County (HPN)</span>
                <span className="text-gold text-[10px] font-bold uppercase">Million Air</span>
              </li>
              <li className="flex justify-between border-b border-gold/15 pb-1.5">
                <span className="text-white font-medium">Republic Airport (FRG)</span>
                <span className="text-gold text-[10px] font-bold uppercase">Modern Aviation</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-white font-medium">Downtown Heliport</span>
                <span className="text-gold text-[10px] font-bold uppercase">JRB VIP Gate</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Obsidian Club */}
          <div>
            <h4 className="text-xs font-extrabold text-gold mb-4 uppercase tracking-[0.2em]">
              OBSIDIAN VIP CLUB
            </h4>
            <p className="text-xs text-gray-400 mb-3 tracking-wide">
              Receive private invitations to fleet launches, complimentary upgrade credits, and executive dispatch reports.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Executive Email Address..."
                  className="w-full bg-[#0E0E12] border border-gold/40 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold tracking-wide"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-gold text-black font-extrabold px-3 text-xs hover:bg-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center space-x-4 text-[11px] text-gray-400 font-medium tracking-wider">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>$5M VIP Liability</span>
              </span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-gold" />
                <span>NDAA Compliant</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium tracking-wide">
          <div>
            <p>© {new Date().getFullYear()} Supta Concierge Service LLC. All rights reserved. NYC - Global VIP Logistics.</p>
            <p className="text-[10px] text-gold mt-0.5">Founder / Principal Chauffeur: Supta Saha</p>
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0 text-[11px]">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Executive Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Corporate Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
