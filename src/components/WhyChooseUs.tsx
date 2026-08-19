import React from 'react';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  Tent,
  Car,
  Home,
  Trees,
  Mountain,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { TRAVEL_BENEFITS } from '../lib/data';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-travel-with-us" className="py-24 relative overflow-hidden bg-[#0a2118]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-[#70e29b]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Solis Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            Designed for Freedom, Curated for Comfort
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base font-light leading-relaxed">
            From secluded alpine hideouts to luxury campervan expeditions, we blend raw natural exploration with five-star precision.
          </p>
        </div>

        {/* Bento Grid layout containing the 6 signature adventure icons inspired by the reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Feature Bento (7 cols): 4 Benefit Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAVEL_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#133a2e] border border-emerald-400/20 rounded-3xl p-6 flex flex-col justify-between hover:border-[#70e29b]/50 transition-all shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center font-bold shadow-md shadow-[#70e29b]/20">
                    {idx === 0 && <Compass className="w-5 h-5" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 2 && <Sparkles className="w-5 h-5" />}
                    {idx === 3 && <CalendarCheck className="w-5 h-5" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald-500/20 flex items-center text-xs font-bold text-[#70e29b]">
                  <span>Verified Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Bento (5 cols): The Signature Mint Green Adventure Icon Tile (matching reference image) */}
          <div className="lg:col-span-5 bg-[#70e29b] text-[#0f2e24] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-[#0f2e24] text-white px-3 py-1 rounded-full inline-block">
                All-in-One Wild Travel
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Any way you choose to roam the earth.
              </h3>
              <p className="text-xs sm:text-sm text-[#0f2e24]/80 font-medium">
                Switch seamlessly between glamping domes, luxury campervans, alpine cabins, and private yachts with verified instant booking.
              </p>
            </div>

            {/* The 6 Signature Adventure Icons Grid (matching bottom right of screenshot) */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Home className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">Cabins</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Mountain className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">Alpine</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Car className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">RVs & Vans</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Flame className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">Campfire</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Trees className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">Forests</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f2e24] text-[#70e29b] aspect-square shadow-lg">
                <Tent className="w-7 h-7" />
                <span className="text-[10px] font-extrabold mt-1 text-white">Campsite</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#0f2e24]">
                Over 50,000 Verified Listings
              </span>
              <div className="w-8 h-8 rounded-full bg-[#0f2e24] text-white flex items-center justify-center shadow-md">
                <ArrowUpRight className="w-4 h-4 text-[#70e29b]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
