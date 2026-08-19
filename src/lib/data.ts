import type { Destination } from '../types';

export function formatImageUrl(url?: string | null): string {
  if (!url) return '';
  // If it's an imgur page link like https://imgur.com/lYHTX82, convert to https://i.imgur.com/lYHTX82.jpg
  if (url.includes('imgur.com') && !url.includes('i.imgur.com')) {
    const id = url.split('/').filter(Boolean).pop()?.replace(/\..+$/, '');
    if (id) return `https://i.imgur.com/${id}.jpg`;
  }
  return url;
}

export function resolveDestinationImage(dest?: Partial<Destination> | null): string {
  if (!dest) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop';
  
  const nameLower = (dest.name || '').toLowerCase();
  const slugLower = (dest.slug || '').toLowerCase();
  const idLower = (dest.id || '').toLowerCase();

  if (nameLower.includes('trincomalee') || slugLower.includes('trincomalee') || idLower.includes('trincomalee')) {
    return 'https://i.imgur.com/lYHTX82.jpg';
  }
  if (nameLower.includes('polonnaruwa') || slugLower.includes('polonnaruwa') || idLower.includes('polonnaruwa')) {
    return 'https://i.imgur.com/akiHcR4.jpg';
  }
  if (nameLower.includes('kandy') || slugLower.includes('kandy') || idLower.includes('kandy')) {
    return 'https://i.imgur.com/VhrvLeb.jpg';
  }
  if (nameLower.includes('nuwara') || slugLower.includes('nuwara') || idLower.includes('nuwara')) {
    return 'https://i.imgur.com/ajFo6SC.jpg';
  }
  if (nameLower.includes('ella') || slugLower.includes('ella') || idLower.includes('ella')) {
    return 'https://i.imgur.com/fqahzSR.jpg';
  }
  if (nameLower.includes('arugam') || slugLower.includes('arugam') || idLower.includes('arugam')) {
    return 'https://i.imgur.com/4wJwbqJ.jpg';
  }
  if (nameLower.includes('yala') || slugLower.includes('yala') || idLower.includes('yala')) {
    return 'https://i.imgur.com/8RHRsgt.jpg';
  }

  if (dest.image_url) {
    return formatImageUrl(dest.image_url);
  }

  return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop';
}

