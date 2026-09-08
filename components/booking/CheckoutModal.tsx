'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useUserStore } from '@/store/useUserStore';
import { FLEET_TIERS } from '@/data/fleet';
import confetti from 'canvas-confetti';
import { X, CreditCard, ShieldCheck, CheckCircle2, Building2, Smartphone, Lock, ArrowRight, Car, Calendar, Clock } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    pickupTime,
    selectedVehicle,
    getFormattedFare,
    createBookingRecord,
    setActiveTab,
  } = useBookingStore();

  const { addBookingToHistory, corporateAccount } = useUserStore();

  const [paymentTab, setPaymentTab] = useState<'card' | 'apple' | 'google' | 'corporate'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardHolder, setCardHolder] = useState('LORD ALEXANDER MONTAGUE');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('921');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  if (!isCheckoutOpen) return null;

  const vehicle = FLEET_TIERS.find((v) => v.id === selectedVehicle) || FLEET_TIERS[0];

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const record = createBookingRecord();
      addBookingToHistory(record);
      setConfirmedBookingId(record.id);
      setIsProcessing(false);
      setIsSuccess(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#000000', '#FFFFFF'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20 pb-10 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-gray-300 shadow-2xl overflow-hidden text-black my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-sm font-extrabold text-black tracking-wider uppercase">
              {isSuccess ? 'RESERVATION CONFIRMED' : 'SECURE VIP CHECKOUT'}
            </h3>
          </div>
        </div>

        {!isSuccess ? (
          <div className="p-6 space-y-6">
            {/* Trip Brief Summary */}
            <div className="bg-gray-50 border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-sm font-extrabold text-black">
                    {vehicle.name} ({vehicle.modelName})
                  </span>
                </div>
                <span className="text-xs font-mono font-extrabold text-black">
                  {getFormattedFare()} USD
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 font-medium">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-bold">Pickup Location</span>
                  <span className="font-bold text-black truncate block">{pickupLocation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-bold">Destination</span>
                  <span className="font-bold text-black truncate block">{dropoffLocation}</span>
                </div>
                <div className="flex items-center space-x-3 pt-1">
                  <span className="flex items-center space-x-1 text-gray-700 font-bold">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>{pickupDate}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-700 font-bold">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>{pickupTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-black uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setPaymentTab('card')}
                  className={`p-2.5 border text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all ${
                    paymentTab === 'card'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#C5A059]" />
                  <span>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentTab('apple')}
                  className={`p-2.5 border text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all ${
                    paymentTab === 'apple'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#C5A059]" />
                  <span>Apple Pay</span>
                </button>
                <button
                  onClick={() => setPaymentTab('google')}
                  className={`p-2.5 border text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all ${
                    paymentTab === 'google'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <span>Google Pay</span>
                </button>
                <button
                  onClick={() => setPaymentTab('corporate')}
                  className={`p-2.5 border text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all ${
                    paymentTab === 'corporate'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Corporate</span>
                </button>
              </div>
            </div>

            {/* Credit Card Input Form */}
            {paymentTab === 'card' && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-gray-700 block mb-1 font-bold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-black font-mono font-bold focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1 font-bold">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-black font-semibold focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1 font-bold">Expiration Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-black font-mono font-bold focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1 font-bold">CVC Security Code</label>
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-black font-mono font-bold focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentTab === 'corporate' && (
              <div className="bg-gray-50 border border-gray-300 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-extrabold text-black">{corporateAccount.companyName}</span>
                  <span className="text-gray-600 font-mono font-bold">{corporateAccount.corporateId}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Available Executive Wallet:</span>
                  <span className="font-extrabold text-black">${corporateAccount.walletBalanceUSD.toLocaleString()} USD</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setCheckoutOpen(false);
                  setIsSuccess(false);
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 text-black border border-gray-300 font-extrabold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                ← CANCEL & BACK
              </button>
              <button
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="w-full sm:flex-1 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-black transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>DISPATCHING EXECUTIVE CHAUFFEUR...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#C5A059]" />
                    <span>CONFIRM RESERVATION ({getFormattedFare()} USD)</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-500 font-medium">
              🔒 256-Bit SSL Encrypted • Zero Cancellation Fee up to 2 hours prior to pickup
            </p>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-black border-2 border-[#C5A059] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 text-[#C5A059]" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-black uppercase tracking-wider mb-1">
                CHAUFFEUR DISPATCH CONFIRMED
              </h3>
              <p className="text-xs text-gray-600">
                Reservation Reference: <span className="font-mono text-black font-extrabold">{confirmedBookingId}</span>
              </p>
            </div>

            <div className="max-w-md mx-auto bg-gray-50 border border-gray-300 p-4 text-left flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                alt="Julian Thorne"
                className="w-14 h-14 object-cover border border-black"
              />
              <div className="flex-1 text-xs space-y-0.5 font-medium">
                <p className="font-extrabold text-black">Julian Thorne (Lead Chauffeur)</p>
                <p className="text-[#C5A059] font-bold text-[11px]">Vehicle: {vehicle.name} ({vehicle.modelName})</p>
                <p className="text-gray-600 font-mono text-[10px]">Plate: SUPTA-01 • Phone: +1 (631) 535-3942</p>
              </div>
            </div>

            <button
              onClick={() => {
                setCheckoutOpen(false);
                setIsSuccess(false);
                setActiveTab('dashboard');
              }}
              className="px-8 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-black transition-colors shadow-md flex items-center justify-center space-x-2 mx-auto"
            >
              <span>VIEW RESERVATION IN DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
