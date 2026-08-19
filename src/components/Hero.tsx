import React from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Car,
  CheckCircle2,
  Star,
  MapPin
} from 'lucide-react';
import type { Destination, PageRoute, TripType } from '../types';
import { BookingWidget } from './BookingWidget';

interface HeroProps {
  destinations: Destination[];
  onNavigate: (page: PageRoute) => void;
  onBookingSearch: (params: {
    destinationId: string;
    tripType: TripType;
    travelDate: string;
    returnDate: string;
    persons: number;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  destinations,
  onNavigate,
  onBookingSearch,
}) => {
  return (
    <section id="hero-section" className="relative pt-32 pb-20 overflow-hidden bg-[#0f2e24]">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#70e29b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Inspiration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 mb-12">
          
          {/* Bento Card 1: Main Campsites & Mountain Adventure Banner (5 cols on lg, 6 on md) */}
          <div className="md:col-span-6 lg:col-span-5 relative group rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] border border-emerald-400/20 shadow-2xl flex flex-col justify-between p-6 sm:p-8">
            <img
              src="https://res.cloudinary.com/xxdsjv8e/image/upload/v1786644012/auto_uploads/biw5inb8ox9mryy7sp8b.png"
              alt="Campsites & Wilderness Stays Banner"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e24] via-transparent to-black/30 z-0" />

            {/* Playful looping vector arrow SVG overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
                <path
                  d="M 20 220 C 60 120, 140 180, 180 80 C 210 10, 270 90, 310 180 C 330 230, 370 120, 360 80"
                  stroke="#70e29b"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 335 90 L 360 80 L 368 105"
                  stroke="#70e29b"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Top Pill button */}
            <div className="relative z-10 flex items-center justify-between">
              <button
                onClick={() => onNavigate('destinations')}
                className="inline-flex items-center gap-2 bg-[#0a2118]/90 hover:bg-[#0a2118] text-white border border-[#70e29b]/40 pl-4 pr-1.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md transition-all cursor-pointer group/btn"
              >
                <span>Find your Stays</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#0a2118] flex items-center justify-center group-hover/btn:bg-[#70e29b] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            {/* Bottom Title Info */}
            <div className="relative z-10 space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                  Campsites & Lodges
                </h2>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#70e29b] group-hover:text-[#0f2e24] transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#70e29b]" />
                <span>+50,000 amazing destinations & stays</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Trincomalee Coastal Sanctuary Card with Custom Background Image (3 cols on lg) */}
          <div
            onClick={() => onNavigate('destinations')}
            className="md:col-span-6 lg:col-span-3 relative group rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] border border-emerald-400/20 p-6 flex flex-col justify-between shadow-2xl transition-all cursor-pointer"
          >
            {/* Background image for Trincomalee */}
            <img
              src="https://i.imgur.com/lYHTX82.jpg"
              alt="Trincomalee Coastal Sanctuary"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08] group-hover:scale-105 transition-transform duration-700 z-0"
            />
            {/* Dark & Emerald Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e24] via-[#0f2e24]/40 to-black/35 z-0 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a2118]/90 text-[#70e29b] border border-emerald-400/40 text-xs font-bold shadow-md backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5" />
                <span>Trincomalee</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#70e29b] group-hover:text-[#0f2e24] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-1.5">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 drop-shadow">
                Nilaveli Sands & Whales
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display leading-tight drop-shadow-md">
                Trincomalee Sanctuary
              </h3>
              <p className="text-xs text-emerald-100 font-light line-clamp-2 leading-relaxed drop-shadow">
                Pristine golden sands, blue whale watching, and cliffside Koneswaram temple sunsets.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-500/30 text-xs">
                <span className="font-extrabold text-[#70e29b]">$1,650 USD</span>
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.96</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: "Roam Free: Discover the freedom..." Card with Custom Background (4 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-4 relative group rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] border border-emerald-400/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            {/* Background Image requested by user */}
            <img
              src="https://i.imgur.com/VyqgQut.jpg"
              alt="Roam Free Hotel on Wheels"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08] group-hover:scale-105 transition-transform duration-700 z-0"
            />
            {/* Dark & Emerald Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e24] via-[#0f2e24]/65 to-black/35 z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70e29b] text-[#0f2e24] text-xs font-bold shadow-md">
                  <Car className="w-3.5 h-3.5" />
                  <span>RVs & Vans</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-emerald-200 text-xs font-semibold">
                  Wild Stays
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight drop-shadow-md">
                Roam Free: Discover the freedom of a hotel on wheels
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100 font-light leading-relaxed drop-shadow">
                Experience off-grid serenity with fully-equipped luxury expedition vans, private guides, and vetted wilderness estates.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-500/25 flex items-center justify-between">
              <button
                onClick={() => onNavigate('destinations')}
                className="text-xs font-bold text-[#70e29b] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/30"
              >
                <span>View 2026 Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.98 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Floating White Booking Widget */}
        <div className="mt-6 sm:mt-10">
          <BookingWidget
            destinations={destinations}
            onSearch={onBookingSearch}
          />
        </div>
      </div>
    </section>
  );
};
