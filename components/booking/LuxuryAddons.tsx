'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { LuxuryAddons as AddonType } from '@/types';
import { Wine, Wifi, Baby, Coffee, Newspaper, VolumeX, Check } from 'lucide-react';

export const LuxuryAddons: React.FC = () => {
  const { addons, toggleAddon } = useBookingStore();

  const addonItems: {
    key: keyof AddonType;
    label: string;
    description: string;
    price: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: 'champagne',
      label: 'Dom Pérignon 2012 Vintage',
      description: 'Chilled bottle with two handcrafted crystal flutes',
      price: '+$150 USD',
      icon: Wine,
    },
    {
      key: 'starlinkWifi',
      label: 'Starlink 5G Satellite Wi-Fi',
      description: 'Low-latency network for video calls & streaming',
      price: '+$40 USD',
      icon: Wifi,
    },
    {
      key: 'childSeat',
      label: 'Executive Child Seat',
      description: 'Rear-facing or Booster Isofix seat',
      price: '+$35 USD',
      icon: Baby,
    },
    {
      key: 'mineralWater',
      label: 'Gourmet Refreshments',
      description: 'Chilled Voss/Evian mineral water & chocolates',
      price: '+$25 USD',
      icon: Coffee,
    },
    {
      key: 'newspapers',
      label: 'Financial Times & WSJ',
      description: 'Daily editions placed in passenger seat',
      price: 'FREE',
      icon: Newspaper,
    },
    {
      key: 'quietRide',
      label: 'Quiet Ride Protocol',
      description: 'Zero conversation requested; ambient audio',
      price: 'FREE',
      icon: VolumeX,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-black uppercase tracking-[0.2em]">
          BESPOKE AMENITY CUSTOMIZATIONS
        </h4>
        <span className="text-[10px] text-gray-500 font-bold tracking-wide">
          Select preferences for your trip
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {addonItems.map((item) => {
          const Icon = item.icon;
          const isSelected = addons[item.key];
          return (
            <div
              key={item.key}
              onClick={() => toggleAddon(item.key)}
              className={`p-3.5 border transition-all cursor-pointer flex items-start space-x-3 ${
                isSelected
                  ? 'bg-gray-50 border-black text-black shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-400'
              }`}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center border shrink-0 ${
                  isSelected
                    ? 'bg-black border-black text-white'
                    : 'bg-gray-50 border-gray-300 text-black'
                }`}
              >
                {isSelected ? <Check className="w-4 h-4 text-[#C5A059] stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-black">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-mono font-extrabold text-[#C5A059]">
                    {item.price}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 font-normal leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
