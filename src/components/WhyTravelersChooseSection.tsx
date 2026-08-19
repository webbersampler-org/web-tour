import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Star, MapPin } from 'lucide-react';
import type { PageRoute } from '../types';

interface WhyTravelersChooseSectionProps {
  onNavigate?: (page: PageRoute) => void;
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export const WhyTravelersChooseSection: React.FC<WhyTravelersChooseSectionProps> = ({
  onNavigate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features: FeatureItem[] = [
    {
      id: 'curated-destinations',
      title: 'Curated Destinations',
      description: 'Only verified and highly rated luxury stays and wild sanctuaries make it to our collection.',
      badge: 'Top Tier Verified',
    },
    {
      id: 'best-price-guarantee',
      title: 'Best Price Guarantee',
      description: 'Get competitive rates directly without hidden booking fees, markups, or surprise surcharges.',
      badge: '100% Transparent',
    },
    {
      id: 'instant-confirmation',
      title: 'Instant Confirmation',
      description: 'Secure your stay with real-time availability and instant booking directly synchronized with our database.',
      badge: 'Instant Lock-in',
    },
    {
      id: 'travel-support',
      title: 'Dedicated Travel Concierge',
      description: '24/7 on-ground assistance, private naturalist guides, and personalized itinerary specialists throughout your journey.',
      badge: '24/7 VIP Care',
    },
  ];

  return (
    <section
      id="why-travelers-choose-solis"
      className="py-20 sm:py-24 bg-[#0f2e24] text-white relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#70e29b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Interactive Feature List (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/40 text-xs font-bold text-[#70e29b]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Solis Difference</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                Why Travelers Choose Solis
              </h2>
            </div>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              {features.map((feature, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div key={feature.id} className="transition-all duration-300">
                    {isActive ? (
                      /* Active Card Style matching the reference design */
                      <div
                        onClick={() => setActiveIndex(idx)}
                        className="bg-[#184837] border border-[#70e29b]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl shadow-[#70e29b]/10 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                                {feature.title}
                              </h3>
                              {feature.badge && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#70e29b]/20 text-[#70e29b] text-[10px] font-extrabold uppercase tracking-wide border border-[#70e29b]/30">
                                  {feature.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-emerald-100/90 font-light leading-relaxed">
                              {feature.description}
                            </p>
                          </div>

                          {/* Arrow Circle Badge from reference */}
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#0f2e24] flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#70e29b] group-hover:scale-105 transition-all">
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f2e24]" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Inactive Item Style with Divider matching reference */
                      <div
                        onClick={() => setActiveIndex(idx)}
                        className="p-4 sm:p-5 rounded-2xl hover:bg-[#143a2e]/60 transition-all cursor-pointer group border-b border-emerald-500/20 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-bold text-emerald-100 group-hover:text-white transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-emerald-200/60 font-light line-clamp-1 group-hover:text-emerald-100/80 transition-colors">
                              {feature.description}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#143a2e] text-emerald-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Action Button */}
            {onNavigate && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('destinations')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#70e29b] hover:bg-[#58cc84] text-[#0f2e24] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#70e29b]/25 transition-all cursor-pointer group"
                >
                  <span>Explore Verified Stays</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0f2e24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Large Photo with Rounded Corners (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-emerald-400/25 shadow-2xl bg-[#143a2e] aspect-[4/3] sm:aspect-[4/3] group">
              
              {/* Generated Image of Happy Travelers matching user's uploaded reference */}
              <img
                src="/src/assets/images/happy_travelers_why_choose_1787126536343.jpg"
                alt="Two happy travelers on an expedition with sun hat and map"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // High quality fallback
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gentle subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Bottom Info Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0a2118]/85 backdrop-blur-md border border-emerald-500/40 p-4 rounded-2xl sm:rounded-3xl flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center font-bold shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-white">
                      100% Handpicked & Verified
                    </p>
                    <p className="text-[11px] text-emerald-200/80 font-light">
                      Over 1,200+ five-star reviews across Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.98 Rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
