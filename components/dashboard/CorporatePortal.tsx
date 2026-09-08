'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Building2, Wallet, Users, FileText, Plus, ShieldCheck, Check, ArrowUpRight } from 'lucide-react';

export const CorporatePortal: React.FC = () => {
  const { corporateAccount } = useUserStore();
  const [walletBalance, setWalletBalance] = useState(corporateAccount.walletBalanceUSD);
  const [topUpAmount, setTopUpAmount] = useState(10000);
  const [isTopUpSuccess, setIsTopUpSuccess] = useState(false);

  const teamMembers = [
    { name: 'Lord Alexander Montague', role: 'Managing Director & CEO', rides: 18, spend: '$8,450' },
    { name: 'Lady Victoria Sterling', role: 'Senior Partner', rides: 12, spend: '$5,900' },
    { name: 'Harrison Thorne', role: 'Head of Private Equity', rides: 9, spend: '$4,120' },
    { name: 'Elena Rostova', role: 'VP Investor Relations', rides: 6, spend: '$2,800' },
  ];

  const handleTopUp = () => {
    setWalletBalance((prev) => prev + topUpAmount);
    setIsTopUpSuccess(true);
    setTimeout(() => setIsTopUpSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-obsidian-card border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 text-gray-200">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold/15 pb-5 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center shadow-gold-glow">
            <Building2 className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-light">
              {corporateAccount.companyName}
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Corporate Account ID: <span className="text-gold">{corporateAccount.corporateId}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-full font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>CONSOLIDATED MONTHLY ENTERPRISE ACCOUNT</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Wallet Balance */}
        <div className="bg-gradient-to-br from-obsidian-elevated to-obsidian border border-gold/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
            AVAILABLE EXECUTIVE WALLET BALANCE
          </span>
          <div className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
            ${walletBalance.toLocaleString()} USD
          </div>
          <p className="text-[10px] text-gray-500">Monthly Spending Limit: $50,000 USD</p>
        </div>

        {/* Metric 2: Unpaid Invoice */}
        <div className="bg-obsidian-elevated/60 border border-gold/15 rounded-2xl p-5 space-y-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
            UNPAID CONSOLIDATED INVOICE
          </span>
          <div className="font-serif text-2xl font-bold text-gray-200">
            ${corporateAccount.unpaidInvoiceUSD.toLocaleString()} USD
          </div>
          <p className="text-[10px] text-amber-400 font-mono">Auto-debit due 31st of month</p>
        </div>

        {/* Metric 3: Active Team Members */}
        <div className="bg-obsidian-elevated/60 border border-gold/15 rounded-2xl p-5 space-y-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
            AUTHORIZED EXECUTIVE SEATS
          </span>
          <div className="font-serif text-2xl font-bold text-gold">
            {corporateAccount.membersCount} Executives
          </div>
          <p className="text-[10px] text-gray-400">Role-based travel manager permissions</p>
        </div>
      </div>

      {/* Wallet Top-up Module */}
      <div className="bg-obsidian-elevated/70 border border-gold/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-gold/10 pb-2">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-gold" />
            <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-wider">
              Corporate Account Instant Wallet Top-Up
            </h4>
          </div>
          {isTopUpSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>Wallet Funded Successfully!</span>
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 flex gap-2 w-full">
            {[5000, 10000, 25000].map((amt) => (
              <button
                key={amt}
                onClick={() => setTopUpAmount(amt)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  topUpAmount === amt
                    ? 'bg-gold/20 border-gold text-gold shadow-gold-glow'
                    : 'bg-obsidian border-gold/10 text-gray-400 hover:border-gold/30'
                }`}
              >
                +${amt.toLocaleString()}
              </button>
            ))}
          </div>

          <button
            onClick={handleTopUp}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-obsidian font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition-all"
          >
            Authorize Top-Up
          </button>
        </div>
      </div>

      {/* Executive Team Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-wider flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-gold" />
            <span>Authorized Corporate Executive Roster</span>
          </h4>
          <button className="text-xs text-gold hover:underline flex items-center space-x-1">
            <Plus className="w-3.5 h-3.5" />
            <span>Invite Executive</span>
          </button>
        </div>

        <div className="border border-gold/20 rounded-2xl overflow-hidden bg-obsidian-elevated/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-elevated text-gold font-serif uppercase tracking-wider border-b border-gold/20">
              <tr>
                <th className="p-3.5">Executive Name</th>
                <th className="p-3.5">Corporate Role</th>
                <th className="p-3.5 text-center">YTD Rides</th>
                <th className="p-3.5 text-right">Total Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {teamMembers.map((m, idx) => (
                <tr key={idx} className="hover:bg-gold/5 transition-colors">
                  <td className="p-3.5 font-medium text-gray-200">{m.name}</td>
                  <td className="p-3.5 text-gray-400">{m.role}</td>
                  <td className="p-3.5 text-center font-mono text-gray-300">{m.rides}</td>
                  <td className="p-3.5 text-right font-mono font-bold text-gold">{m.spend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
