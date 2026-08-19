import React, { useState } from 'react';
import {
  X,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Shield,
  Clock,
  Zap
} from 'lucide-react';
import type { Destination } from '../types';
import { resolveDestinationImage } from '../lib/data';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookNow,
}) => {
  if (!destination) return null;

  const [imgSrc, setImgSrc] = useState(resolveDestinationImage(destination));

  React.useEffect(() => {
    if (destination) {
      setImgSrc(resolveDestinationImage(destination));
    }
  }, [destination]);

  const handleImageError = () => {
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

  const defaultHighlights = [
    'Private VIP Chauffeur & Airport Transfer',
    'Curated Luxury Lodge or Hillside Villa Suite',
    'Dedicated 24/7 Personal Naturalist & Guide',
    'Exclusive Access & Private Cultural Ceremonies',
    'Custom Culinary Journey & Outdoor Banquets',
  ];

  const highlights = destination.highlights && destination.highlights.length > 0
    ? destination.highlights
    : defaultHighlights;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-[#0f2e24] border border-emerald-400/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-white">
        
        {/* Close Button */}
        <button
          id="close-destination-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-neutral-900">
          <img
            src={imgSrc}
            alt={destination.name}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e24] via-[#0f2e24]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2118]/80 border border-emerald-500/30 text-xs font-bold text-[#70e29b] backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5" />
                  {destination.country}
                </span>
                {destination.duration && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2118]/80 border border-white/20 text-xs text-emerald-100 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {destination.duration}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                {destination.name}
              </h2>
            </div>

            <div className="bg-[#0a2118]/90 backdrop-blur-md border border-emerald-400/30 px-5 py-2.5 rounded-2xl text-right">
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider block font-bold">Total Investment</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#70e29b] font-display">
                ${destination.base_price ? destination.base_price.toLocaleString() : '1,550'}
              </span>
              <span className="text-[11px] text-emerald-200 block">
                {destination.currency || 'USD'} / per person
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#70e29b] font-bold mb-2">
              Journey Overview
            </h4>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-light">
              {destination.short_description ||
                'Experience world-class natural beauty, secluded five-star glamping estates, private guided expeditions, and unprecedented access to the region’s best kept secrets.'}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-[#143a2e] border border-emerald-400/20 rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-widest text-[#70e29b] font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#70e29b]" />
              <span>Signature Inclusions & Wilderness Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#70e29b] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-emerald-100">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solis Guarantee */}
          <div className="flex items-center gap-3 p-4 bg-[#143a2e]/60 border border-emerald-400/20 rounded-2xl text-xs text-emerald-200">
            <Shield className="w-5 h-5 text-[#70e29b] shrink-0" />
            <div>
              <strong className="text-white block mb-0.5">The Solis Expeditions Guarantee</strong>
              <span>Direct database reservation in Supabase with complimentary flexibility, concierge support, and luxury upgrades.</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#0a2118] border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-emerald-200 text-center sm:text-left">
            Ready to explore <span className="text-white font-bold">{destination.name}</span>?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="modal-close-cancel-btn"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              id="modal-proceed-booking-btn"
              onClick={() => onBookNow(destination)}
              className="w-1/2 sm:w-auto px-7 py-2.5 rounded-full bg-[#70e29b] text-[#0f2e24] hover:bg-[#58cc84] font-extrabold text-sm tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
