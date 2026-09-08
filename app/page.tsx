'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { BookingEngine } from '@/components/booking/BookingEngine';
import { FleetGallery } from '@/components/fleet/FleetGallery';
import { FlightTracker } from '@/components/flight/FlightTracker';
import { CuratedPackages } from '@/components/sections/CuratedPackages';
import { VipDashboard } from '@/components/dashboard/VipDashboard';
import { Testimonials } from '@/components/sections/Testimonials';
import { CheckoutModal } from '@/components/booking/CheckoutModal';
import { DigitalSignboardModal } from '@/components/flight/DigitalSignboardModal';
import { ConciergeFloatingWidget } from '@/components/widgets/ConciergeFloatingWidget';

export default function Home() {
  const { activeTab } = useBookingStore();
  const [isSignboardOpen, setIsSignboardOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050507] text-gray-100 font-sans selection:bg-gold selection:text-black relative overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Viewports */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20 space-y-16">
        {/* Tab 1: Booking Engine */}
        {activeTab === 'booking' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            <BookingEngine onOpenSignboardModal={() => setIsSignboardOpen(true)} />
            <FleetGallery />
            <CuratedPackages />
          </div>
        )}

        {/* Tab 2: Fleet Gallery */}
        {activeTab === 'fleet' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <FleetGallery />
            <BookingEngine onOpenSignboardModal={() => setIsSignboardOpen(true)} />
          </div>
        )}

        {/* Tab 3: Flight Radar */}
        {activeTab === 'flight' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <FlightTracker onOpenSignboardModal={() => setIsSignboardOpen(true)} />
            <BookingEngine onOpenSignboardModal={() => setIsSignboardOpen(true)} />
          </div>
        )}

        {/* Tab 4: VIP Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <VipDashboard />
          </div>
        )}

        {/* Tab 5: Corporate Portal */}
        {activeTab === 'corporate' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <VipDashboard />
          </div>
        )}

        <Testimonials />
      </div>

      {/* Modals & Widgets */}
      <CheckoutModal />
      <DigitalSignboardModal isOpen={isSignboardOpen} onClose={() => setIsSignboardOpen(false)} />
      <ConciergeFloatingWidget />

      {/* Footer */}
      <Footer />
    </main>
  );
}
