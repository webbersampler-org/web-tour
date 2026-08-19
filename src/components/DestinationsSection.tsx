import React, { useState, useMemo } from 'react';
import { Search, MapPin, Sparkles, RefreshCw, Compass, SlidersHorizontal, Check } from 'lucide-react';
import type { Destination } from '../types';
import { DestinationCard } from './DestinationCard';

interface DestinationsSectionProps {
  destinations: Destination[];
  isLoading: boolean;
  onRefresh?: () => void;
  onViewDetails: (destination: Destination) => void;
  onQuickBook: (destination: Destination) => void;
  isFullPage?: boolean;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  isLoading,
  onRefresh,
  onViewDetails,
  onQuickBook,
  isFullPage = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const countries = useMemo(() => {
    const set = new Set<string>();
    destinations.forEach((d) => {
      if (d.country) set.add(d.country);
    });
    return Array.from(set).sort();
  }, [destinations]);

  const categories = ['all', 'Island', 'Alpine', 'Cultural', 'Safari', 'Arctic', 'Desert'];

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        const matchesSearch =
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (dest.short_description && dest.short_description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' || dest.category === selectedCategory;

        const matchesCountry =
          selectedCountry === 'all' || dest.country === selectedCountry;

        return matchesSearch && matchesCategory && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.base_price || 0) - (b.base_price || 0);
        if (sortBy === 'price-desc') return (b.base_price || 0) - (a.base_price || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (a.sort_order || 0) - (b.sort_order || 0);
      });
  }, [destinations, searchQuery, selectedCategory, selectedCountry, sortBy]);

  const displayedDestinations = isFullPage
    ? filteredDestinations
    : filteredDestinations.slice(0, 6);

  return (
    <section
      id="destinations-section"
      className={`relative ${isFullPage ? 'pt-32 pb-24' : 'py-24'} overflow-hidden bg-[#0f2e24]`}
    >
      {/* Radiant ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-[#70e29b]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Destinations & Wilderness</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
              {isFullPage ? 'Explore All Curated Journeys' : 'Featured Stays & Campsites'}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed">
              Find your ideal off-grid sanctuary or alpine retreat. Every destination is connected directly with our live Supabase database.
            </p>
          </div>

          {onRefresh && (
            <button
              id="refresh-destinations-btn"
              onClick={onRefresh}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#143a2e] border border-emerald-400/30 hover:border-[#70e29b] text-white text-xs font-semibold transition-all cursor-pointer shadow-lg"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#70e29b]' : 'text-[#70e29b]'}`} />
              <span>Sync with Supabase</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#143a2e]/90 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-4 sm:p-5 mb-10 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="destination-search-input"
                placeholder="Search by campsite, country, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a2118]/70 border border-emerald-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-[#70e29b] transition-colors"
              />
            </div>

            {/* Country Selector */}
            <div className="sm:col-span-3">
              <select
                id="country-filter-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-[#0a2118]/70 border border-emerald-500/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#70e29b] transition-colors cursor-pointer"
              >
                <option value="all" className="bg-[#0f2e24]">All Countries ({countries.length})</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-[#0f2e24]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="sm:col-span-3">
              <select
                id="sort-destinations-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#0a2118]/70 border border-emerald-500/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#70e29b] transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-[#0f2e24]">Sort: Featured</option>
                <option value="price-asc" className="bg-[#0f2e24]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0f2e24]">Price: High to Low</option>
                <option value="rating" className="bg-[#0f2e24]">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs text-emerald-200/80 font-bold whitespace-nowrap mr-1">Experience:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                id={`category-pill-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#70e29b] text-[#0f2e24] shadow-md'
                    : 'bg-white/10 hover:bg-white/15 text-emerald-100'
                }`}
              >
                {cat === 'all' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-[#70e29b] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-emerald-200">Loading active destinations from Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayedDestinations.length === 0 && (
          <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Compass className="w-12 h-12 text-[#70e29b] mx-auto" />
            <h3 className="text-xl font-bold font-display text-white">No destinations found</h3>
            <p className="text-sm text-emerald-200 font-light">
              No active destinations matched your filters. Try clearing search keywords or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedCountry('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#70e29b] text-[#0f2e24] font-bold text-xs hover:bg-[#58cc84] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Destination Cards Grid */}
        {!isLoading && displayedDestinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onViewDetails={onViewDetails}
                onQuickBook={onQuickBook}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
