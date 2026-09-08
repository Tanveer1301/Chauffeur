'use client';

import React from 'react';
import { BookingRecord } from '@/types';
import { Crown, Printer, Download, CheckCircle, FileText } from 'lucide-react';

interface InvoicePrinterProps {
  booking: BookingRecord;
  onClose?: () => void;
}

export const InvoicePrinter: React.FC<InvoicePrinterProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-obsidian-card border border-gold/30 rounded-3xl p-8 shadow-2xl text-gray-200 space-y-6 max-w-3xl mx-auto my-6 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
      {/* Action Header (Hidden on print) */}
      <div className="flex items-center justify-between border-b border-gold/20 pb-4 print:hidden">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gold" />
          <h3 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
            Official Tax Receipt & PDF Exporter
          </h3>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-obsidian font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition-all flex items-center space-x-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Invoice</span>
        </button>
      </div>

      {/* Invoice Content Sheet */}
      <div className="space-y-8 bg-obsidian-elevated/40 p-6 rounded-2xl border border-gold/15 print:bg-white print:border-none print:p-0">
        {/* Brand Header */}
        <div className="flex items-start justify-between border-b border-gold/20 pb-6 print:border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center print:border-gray-400">
              <Crown className="w-6 h-6 text-gold print:text-black" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-gold print:text-black uppercase tracking-wider">
                SUPTA CONCIERGE SERVICE LLC
              </h2>
              <p className="text-xs text-gray-400 print:text-gray-600 uppercase tracking-widest">
                New York City VIP Chauffeur & Private Aviation
              </p>
              <p className="text-[10px] text-gold/80 print:text-gray-500 font-mono">
                Tax ID: NY-8890214-X • Phone: 631-535-3942
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-gold font-bold text-sm block print:text-black">
              INVOICE #{booking.id}
            </span>
            <span className="text-gray-400 print:text-gray-600 block">
              Date: {new Date(booking.createdAt).toLocaleDateString()}
            </span>
            <span className="text-emerald-400 print:text-emerald-700 font-bold block mt-1">
              PAID IN FULL ✓
            </span>
          </div>
        </div>

        {/* Customer & Route Information */}
        <div className="grid grid-cols-2 gap-6 text-xs print:text-gray-800">
          <div>
            <span className="text-[10px] text-gold font-bold uppercase tracking-wider block mb-1">
              Billed To Executive Client
            </span>
            <p className="font-serif font-bold text-gray-200 print:text-black">Lord Alexander Montague</p>
            <p className="text-gray-400 print:text-gray-600">Montague Capital Management LLC</p>
            <p className="text-gray-400 print:text-gray-600">767 Fifth Avenue, New York, NY</p>
          </div>

          <div>
            <span className="text-[10px] text-gold font-bold uppercase tracking-wider block mb-1">
              Service Specs & Route
            </span>
            <p className="text-gray-300 print:text-black">
              Vehicle: <span className="font-semibold">{booking.vehicle.name} ({booking.vehicle.modelName})</span>
            </p>
            <p className="text-gray-300 print:text-black">
              Pickup: <span className="font-medium">{booking.pickup}</span>
            </p>
            <p className="text-gray-300 print:text-black">
              Destination: <span className="font-medium">{booking.dropoff}</span>
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border border-gold/20 rounded-xl overflow-hidden print:border-gray-300">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-elevated text-gold font-serif uppercase tracking-wider border-b border-gold/20 print:bg-gray-100 print:text-black print:border-gray-300">
              <tr>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-center">Qty / Hours</th>
                <th className="p-3 text-right">Amount (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10 print:divide-gray-200">
              <tr>
                <td className="p-3">
                  <span className="font-semibold text-gray-200 print:text-black">
                    Executive Chauffeur Base Transport ({booking.vehicle.name})
                  </span>
                  <p className="text-[10px] text-gray-400 print:text-gray-600">
                    Includes fuel, tolls, Starlink 5G Wi-Fi, and $5M liability insurance coverage
                  </p>
                </td>
                <td className="p-3 text-center text-gray-300 print:text-black">1 Service</td>
                <td className="p-3 text-right font-mono text-gray-200 print:text-black">
                  ${booking.fareUSD - 150}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <span className="font-semibold text-gray-200 print:text-black">
                    Dom Pérignon 2012 Vintage Champagne Amenity
                  </span>
                  <p className="text-[10px] text-gray-400 print:text-gray-600">
                    Chilled with two handcrafted crystal flutes
                  </p>
                </td>
                <td className="p-3 text-center text-gray-300 print:text-black">1 Bottle</td>
                <td className="p-3 text-right font-mono text-gray-200 print:text-black">$150</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="flex justify-end pt-2">
          <div className="w-64 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-gray-400 print:text-gray-600">
              <span>Subtotal:</span>
              <span>${booking.fareUSD}</span>
            </div>
            <div className="flex justify-between text-gray-400 print:text-gray-600">
              <span>NYC Sales & FET Tax (0% Exempt):</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between border-t border-gold/30 pt-2 text-sm font-bold text-gold print:text-black">
              <span>TOTAL PAID:</span>
              <span>${booking.fareUSD}.00 USD</span>
            </div>
          </div>
        </div>

        {/* Footer Authorization Stamp */}
        <div className="border-t border-gold/15 pt-4 text-center text-[10px] text-gray-400 print:text-gray-600">
          <p>Supta Concierge Service LLC • Principal Chauffeur: Supta Saha • NYC Global VIP Logistics</p>
        </div>
      </div>
    </div>
  );
};