export const CURATED_DESTINATIONS: Destination[] = [
  {
    id: 'trincomalee-coastal-koneswaram',
    name: 'Trincomalee Coastal & Koneswaram',
    slug: 'trincomalee-coastal-koneswaram',
    country: 'Sri Lanka',
    short_description: 'Pristine golden sands on Nilaveli Beach, private blue whale watching expeditions, and cliffside Koneswaram temple sunsets.',
    image_url: 'https://i.imgur.com/lYHTX82.jpg',
    base_price: 1650,
    currency: 'USD',
    is_active: true,
    sort_order: 1,
    category: 'Island',
    highlights: [
      'Private Catamaran Blue Whale Watching',
      'Pigeon Island Snorkeling & Coral Safari',
      'Cliffside Koneswaram Temple Sunset Tour',
      'Luxury Beachfront Villa at Nilaveli'
    ],
    duration: '6 Days / 5 Nights',
    rating: 4.96,
    review_count: 92,
  },
  {
    id: 'polonnaruwa-royal-citadel-gal-vihara',
    name: 'Polonnaruwa Royal Citadel & Gal Vihara',
    slug: 'polonnaruwa-royal-citadel-gal-vihara',
    country: 'Sri Lanka',
    short_description: 'Masterpiece rock sculptures at Gal Vihara, Parakrama Samudra lake sunsets, and guided archaeological expeditions.',
    image_url: 'https://i.imgur.com/akiHcR4.jpg',
    base_price: 1350,
    currency: 'USD',
    is_active: true,
    sort_order: 2,
    category: 'Cultural',
    highlights: [
      'Gal Vihara Granite Buddha Statues',
      'Sunset Cruise on Parakrama Samudra Lake',
      'Private Archaeological Historian Guide',
      'Luxury Glamping Pavilion near Minneriya'
    ],
    duration: '4 Days / 3 Nights',
    rating: 4.95,
    review_count: 64,
  },
  {
    id: 'kandy',
    name: 'Kandy Sacred Temple & Royal Reserve',
    slug: 'kandy',
    country: 'Sri Lanka',
    short_description: 'The sacred Temple of the Tooth Relic, mist-shrouded mountain lakes, private Kandyan cultural performances, and Peradeniya Royal Gardens.',
    image_url: 'https://i.imgur.com/VhrvLeb.jpg',
    base_price: 1550,
    currency: 'USD',
    is_active: true,
    sort_order: 3,
    category: 'Cultural',
    highlights: [
      'VIP Puja at the Temple of the Tooth Relic',
      'Private Peradeniya Royal Botanical Garden Walk',
      'Kandyan Fire & Drumming Cultural Ensemble',
      'Colonial Hillside Luxury Retreat'
    ],
    duration: '5 Days / 4 Nights',
    rating: 4.98,
    review_count: 114,
  },
  {
    id: 'nuwara-eliya-misty-tea-hills',
    name: 'Nuwara Eliya Misty Tea Hills',
    slug: 'nuwara-eliya-misty-tea-hills',
    country: 'Sri Lanka',
    short_description: 'Highland tea bungalows, morning treks across Horton Plains to World’s End, and master Ceylon single-estate tea tastings.',
    image_url: 'https://i.imgur.com/ajFo6SC.jpg',
    base_price: 1750,
    currency: 'USD',
    is_active: true,
    sort_order: 4,
    category: 'Alpine',
    highlights: [
      'Master-Led Ceylon Tea Plucking & Tasting',
      'Private Sunrise Trek to World’s End & Baker’s Falls',
      'Gregory Lake Evening Boat Charter',
      'Historic 19th-Century Colonial Tea Bungalow'
    ],
    duration: '5 Days / 4 Nights',
    rating: 4.99,
    review_count: 128,
  },
  {
    id: 'ella',
    name: 'Ella Nine Arch Bridge & Mountain Trails',
    slug: 'ella',
    country: 'Sri Lanka',
    short_description: 'The iconic Nine Arch Bridge train crossing, Little Adam’s Peak sunrise hikes, secret Ravana waterfalls, and panoramic mountain chalets.',
    image_url: 'https://i.imgur.com/fqahzSR.jpg',
    base_price: 1600,
    currency: 'USD',
    is_active: true,
    sort_order: 5,
    category: 'Alpine',
    highlights: [
      'First Class Scenic Train Crossing on Nine Arch Bridge',
      'Dawn Sunrise Hike to Little Adam’s Peak',
      'Ravana Pool Club & Private Waterfall Access',
      'Panoramic Cloud Forest Eco Chalet'
    ],
    duration: '5 Days / 4 Nights',
    rating: 4.98,
    review_count: 156,
  },
  {
    id: 'arugam-bay-surf-lagoon-safari',
    name: 'Arugam Bay Surf & Lagoon Safari',
    slug: 'arugam-bay-surf-lagoon-safari',
    country: 'Sri Lanka',
    short_description: 'World-class point breaks, serene Pottuvil lagoon mangrove safaris with wild elephants, sunset beach bonfires, and boutique beachfront cabanas.',
    image_url: 'https://i.imgur.com/4wJwbqJ.jpg',
    base_price: 1400,
    currency: 'USD',
    is_active: true,
    sort_order: 6,
    category: 'Island',
    highlights: [
      'Private Surfing Masterclass with Pro Instructor',
      'Pottuvil Lagoon Elephant & Bird Watching Safari',
      'Kumana National Park Wilderness Expedition',
      'Luxury Oceanfront Eco-Cabana with Private Sun Deck'
    ],
    duration: '6 Days / 5 Nights',
    rating: 4.97,
    review_count: 79,
  },
  {
    id: 'yala-national-park-leopard-reserve',
    name: 'Yala National Park Leopard Reserve',
    slug: 'yala-national-park-leopard-reserve',
    country: 'Sri Lanka',
    short_description: 'Premier wildlife safaris in the world’s densest leopard territory, luxury tented pavilions with private plunge pools, and starlit bush banquets.',
    image_url: 'https://i.imgur.com/8RHRsgt.jpg',
    base_price: 1850,
    currency: 'USD',
    is_active: true,
    sort_order: 7,
    category: 'Safari',
    highlights: [
      'Private Dawn & Dusk Leopard Tracking Safaris',
      'Luxury All-Inclusive Glamping Pavilion with Plunge Pool',
      'Wild Bush BBQ Banquet under the Stars',
      'Expert Resident Naturalist & Wildlife Photographer'
    ],
    duration: '4 Days / 3 Nights',
    rating: 4.99,
    review_count: 148,
  },
  {
    id: 'anuradhapura-sacred-kingdom',
    name: 'Anuradhapura Sacred Kingdom',
    slug: 'anuradhapura-sacred-kingdom',
    country: 'Sri Lanka',
    short_description: 'Majestic ancient stupas, sacred bodhi trees, and tranquil monastery ruins in Sri Lanka’s legendary historic capital.',
    image_url: '/src/assets/images/anuradhapura_card_1787120854958.jpg',
    base_price: 1450,
    currency: 'USD',
    is_active: true,
    sort_order: 8,
    category: 'Cultural',
    highlights: [
      'Ruwanwelisaya White Stupa Pilgrimage',
      'Sacred Jaya Sri Maha Bodhi VIP Blessing',
      'Private Sunrise Cycling Tour of Ancient Monasteries',
      'Heritage Eco-Sanctuary Lodge Stay'
    ],
    duration: '5 Days / 4 Nights',
    rating: 4.97,
    review_count: 86,
  },
  {
    id: 'amalfi-coast-positano',
    name: 'Amalfi Coast & Positano',
    slug: 'amalfi-coast-positano',
    country: 'Italy',
    short_description: 'Cliffside Mediterranean villas, private yacht charters around Capri, and Michelin-starred sunset dining.',
    image_url: '/src/assets/images/amalfi_card_1787120876980.jpg',
    base_price: 3450,
    currency: 'USD',
    is_active: true,
    sort_order: 9,
    category: 'Island',
    highlights: ['Private Riva Yacht to Capri', 'Exclusive Cliffside Suite in Positano', 'Limoncello & Olive Estate Tasting', 'Sunset Dining at La Sponda'],
    duration: '7 Days / 6 Nights',
    rating: 4.96,
    review_count: 84,
  },
  {
    id: 'kyoto-mount-fuji-sanctuary',
    name: 'Kyoto & Mount Fuji Sanctuary',
    slug: 'kyoto-mount-fuji-sanctuary',
    country: 'Japan',
    short_description: 'Private tea ceremonies in centuries-old zen gardens, Michelin kaiseki dinners, and natural onsen overlooking Fuji.',
    image_url: '/src/assets/images/kyoto_card_1787120892079.jpg',
    base_price: 4800,
    currency: 'USD',
    is_active: true,
    sort_order: 10,
    category: 'Cultural',
    highlights: ['Private Shinkansen Gran Class', 'Master-Led Chado Tea Ceremony', 'Private Access to Golden Pavilion at Dawn', 'Natural Cedar Hot Spring Ryokan'],
    duration: '9 Days / 8 Nights',
    rating: 4.98,
    review_count: 112,
  },
  {
    id: 'zermatt-matterhorn-chalet',
    name: 'Zermatt & Matterhorn Chalet',
    slug: 'zermatt-matterhorn-chalet',
    country: 'Switzerland',
    short_description: 'Helicopter ski drops onto virgin alpine powder, private fondue igloos, and 5-star mountain-view spa retreats.',
    image_url: '/src/assets/images/zermatt_card_1787120905114.jpg',
    base_price: 5200,
    currency: 'USD',
    is_active: true,
    sort_order: 11,
    category: 'Alpine',
    highlights: ['Heli-Skiing on Monte Rosa', 'Glacier Palace Private Tour', 'Private Chalet with Michelin Chef', 'Thermal Hydrotherapy Spa'],
    duration: '6 Days / 5 Nights',
    rating: 4.95,
    review_count: 67,
  },
  {
    id: 'galle',
    name: 'Galle Dutch Fort & Ocean Promenade',
    slug: 'galle',
    country: 'Sri Lanka',
    short_description: '17th-century colonial Dutch ramparts, boutique cobblestone alleys, private ocean view villas, and southern coastline whale safaris.',
    image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
    base_price: 1500,
    currency: 'USD',
    is_active: true,
    sort_order: 12,
    category: 'Cultural',
    highlights: ['Private Sunset Walk on Dutch Fort Ramparts', 'Boutique Heritage Villa Suite', 'Southern Coastal Cinnamon Estate Tour', 'Mirissa Catamaran Whale Cruise'],
    duration: '5 Days / 4 Nights',
    rating: 4.97,
    review_count: 98,
  }
];

