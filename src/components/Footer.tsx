import React from 'react';
import { Compass, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Heart, Sparkles, Tent, Car } from 'lucide-react';
import type { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#0a2118] border-t border-emerald-500/20 pt-20 pb-12 relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[250px] bg-[#70e29b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-emerald-500/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center shadow-lg shadow-[#70e29b]/25 font-bold">
                <Compass className="w-5 h-5 text-[#0f2e24]" />
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-wider text-white">
                  SOLIS
                </span>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[#0f2e24] bg-[#70e29b] px-2 py-0.5 rounded-full">
                  EXPEDITIONS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/75 font-light leading-relaxed max-w-sm">
              Discover curated expeditions across Sri Lanka and the world. Private journeys, wilderness camps, highland chalets, and instant booking synchronized with Supabase.
            </p>

            <div className="pt-2 text-xs text-emerald-200/90 space-y-1.5 font-light">
              <p>Direct Concierge: <span className="text-white font-medium">concierge@solis-expeditions.com</span></p>
              <p>VIP Line: <span className="text-white font-medium">+41 44 892 3400 / +94 11 234 5678</span></p>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#70e29b] font-bold">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/75">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors cursor-pointer">
                  Curated Stays & Camps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-white transition-colors cursor-pointer">
                  Reserve a Journey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  The Solis Standard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Private Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Signature Destinations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#70e29b] font-bold">Sri Lanka Expeditions</h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/75">
              <li>Anuradhapura Sacred Kingdom</li>
              <li>Trincomalee Coastal & Whale Safari</li>
              <li>Polonnaruwa Ancient Citadel</li>
              <li>Kandy Sacred Temple & Gardens</li>
              <li>Nuwara Eliya Misty Tea Hills</li>
              <li>Ella Nine Arch Bridge & Peaks</li>
            </ul>
          </div>

          {/* Newsletter / Bespoke Dispatch */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#70e29b] font-bold">Private Dispatch</h4>
            <p className="text-xs text-emerald-100/75 font-light">
              Receive unlisted wilderness openings, highland tea bungalows, and seasonal briefings.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you. You have been added to the Solis Private Dispatch.'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-[#133a2e] border border-emerald-500/30 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#70e29b]"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-full bg-[#70e29b] hover:bg-[#58cc84] text-[#0f2e24] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div>
            © {new Date().getFullYear()} Solis Luxury Expeditions. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Expedition</span>
            <span className="hover:text-white transition-colors cursor-pointer">Supabase Security & RLS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
