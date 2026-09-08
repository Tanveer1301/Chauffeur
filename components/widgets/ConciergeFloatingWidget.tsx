'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { FLEET_TIERS } from '@/data/fleet';
import { MessageCircle, Phone, MessageSquare, Bot, X, Sparkles, ChevronUp } from 'lucide-react';
import { AiConciergeModal } from './AiConciergeModal';

export const ConciergeFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const { selectedVehicle, pickupLocation, dropoffLocation, getFormattedFare } = useBookingStore();
  const vehicle = FLEET_TIERS.find((v) => v.id === selectedVehicle) || FLEET_TIERS[0];

  // Context aware query string for WhatsApp
  const generateContextualMessage = () => {
    const text = `Hello Supta Concierge Service LLC,\n\nI would like to inquire about reserving an executive ${vehicle.name} (${vehicle.modelName}).\n\nPickup: ${pickupLocation}\nDropoff: ${dropoffLocation}\nEstimated Fare: ${getFormattedFare()}\n\nPlease confirm chauffeur availability.`;
    return encodeURIComponent(text);
  };

  const whatsappUrl = `https://wa.me/16315353942?text=${generateContextualMessage()}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        {/* Expanded Concierge Action Menu */}
        {isOpen && (
          <div className="bg-obsidian-card/95 border border-gold/40 rounded-2xl p-4 shadow-2xl space-y-2.5 w-64 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 text-gray-200">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <span className="font-serif text-xs font-bold text-gold uppercase tracking-wider">
                Direct Concierge Hotline
              </span>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gold">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-all text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="block">WhatsApp Instant Concierge</span>
                <span className="text-[9px] text-emerald-400/80 font-normal">Pre-filled booking draft</span>
              </div>
            </a>

            {/* Phone Call */}
            <a
              href="tel:6315353942"
              className="flex items-center space-x-3 p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold-light hover:bg-gold/20 transition-all text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <div>
                <span className="block">Direct VIP Hotline</span>
                <span className="text-[9px] text-gold/80 font-mono">631-535-3942</span>
              </div>
            </a>

            {/* Direct SMS */}
            <a
              href={`sms:6315353942?body=${generateContextualMessage()}`}
              className="flex items-center space-x-3 p-2.5 rounded-xl bg-obsidian-elevated border border-gold/20 text-gray-300 hover:text-gold transition-all text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4 text-gold shrink-0" />
              <span>Send Direct SMS Intake</span>
            </a>

            {/* AI Assistant Chat Modal Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAiModalOpen(true);
              }}
              className="w-full flex items-center space-x-3 p-2.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-obsidian font-serif font-bold text-xs hover:brightness-110 shadow-gold-glow transition-all"
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>AI VIP Concierge Assistant</span>
            </button>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-obsidian shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          title="Open Direct VIP Concierge Hotline"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-serif font-bold text-xs uppercase tracking-wider hidden sm:inline">
              24/7 Concierge
            </span>
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-obsidian animate-ping" />
        </button>
      </div>

      <AiConciergeModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
