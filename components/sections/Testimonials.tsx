'use client';

import React from 'react';
import { Star, Quote, Crown } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Harrison Sterling',
      title: 'Managing Director, Global M&A Investment Bank',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      comment:
        'Supta Concierge handled our 5-city financial roadshow seamlessly. The Escalade ESV Concierge enabled uninterrupted video calls with our board during transit.',
    },
    {
      name: 'Captain Richard Vance',
      title: 'Chief Pilot, Gulfstream G650 Private Jet',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      comment:
        'As a private aviator landing at Teterboro (TEB), timing is non-negotiable. Supta’s real-time flight radar sync guarantees the chauffeur is holding the signboard before passengers step down.',
    },
    {
      name: 'Lady Genevieve Dupré',
      title: 'VIP Gala Producer & Event Director',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      comment:
        'The Rolls-Royce Phantom VIII with Dom Pérignon vintage champagne service was the highlight of our Met Gala red carpet arrival. Immaculate white-glove chauffeur protocol.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#C5A059] uppercase tracking-[0.2em] bg-white px-3.5 py-1 border border-gray-200">
            <Crown className="w-3.5 h-3.5" />
            <span>VIP CLIENT ENDORSEMENTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-[0.15em]">
            TRUSTED BY HIGH-NET-WORTH INDIVIDUALS
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Delivering flawless executive privacy, timing precision, and whisper-quiet transport for global VIPs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 p-6 space-y-4 shadow-sm relative hover:border-black transition-colors"
            >
              <Quote className="w-8 h-8 text-gray-300 absolute top-4 right-4" />

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                ))}
              </div>

              <p className="text-xs text-gray-700 font-medium italic leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex items-center space-x-3 pt-3 border-t border-gray-200">
                <img
                  src={rev.photo}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-black"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-black">{rev.name}</h4>
                  <p className="text-[10px] text-gray-500 font-medium">{rev.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
