import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Pause,
  Play,
  CheckCircle2,
  Eye,
  ShieldCheck
} from 'lucide-react';
import type { Destination } from '../types';

interface AutoRotatingShowcaseProps {
  destinations: Destination[];
  onBookNow: (destination: Destination) => void;
  onViewDetails: (destination: Destination) => void;
}

interface ShowcaseItem {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  duration: string;
  category: string;
  imageUrl: string;
  fallbackUrl: string;
  highlights: string[];
  slug: string;
}

export const AutoRotatingShowcase: React.FC<AutoRotatingShowcaseProps> = ({
  destinations,
  onBookNow,
  onViewDetails,
}) => {
  // Pre-configured 7 Sri Lankan showcase destinations with verified image URLs and fallbacks
  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'trincomalee-coastal-koneswaram',
      name: 'Trincomalee Coastal & Koneswaram',
      location: 'Trincomalee, Sri Lanka',
      tagline: 'Golden Nilaveli Sands & Blue Whale Expeditions',
      description: 'Pristine golden shores on Nilaveli Beach, private blue whale watching expeditions, and cliffside Koneswaram Temple sunsets.',
      price: 1650,
      currency: 'USD',
      rating: 4.96,
      reviews: 92,
      duration: '6 Days / 5 Nights',
      category: 'Coastal Haven',
      imageUrl: 'https://i.imgur.com/lYHTX82.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1600&auto=format&fit=crop',
      highlights: ['Private Catamaran Whale Watching', 'Pigeon Island Snorkeling Safari', 'Koneswaram Temple Sunset Walk', 'Beachfront Nilaveli Villa'],
      slug: 'trincomalee-coastal-koneswaram',
    },
    {
      id: 'polonnaruwa-royal-citadel-gal-vihara',
      name: 'Polonnaruwa Royal Citadel & Gal Vihara',
      location: 'Polonnaruwa, Sri Lanka',
      tagline: 'Masterpiece Rock Sculptures & Royal Palaces',
      description: 'Masterpiece rock sculptures at Gal Vihara, Parakrama Samudra lake sunsets, and guided archaeological expeditions with resident historians.',
      price: 1350,
      currency: 'USD',
      rating: 4.95,
      reviews: 64,
      duration: '4 Days / 3 Nights',
      category: 'Ancient Heritage',
      imageUrl: 'https://i.imgur.com/akiHcR4.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1600&auto=format&fit=crop',
      highlights: ['Gal Vihara Granite Buddha Statues', 'Sunset Cruise on Lake Parakrama', 'Private Historian Archaeologist', 'Minneriya Glamping Pavilion'],
      slug: 'polonnaruwa-royal-citadel-gal-vihara',
    },
    {
      id: 'kandy',
      name: 'Kandy Sacred Temple & Royal Reserve',
      location: 'Kandy, Sri Lanka',
      tagline: 'Sacred Tooth Relic & Royal Botanical Sanctuaries',
      description: 'The sacred Temple of the Tooth Relic, mist-shrouded mountain lakes, private Kandyan cultural performances, and Peradeniya Royal Gardens.',
      price: 1550,
      currency: 'USD',
      rating: 4.98,
      reviews: 114,
      duration: '5 Days / 4 Nights',
      category: 'Cultural Sanctum',
      imageUrl: 'https://i.imgur.com/VhrvLeb.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1600&auto=format&fit=crop',
      highlights: ['VIP Puja at Temple of the Tooth', 'Peradeniya Royal Botanical Tour', 'Kandyan Fire & Cultural Ensemble', 'Colonial Hillside Luxury Retreat'],
      slug: 'kandy',
    },
    {
      id: 'nuwara-eliya-misty-tea-hills',
      name: 'Nuwara Eliya Misty Tea Hills',
      location: 'Nuwara Eliya, Sri Lanka',
      tagline: 'Colonial Tea Bungalows & World’s End Treks',
      description: 'Highland tea bungalows, morning treks across Horton Plains to World’s End, and master Ceylon single-estate tea tastings.',
      price: 1750,
      currency: 'USD',
      rating: 4.99,
      reviews: 128,
      duration: '5 Days / 4 Nights',
      category: 'Highland Retreat',
      imageUrl: 'https://i.imgur.com/ajFo6SC.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?q=80&w=1600&auto=format&fit=crop',
      highlights: ['Master Ceylon Tea Plucking & Tasting', 'Private Horton Plains Sunrise Trek', 'Gregory Lake Evening Boat Charter', '19th-Century Colonial Tea Bungalow'],
      slug: 'nuwara-eliya-misty-tea-hills',
    },
    {
      id: 'ella',
      name: 'Ella Nine Arch Bridge & Cloud Trails',
      location: 'Ella, Sri Lanka',
      tagline: 'Iconic Scenic Railway, Waterfalls & Mountain Peaks',
      description: 'The iconic Nine Arch Bridge train crossing, Little Adam’s Peak sunrise hikes, secret Ravana waterfalls, and panoramic cloud forest chalets.',
      price: 1600,
      currency: 'USD',
      rating: 4.98,
      reviews: 156,
      duration: '5 Days / 4 Nights',
      category: 'Alpine Adventure',
      imageUrl: 'https://i.imgur.com/fqahzSR.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1566296517009-440df7643b74?q=80&w=1600&auto=format&fit=crop',
      highlights: ['First Class Train on Nine Arch Bridge', 'Dawn Hike to Little Adam’s Peak', 'Secret Ravana Waterfall Access', 'Panoramic Cloud Forest Eco Chalet'],
      slug: 'ella',
    },
    {
      id: 'arugam-bay-surf-lagoon-safari',
      name: 'Arugam Bay Surf & Lagoon Safari',
      location: 'Arugam Bay, Sri Lanka',
      tagline: 'World-Class Point Breaks & Wild Elephant Safaris',
      description: 'World-class point breaks, serene Pottuvil lagoon mangrove safaris with wild elephants, sunset beach bonfires, and boutique beachfront cabanas.',
      price: 1400,
      currency: 'USD',
      rating: 4.97,
      reviews: 79,
      duration: '6 Days / 5 Nights',
      category: 'Coastal Wilderness',
      imageUrl: 'https://i.imgur.com/4wJwbqJ.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1600&auto=format&fit=crop',
      highlights: ['Private Surfing Lessons with Pro Guides', 'Pottuvil Lagoon Elephant Safari', 'Kumana National Park Bird Tour', 'Luxury Oceanfront Surf Cabana'],
      slug: 'arugam-bay-surf-lagoon-safari',
    },
    {
      id: 'yala-national-park-leopard-reserve',
      name: 'Yala National Park Leopard Reserve',
      location: 'Yala National Park, Sri Lanka',
      tagline: 'Premier Leopard Tracking & Luxury Wilderness Glamping',
      description: 'Premier wildlife safaris in the world’s densest leopard territory, luxury tented pavilions with private plunge pools, and starlit bush banquets.',
      price: 1850,
      currency: 'USD',
      rating: 4.99,
      reviews: 148,
      duration: '4 Days / 3 Nights',
      category: 'Wildlife Safari',
      imageUrl: 'https://i.imgur.com/8RHRsgt.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1600&auto=format&fit=crop',
      highlights: ['Private Leopard Tracking Safaris', 'Luxury Glamping Pavilion with Plunge Pool', 'Wild Bush Starlit BBQ Banquet', 'Expert Resident Naturalist Guide'],
      slug: 'yala-national-park-leopard-reserve',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imgErrorState, setImgErrorState] = useState<Record<string, boolean>>({});
  const slideDuration = 3000; // 3 seconds per slide

  const currentItem = showcaseItems[currentIndex];

  // Helper to match with full Destination object (preferring real Supabase UUID)
  const getDestinationObject = (item: ShowcaseItem): Destination => {
    const found = destinations.find(
      (d) =>
        d.slug === item.slug ||
        d.id === item.id ||
        d.name.toLowerCase() === item.name.toLowerCase() ||
        (item.slug.includes('trincomalee') && d.slug.includes('trincomalee')) ||
        (item.slug.includes('polonnaruwa') && d.slug.includes('polonnaruwa')) ||
        (item.slug.includes('nuwara') && d.slug.includes('nuwara')) ||
        (item.slug.includes('arugam') && d.slug.includes('arugam')) ||
        (item.slug.includes('yala') && d.slug.includes('yala'))
    );
    if (found) {
      return {
        ...found,
        image_url: found.image_url || item.imageUrl,
        highlights: item.highlights,
        duration: item.duration,
      };
    }
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      country: 'Sri Lanka',
      short_description: item.description,
      image_url: item.imageUrl,
      base_price: item.price,
      currency: item.currency,
      is_active: true,
      sort_order: 1,
      category: item.category as any,
      highlights: item.highlights,
      duration: item.duration,
      rating: item.rating,
      review_count: item.reviews,
    };
  };

  // Auto-rotation timer and progress loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / slideDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % showcaseItems.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, showcaseItems.length]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleSelect = (index: number) => {
    setProgress(0);
    setCurrentIndex(index);
  };

  const handleImageError = (id: string) => {
    setImgErrorState((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="auto-rotating-showcase"
      className="relative w-full py-12 sm:py-16 bg-[#0a2118] border-y border-emerald-500/20 overflow-hidden text-white select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#70e29b]/10 blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143a2e] border border-emerald-400/30 text-xs font-extrabold text-[#70e29b] mb-2 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#70e29b]" />
              <span>Sri Lanka Signature Expeditions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Featured Sri Lankan Escapes
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl font-light">
              Explore 7 hand-curated wilderness sanctuaries, coastal escapes, and historic kingdoms across Ceylon.
            </p>
          </div>

          {/* Navigation and Autoplay Control Bar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="showcase-toggle-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
              className="p-2.5 rounded-full bg-[#143a2e] hover:bg-[#1f5443] border border-emerald-500/30 text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Auto Rotation' : 'Resume Auto Rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#70e29b]" /> : <Play className="w-4 h-4 text-[#70e29b]" />}
            </button>

            <div className="flex items-center gap-1.5 bg-[#143a2e] border border-emerald-500/30 p-1 rounded-full">
              <button
                type="button"
                id="showcase-prev-btn"
                onClick={handlePrev}
                aria-label="Previous destination"
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-[#70e29b]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                id="showcase-next-btn"
                onClick={handleNext}
                aria-label="Next destination"
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= MAIN FULL-SCREEN SHOWCASE HERO CARD ================= */}
        <div
          id={`showcase-card-${currentItem.id}`}
          className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[600px] w-full rounded-3xl overflow-hidden border border-emerald-400/30 shadow-2xl flex flex-col justify-between p-6 sm:p-10 transition-all duration-700"
        >
          {/* Full-bleed Background Image - PROPERLY LAYERED */}
          <img
            key={currentItem.id}
            src={imgErrorState[currentItem.id] ? currentItem.fallbackUrl : currentItem.imageUrl}
            alt={currentItem.name}
            onError={() => handleImageError(currentItem.id)}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] scale-100 transition-all duration-1000 z-0"
          />

          {/* Deep Emerald & Vignette Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2118] via-[#0a2118]/65 to-black/35 z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2118]/80 via-transparent to-transparent z-0 pointer-events-none" />

          {/* Top Row: Category, Rating & Location Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0a2118]/90 border border-emerald-400/50 text-xs font-bold text-[#70e29b] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentItem.location}</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                {currentItem.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#143a2e]/90 border border-emerald-500/30 text-xs text-emerald-200 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-[#70e29b]" />
                <span>{currentItem.duration}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a2118]/90 border border-amber-400/30 backdrop-blur-md shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-extrabold text-amber-300">
                {currentItem.rating.toFixed(2)}
              </span>
              <span className="text-[11px] text-emerald-200/80">
                ({currentItem.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Bottom Card Content: Title, Description, Highlights, Price & Book Now */}
          <div className="relative z-10 space-y-5 max-w-3xl pt-16 sm:pt-0">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-extrabold text-[#70e29b] uppercase tracking-wider block drop-shadow">
                {currentItem.tagline}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight drop-shadow-xl">
                {currentItem.name}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed max-w-2xl drop-shadow-md">
                {currentItem.description}
              </p>
            </div>

            {/* Signature Highlights Pills */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1">
              {currentItem.highlights.slice(0, 3).map((hl, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a2118]/90 border border-emerald-400/30 text-xs text-emerald-100 backdrop-blur-md font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#70e29b]" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>

            {/* Price & Call To Action Buttons */}
            <div className="pt-4 border-t border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              
              {/* Price Details */}
              <div className="bg-[#0a2118]/90 backdrop-blur-md border border-emerald-500/40 px-5 py-3 rounded-2xl shadow-xl">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                  All-Inclusive Package
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#70e29b] font-display">
                    ${currentItem.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-200 font-medium">
                    {currentItem.currency} / person • ${Math.round(currentItem.price / 5)}/night
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id={`showcase-view-details-${currentItem.slug}`}
                  onClick={() => onViewDetails(getDestinationObject(currentItem))}
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-md transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  id={`showcase-book-now-${currentItem.slug}`}
                  onClick={() => onBookNow(getDestinationObject(currentItem))}
                  className="px-7 py-3 rounded-full bg-[#70e29b] hover:bg-[#58cc84] text-[#0f2e24] font-extrabold text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-xl shadow-[#70e29b]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer group/cta"
                >
                  <span>Book Now</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0f2e24] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 7 RICH DESTINATION CARDS WITH IMAGES & THUMBNAILS ================= */}
        <div className="mt-8 space-y-4">
          
          {/* Active Timer Progress Line */}
          <div className="w-full bg-[#143a2e] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#70e29b] transition-all duration-75 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 7 Interactive Destination Cards WITH IMAGES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {showcaseItems.map((item, idx) => {
              const isSelected = idx === currentIndex;
              const imgUrl = imgErrorState[item.id] ? item.fallbackUrl : item.imageUrl;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`showcase-tab-${item.slug}`}
                  onClick={() => handleSelect(idx)}
                  className={`relative group rounded-2xl overflow-hidden text-left transition-all duration-300 border cursor-pointer flex flex-col p-2.5 ${
                    isSelected
                      ? 'bg-[#143a2e] border-[#70e29b] ring-2 ring-[#70e29b] shadow-xl shadow-[#70e29b]/25 -translate-y-1'
                      : 'bg-[#0f2e24]/90 border-emerald-500/25 hover:bg-[#143a2e] hover:border-emerald-400/50'
                  }`}
                >
                  {/* Destination Card Thumbnail Image */}
                  <div className="relative w-full h-20 rounded-xl overflow-hidden mb-2 bg-[#0a2118]">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                    
                    {/* Index Badge */}
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                      0{idx + 1}
                    </span>

                    {/* Price Tag on Image */}
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-[#0f2e24]/90 backdrop-blur-md text-[10px] font-extrabold text-[#70e29b] border border-emerald-500/40">
                      ${item.price}
                    </span>
                  </div>

                  {/* Destination Details */}
                  <div className="space-y-0.5">
                    <span className={`text-xs font-extrabold truncate block ${isSelected ? 'text-white' : 'text-emerald-100'}`}>
                      {item.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-emerald-300/80 block truncate font-medium">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