export const TRAVEL_BENEFITS = [
  {
    iconName: 'Compass',
    title: 'Curated Private Expeditions',
    description: 'Each journey is meticulously custom-crafted by dedicated destination connoisseurs with exclusive local access.',
  },
  {
    iconName: 'ShieldCheck',
    title: 'Uncompromising VIP Safety & Care',
    description: 'Round-the-clock personal concierge, premier travel insurance integration, and vetted private transportation.',
  },
  {
    iconName: 'Sparkles',
    title: 'Bespoke Luxury Amenities',
    description: 'Enjoy complimentary suite upgrades, private yacht charters, Michelin-starred reservations, and airport fast-track.',
  },
  {
    iconName: 'CalendarCheck',
    title: 'Flexible & Transparent Booking',
    description: 'Clear pricing, zero hidden fees, flexible rescheduling terms, and direct Supabase database confirmation.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Dilshan Senanayake',
    title: 'Ella & Nuwara Eliya Scenic Expedition',
    quote: 'The private train crossing over the Nine Arch Bridge and sunrise hike to Little Adam’s Peak were breathtaking. Truly the most seamless journey.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'Colombo, Sri Lanka',
  },
  {
    name: 'Lady Victoria Hamilton',
    title: 'Anuradhapura & Kandy Cultural Journey',
    quote: 'The attention to detail was beyond anything I have experienced. The private blessings at the Temple of the Tooth and Ruwanwelisaya were unforgettable.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'London, United Kingdom',
  },
  {
    name: 'Marcus & Elena Vance',
    title: 'Trincomalee Coastal & Whale Safari',
    quote: 'Watching blue whales from our private catamaran in Trincomalee followed by sunset at Koneswaram Temple was a once-in-a-lifetime experience.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    location: 'San Francisco, USA',
  },
];
