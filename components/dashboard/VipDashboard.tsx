'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { InvoicePrinter } from './InvoicePrinter';
import { CorporatePortal } from './CorporatePortal';
import { Crown, History, Building2, Award, FileText } from 'lucide-react';

export const VipDashboard: React.FC = () => {
  const { userName, loyaltyAccount, bookingHistory, activeBooking } = useUserStore();
  const [activeTab, setActiveTab] = useState<'history' | 'loyalty' | 'corporate'>('history');
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(activeBooking || bookingHistory[0]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-black">
      {/* Dashboard Top Banner */}
      <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 border-2 border-black bg-black flex items-center justify-center">
            <Crown className="w-7 h-7 text-[#C5A059]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black uppercase tracking-wider">
                {userName}
              </h2>
              <span className="text-[10px] bg-black text-white px-2.5 py-0.5 font-bold uppercase tracking-wider">
                {loyaltyAccount.tier}
              </span>
            </div>
            <p className="text-xs text-gray-600 font-medium tracking-wide mt-0.5">
              Obsidian VIP Member • Lifetime Spend: ${loyaltyAccount.lifetimeSpendUSD.toLocaleString()} USD
            </p>
          </div>
        </div>

        {/* Loyalty Quick Pill */}
        <div className="bg-white border border-gray-300 px-4 py-3 text-right">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">
            OBSIDIAN LOYALTY POINTS
          </span>
          <span className="text-xl font-extrabold text-[#C5A059]">
            {loyaltyAccount.pointsBalance.toLocaleString()} PTS
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1.5 border border-gray-200">
        <button
          onClick={() => setActiveTab('history')}
          className={`p-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'history'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-700 hover:text-black'
          }`}
        >
          <History className="w-4 h-4 text-[#C5A059]" />
          <span>Ride History & Invoices</span>
        </button>

        <button
          onClick={() => setActiveTab('loyalty')}
          className={`p-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'loyalty'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-700 hover:text-black'
          }`}
        >
          <Award className="w-4 h-4 text-[#C5A059]" />
          <span>Obsidian Club Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('corporate')}
          className={`p-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'corporate'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-700 hover:text-black'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C5A059]" />
          <span>Corporate Portal</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-300 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-black uppercase tracking-wider">
              Ride History & Tax Receipts
            </h3>

            <div className="space-y-3">
              {bookingHistory.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedInvoiceBooking(b)}
                  className={`p-4 border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    selectedInvoiceBooking.id === b.id
                      ? 'bg-gray-50 border-black shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-[#C5A059]">{b.id}</span>
                      <span className="text-[10px] text-gray-500">• {b.date} ({b.time})</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-black">{b.vehicle.name} ({b.vehicle.modelName})</p>
                    <p className="text-[11px] text-gray-600 font-normal truncate max-w-md">
                      {b.pickup} ➔ {b.dropoff}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-base font-extrabold text-black">
                      ${b.fareUSD} USD
                    </span>
                    <button className="px-3 py-1.5 bg-black text-white text-xs font-bold hover:bg-[#C5A059] hover:text-black flex items-center space-x-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InvoicePrinter booking={selectedInvoiceBooking} />
        </div>
      )}

      {activeTab === 'loyalty' && (
        <div className="bg-white border border-gray-300 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-[#C5A059]" />
              <h3 className="text-lg font-extrabold text-black uppercase tracking-wider">
                Obsidian Club Sovereign VIP Loyalty Program
              </h3>
            </div>
            <span className="text-xs text-[#C5A059] font-mono font-bold">
              Tier: {loyaltyAccount.tier}
            </span>
          </div>

          <div className="space-y-2 bg-gray-50 p-5 border border-gray-200">
            <div className="flex justify-between text-xs">
              <span className="text-gray-700 font-medium">Next Tier: Royal Sovereign</span>
              <span className="text-[#C5A059] font-mono font-bold">{loyaltyAccount.nextTierProgressPercent}% Progress</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-none overflow-hidden border border-gray-300">
              <div
                className="h-full bg-black transition-all duration-1000"
                style={{ width: `${loyaltyAccount.nextTierProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 border border-gray-200 space-y-1">
              <span className="text-sm font-extrabold text-black uppercase tracking-wider block">Complimentary Hours</span>
              <p className="text-xs text-gray-700 font-medium">{loyaltyAccount.complimentaryHoursAvailable} Hours Available</p>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200 space-y-1">
              <span className="text-sm font-extrabold text-black uppercase tracking-wider block">Guaranteed Upgrade</span>
              <p className="text-xs text-gray-700 font-medium">Maybach & Escalade vehicle swaps</p>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200 space-y-1">
              <span className="text-sm font-extrabold text-black uppercase tracking-wider block">Priority Dispatch</span>
              <p className="text-xs text-gray-700 font-medium">Dedicated lead chauffeur allocation</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'corporate' && <CorporatePortal />}
    </div>
  );
};
