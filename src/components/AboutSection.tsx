import React from 'react';
import { Compass, Sparkles, Shield, Heart, Award, ArrowUpRight, CheckCircle2, Trees, Mountain } from 'lucide-react';
import type { PageRoute } from '../types';

interface AboutSectionProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="about-section" className="pt-32 pb-24 relative overflow-hidden bg-[#0f2e24]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[300px] bg-[#70e29b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Solis Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white">
            Uncompromising Freedom. Curated Wild Luxury.
          </h1>
          <p className="text-emerald-100/80 text-base sm:text-lg font-light leading-relaxed">
            Founded on the conviction that true luxury isn’t found in crowded gold-trimmed lobbies, but in rare horizons, unhurried time, and deep connection with untouched nature.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-8 space-y-4 hover:border-[#70e29b]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center font-bold">
              <Mountain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Rare Private Reserves</h3>
            <p className="text-sm text-emerald-100/80 font-light leading-relaxed">
              We partner directly with protected estates, indigenous stewards, and secluded eco-lodges closed to the general public.
            </p>
          </div>

          <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-8 space-y-4 hover:border-[#70e29b]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center font-bold">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Zero-Trace Wilderness</h3>
            <p className="text-sm text-emerald-100/80 font-light leading-relaxed">
              Every expedition contributes directly to local reforestation, wildlife sanctuaries, and sustainable community guardians.
            </p>
          </div>

          <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-8 space-y-4 hover:border-[#70e29b]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Direct Supabase Core</h3>
            <p className="text-sm text-emerald-100/80 font-light leading-relaxed">
              High-speed booking infrastructure synchronized directly with your database, ensuring transparent pricing and guaranteed availability.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#70e29b] text-[#0f2e24] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to find your next wild horizon?
            </h2>
            <p className="text-sm sm:text-base text-[#0f2e24]/80 font-medium">
              Explore our verified stays or request a custom itinerary tailored by our master guides.
            </p>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="px-8 py-4 rounded-full bg-[#0f2e24] text-white hover:bg-[#071912] font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowUpRight className="w-4 h-4 text-[#70e29b]" />
          </button>
        </div>
      </div>
    </section>
  );
};
