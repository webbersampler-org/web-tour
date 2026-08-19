import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown,
  Sparkles,
  Tent,
  Car,
  Home,
  Layers,
  ShieldCheck,
  Star,
  AlertCircle
} from 'lucide-react';
import type { Destination, TripType } from '../types';

interface BookingWidgetProps {
  destinations: Destination[];
  onSearch: (params: {
    destinationId: string;
    tripType: TripType;
    travelDate: string;
    returnDate: string;
    persons: number;
  }) => void;
  initialDestinationId?: string;
}

type TabCategory = 'bundles' | 'campsite' | 'rvs' | 'stay';

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  destinations,
  onSearch,
  initialDestinationId,
}) => {
  const [activeTab, setActiveTab] = useState<TabCategory>('bundles');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    initialDestinationId || (destinations.length > 0 ? destinations[0].id : '')
  );

  const today = new Date();
  const defaultDeparture = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const defaultReturn = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [travelDate, setTravelDate] = useState<string>(defaultDeparture);
  const [returnDate, setReturnDate] = useState<string>(defaultReturn);
  const [persons, setPersons] = useState<number>(2);
  const [showGuestPicker, setShowGuestPicker] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedDestinationId && destinations.length > 0) {
      setSelectedDestinationId(destinations[0].id);
    }
  }, [destinations, selectedDestinationId]);

  const handleIncrementPersons = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (persons < 100) setPersons((prev) => prev + 1);
  };

  const handleDecrementPersons = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (persons > 1) setPersons((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedDestinationId) {
      setErrorMsg('Please select your destination to continue.');
      return;
    }
    if (!travelDate) {
      setErrorMsg('Please choose a check-in date.');
      return;
    }
    if (!returnDate) {
      setErrorMsg('Please choose a check-out date.');
      return;
    }
    if (returnDate < travelDate) {
      setErrorMsg('Check-out date cannot be prior to check-in date.');
      return;
    }

    onSearch({
      destinationId: selectedDestinationId,
      tripType: 'round-trip',
      travelDate,
      returnDate,
      persons,
    });
  };

  const selectedDestination = destinations.find((d) => d.id === selectedDestinationId);

  return (
    <div id="booking" className="relative w-full max-w-5xl mx-auto z-20">
      
      {/* Trust Badges Bar above the search widget (matching reference screenshot) */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-5 text-xs font-semibold text-emerald-100/90">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span><strong className="text-white">4.9</strong> Journeys & Stays listed</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#70e29b]" />
          <span>Search over <strong className="text-white">50,000</strong> destinations</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#70e29b]" />
          <span><strong className="text-white">Fully Insured</strong> & Supabase Synced</span>
        </div>
      </div>

      {/* Floating White Booking Widget Container */}
      <div className="relative bg-white text-neutral-900 rounded-[2.2rem] p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/20">
        
        {/* Category Tabs: Bundles, Campsite, RVs, Stay (matching screenshot) */}
        <div className="flex items-center gap-1 sm:gap-2 px-3 pt-2 pb-3 border-b border-neutral-100 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('bundles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'bundles'
                ? 'bg-[#0f2e24] text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-4 h-4 text-[#70e29b]" />
            <span>Bundles</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('campsite')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'campsite'
                ? 'bg-[#0f2e24] text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
            }`}
          >
            <Tent className="w-4 h-4 text-[#70e29b]" />
            <span>Campsite</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rvs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'rvs'
                ? 'bg-[#0f2e24] text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
            }`}
          >
            <Car className="w-4 h-4 text-[#70e29b]" />
            <span>RVs & Vans</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stay')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'stay'
                ? 'bg-[#0f2e24] text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
            }`}
          >
            <Home className="w-4 h-4 text-[#70e29b]" />
            <span>Luxury Stays</span>
          </button>
        </div>

        {/* Search Inputs Form */}
        <form onSubmit={handleSubmit} className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center divide-y md:divide-y-0 md:divide-x divide-neutral-100 gap-1 md:gap-0">
            
            {/* 1. Location / Destination (4 cols) */}
            <div className="md:col-span-4 px-3 sm:px-4 py-2 hover:bg-neutral-50 rounded-2xl transition-colors relative group">
              <label htmlFor="destination-select-main" className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800">
                Location
              </label>
              <div className="relative flex items-center mt-0.5">
                <select
                  id="destination-select-main"
                  value={selectedDestinationId}
                  onChange={(e) => setSelectedDestinationId(e.target.value)}
                  className="w-full bg-transparent text-neutral-900 text-sm font-semibold focus:outline-none cursor-pointer appearance-none truncate pr-5"
                >
                  {destinations.length === 0 ? (
                    <option value="">Loading destinations...</option>
                  ) : (
                    destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.country}) {d.base_price ? `• $${d.base_price}/nt` : ''}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-0 pointer-events-none" />
              </div>
            </div>

            {/* 2. Check in Date (2.5 cols) */}
            <div className="md:col-span-3 px-3 sm:px-4 py-2 hover:bg-neutral-50 rounded-2xl transition-colors">
              <label htmlFor="check-in-date-main" className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800">
                Check in
              </label>
              <input
                type="date"
                id="check-in-date-main"
                value={travelDate}
                min={today.toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-transparent text-neutral-900 text-sm font-semibold focus:outline-none cursor-pointer mt-0.5"
              />
            </div>

            {/* 3. Check out Date (2.5 cols) */}
            <div className="md:col-span-3 px-3 sm:px-4 py-2 hover:bg-neutral-50 rounded-2xl transition-colors">
              <label htmlFor="check-out-date-main" className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800">
                Check out
              </label>
              <input
                type="date"
                id="check-out-date-main"
                value={returnDate}
                min={travelDate || today.toISOString().split('T')[0]}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-neutral-900 text-sm font-semibold focus:outline-none cursor-pointer mt-0.5"
              />
            </div>

            {/* 4. Guests & Search Button (2 cols) */}
            <div className="md:col-span-2 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 hover:bg-neutral-50 rounded-2xl transition-colors">
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800">
                  Guests
                </label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-semibold text-neutral-900 truncate">
                    {persons} {persons === 1 ? 'Guest' : 'Guests'}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handleDecrementPersons}
                      disabled={persons <= 1}
                      className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-30 text-xs font-bold text-neutral-800 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={handleIncrementPersons}
                      disabled={persons >= 100}
                      className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-30 text-xs font-bold text-neutral-800 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Circular Dark Forest Green Search Button (matching reference image) */}
              <button
                type="submit"
                id="search-main-btn"
                aria-label="Search destinations"
                className="w-12 h-12 rounded-full bg-[#0f2e24] hover:bg-[#184837] text-white flex items-center justify-center shadow-lg shadow-[#0f2e24]/30 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer group"
              >
                <Search className="w-5 h-5 text-[#70e29b] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Validation Error Banner */}
          {errorMsg && (
            <div className="mt-3 flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>

      {/* Playful Looping Mint Ribbon Arrow (matching reference visual) */}
      <div className="hidden lg:block absolute -bottom-10 -left-12 w-32 h-24 pointer-events-none -z-10">
        <svg viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M10 80 C 40 100, 70 80, 50 40 C 30 0, 70 10, 110 30"
            stroke="#70e29b"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M95 18 L 115 32 L 95 44"
            stroke="#70e29b"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
