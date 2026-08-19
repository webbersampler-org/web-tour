import React, { useState, useEffect } from 'react';
import { MapPin, ArrowUpRight, Heart, Sparkles, Star, Zap, Users, Eye } from 'lucide-react';
import type { Destination } from '../types';
import { resolveDestinationImage } from '../lib/data';

interface DestinationCardProps {
  destination: Destination;
  onViewDetails: (destination: Destination) => void;
  onQuickBook: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onViewDetails,
  onQuickBook,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(resolveDestinationImage(destination));

  useEffect(() => {
    setImgSrc(resolveDestinationImage(destination));
  }, [destination]);

  const basePrice = destination.base_price || 1500;
  const nightPrice = Math.round(basePrice / (destination.duration?.includes('5') ? 5 : 7));
  const strikethroughPrice = Math.round(nightPrice * 1.3);

  const handleImageError = () => {
    // Fallback if direct image link has network/CORS issues
    if (destination.name.toLowerCase().includes('anuradhapura')) {
      setImgSrc('https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('trincomalee')) {
      setImgSrc('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('polonnaruwa')) {
      setImgSrc('https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('kandy')) {
      setImgSrc('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('nuwara')) {
      setImgSrc('https://images.unsplash.com/photo-1546587348-d12660c30c50?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('ella')) {
      setImgSrc('https://images.unsplash.com/photo-1566296517009-440df7643b74?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('arugam')) {
      setImgSrc('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop');
    } else if (destination.name.toLowerCase().includes('yala')) {
      setImgSrc('https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop');
    } else {
      setImgSrc('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop');
    }
  };

  return (
    <div
      id={`destination-card-${destination.id}`}
      className="group relative bg-white text-neutral-900 rounded-3xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-[#70e29b]/20 transition-all duration-300 hover:-translate-y-1.5 border border-white/20"
    >
      {/* Image Container with Slider Indicator and Heart Favorite Button */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => onViewDetails(destination)}>
        <img
          src={imgSrc}
          alt={destination.name}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Add to favorites"
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Country Badge at top left */}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1 rounded-full bg-[#0f2e24]/90 text-[#70e29b] border border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            {destination.country}
          </span>
        </div>

        {/* Bottom Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <span className="w-5 h-1.5 rounded-full bg-[#70e29b]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Feature Tags Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span>Instant book</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-semibold">
              {destination.category || 'Curated'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 text-[10px] font-bold">
              Verified
            </span>
          </div>

          {/* Destination Name & Rating */}
          <div className="flex items-start justify-between gap-2 pt-1">
            <div>
              <h3
                onClick={() => onViewDetails(destination)}
                className="font-display text-lg font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors leading-snug cursor-pointer"
              >
                {destination.name}
              </h3>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                {destination.duration || '5 Days / 4 Nights'} • {destination.country}
              </p>
            </div>

            {/* Rating Tag */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{destination.rating ? (destination.rating * 2).toFixed(1) : '9.8'}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {destination.short_description || 'Exclusive curated journey featuring luxury accommodations, private naturalist guide, and seamless transport.'}
          </p>
        </div>

        {/* Pricing & Booking CTA */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-neutral-400 line-through">
                ${strikethroughPrice}/nt
              </span>
              <span className="text-base font-extrabold text-neutral-900">
                ${nightPrice}/night
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-medium">
              ${basePrice.toLocaleString()} total • {destination.currency || 'USD'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id={`view-details-${destination.slug || destination.id}`}
              onClick={() => onViewDetails(destination)}
              className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
              title="View details & inclusions"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Prominent Book Now button linking directly to booking page */}
            <button
              type="button"
              id={`book-now-${destination.slug || destination.id}`}
              onClick={() => onQuickBook(destination)}
              className="px-4 py-2 rounded-full bg-[#0f2e24] hover:bg-[#184837] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#0f2e24]/20 transition-all cursor-pointer group/bbtn"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#70e29b] group-hover/bbtn:translate-x-0.5 group-hover/bbtn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
