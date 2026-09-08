'use client';

import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, User } from 'lucide-react';

interface AiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiConciergeModal: React.FC<AiConciergeModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Greetings. I am your 24/7 Supta Concierge AI Assistant. How may I assist with your executive fleet booking or private aviation logistics today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Which vehicle is best for 6 pax with luggage?',
    'How does real-time flight tracking work?',
    'Setup a Corporate Billing Account',
    'What champagne options are available?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate AI response
    setTimeout(() => {
      let replyText = 'Thank you for your inquiry. A senior Supta Concierge officer is available to handle custom requirements. You can also call us directly at 631-535-3942.';

      if (query.toLowerCase().includes('6 pax') || query.toLowerCase().includes('luggage') || query.toLowerCase().includes('vehicle')) {
        replyText = 'For 6 passengers with extensive baggage, our 2026 Cadillac Escalade ESV Concierge Edition or Custom Jet-Class Mercedes Sprinter is recommended for maximum comfort and storage.';
      } else if (query.toLowerCase().includes('flight') || query.toLowerCase().includes('tracking')) {
        replyText = 'Our Flight Tracking engine continuously polls aviation APIs for flight delays. Your chauffeur automatically reschedules dispatch and provides 60 minutes of complimentary terminal wait time upon landing.';
      } else if (query.toLowerCase().includes('corporate') || query.toLowerCase().includes('billing')) {
        replyText = 'Corporate Accounts feature consolidated monthly invoicing, role-based team permissions, and executive wallet top-ups. You can toggle Corporate Mode in the top header or dashboard.';
      } else if (query.toLowerCase().includes('champagne') || query.toLowerCase().includes('amenities')) {
        replyText = 'We provide chilled Dom Pérignon 2012 Vintage with handcrafted crystal flutes, Voss/Evian mineral water, daily Financial Times, and Starlink 5G Satellite Wi-Fi upon request.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-obsidian-card border border-gold/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] text-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gold/20 bg-obsidian-elevated">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center">
              <Bot className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
                Supta VIP Concierge Assistant
              </h3>
              <p className="text-[10px] text-emerald-400 font-mono">● Online • 24/7 AI Logistics</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gold transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-gold" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-gold-dark to-gold text-obsidian font-medium rounded-tr-none'
                    : 'bg-obsidian-elevated border border-gold/15 text-gray-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    m.sender === 'user' ? 'text-obsidian/70 text-right' : 'text-gray-500'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-gold/10 bg-obsidian-elevated/40 flex overflow-x-auto gap-1.5 scrollbar-none">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[10px] bg-obsidian border border-gold/20 text-gold-light hover:border-gold hover:bg-gold/10 px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-gold/20 bg-obsidian-elevated flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fleet availability, custom amenities, FBOs..."
            className="flex-1 bg-obsidian border border-gold/30 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-obsidian font-bold text-xs hover:brightness-110 shadow-gold-glow transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
