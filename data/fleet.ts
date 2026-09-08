import { VehicleTier, ExperiencePackage, CurrencyInfo } from '@/types';

export const FLEET_TIERS: VehicleTier[] = [
  {
    id: 'sedan',
    name: 'First Class Sedan',
    subtitle: 'Mercedes-Maybach S580 / S-Class Executive',
    modelName: 'Maybach S580',
    passengers: 3,
    luggage: 3,
    baseRate: 180,
    perMileRate: 6.5,
    hourlyRate: 150,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Active Noise Cancellation Cabin',
      'Executive Rear Reclining Seats',
      'Burmester 4D Surround Sound',
      'Dual Rear Entertainment Displays',
      'Chilled Rear Armrest Console'
    ],
    description: 'The pinnacle of corporate elegance and whisper-quiet serenity for executive travel.'
  },
  {
    id: 'suv',
    name: 'Executive SUV',
    subtitle: '2026 Cadillac Escalade ESV Concierge Edition',
    modelName: 'Escalade ESV',
    passengers: 6,
    luggage: 6,
    baseRate: 220,
    perMileRate: 7.5,
    hourlyRate: 185,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Extended Wheelbase Storage',
      'Curved 38-inch OLED Dashboard Display',
      'AKG Studio Reference 36-Speaker System',
      'Privacy Glass & Acoustic Glazing',
      'All-Wheel Drive Air Suspension'
    ],
    description: 'Dominant command, generous legroom, and effortless luggage capacity for airport VIP arrivals.'
  },
  {
    id: 'limo',
    name: 'Ultra-Luxury Limousine',
    subtitle: 'Rolls-Royce Phantom VIII Extended Wheelbase',
    modelName: 'Rolls-Royce Phantom',
    passengers: 4,
    luggage: 4,
    baseRate: 450,
    perMileRate: 15.0,
    hourlyRate: 380,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Handcrafted Starlight Headliner',
      'Bespoke Champagne Cooler & Crystal Flutes',
      'Lambswool Footwear Carpeting',
      'Electrically Operated Rear Theater Doors',
      'V12 Twin-Turbo Whisper Glide Engine'
    ],
    description: 'The undisputed worldwide symbol of high-net-worth status, red carpet entrances, and royal escorts.'
  },
  {
    id: 'sprinter',
    name: 'VIP Jet Class Sprinter',
    subtitle: 'Custom Jet-Class Mercedes Sprinter 3500 HD',
    modelName: 'Jet Sprinter',
    passengers: 10,
    luggage: 10,
    baseRate: 320,
    perMileRate: 9.5,
    hourlyRate: 240,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Italian Maybach Leather Captain Chairs',
      '55-inch 4K Smart OLED Display + Apple TV',
      'Starlink Satellite High-Speed Internet',
      'Private On-Board Restroom Option',
      'Motorized Privacy Partition'
    ],
    description: 'Mobile luxury boardroom and high-capacity VIP escort designed for delegation roadshows.'
  }
];

export const EXPERIENCE_PACKAGES: ExperiencePackage[] = [
  {
    id: 'pkg-roadshow',
    title: 'Corporate Financial Roadshow',
    category: 'Corporate',
    description: 'Seamless multi-stop itinerary for investment bankers, executives, and board members with dedicated dispatch coordination.',
    fixedPriceUSD: 1450,
    durationHours: 8,
    vehicle: 'sprinter',
    includedAddons: ['starlinkWifi', 'mineralWater', 'newspapers'],
    highlights: ['Dedicated Chauffeur Lead', 'Multi-Stop Dynamic Routing', 'Consolidated Corporate Billing', 'Starlink 5G Ultra Wi-Fi'],
    badge: 'MOST POPULAR'
  },
  {
    id: 'pkg-wedding',
    title: 'Royal Wedding Escort & Fleet',
    category: 'Wedding',
    description: 'Red carpet bridal entrance in a Rolls-Royce Phantom, accompanied by chilled Dom Pérignon and tuxedo-clad lead chauffeur.',
    fixedPriceUSD: 1890,
    durationHours: 6,
    vehicle: 'limo',
    includedAddons: ['champagne', 'quietRide', 'mineralWater'],
    highlights: ['White Glove Chauffeur Entry', 'Bespoke Satin Ribbon Decor', 'Dom Pérignon 2012 Vintage', 'Red Carpet Unrolling'],
    badge: 'ULTRA LUXURY'
  },
  {
    id: 'pkg-gala',
    title: 'Red Carpet Gala & Premiere',
    category: 'Gala',
    description: 'VIP arrival staging with direct venue coordination, photo line holding, and late-night return transfer.',
    fixedPriceUSD: 980,
    durationHours: 5,
    vehicle: 'sedan',
    includedAddons: ['champagne', 'mineralWater'],
    highlights: ['Priority Venue Access', 'Unscheduled Hold Time Included', 'Chilled Refreshments'],
    badge: 'VIP EVENT'
  },
  {
    id: 'pkg-tour',
    title: 'Private City Landmarks Tour',
    category: 'Sightseeing',
    description: 'Curated architectural and cultural tour with knowledgeable chauffeur, tailored stopping points, and luxury refreshments.',
    fixedPriceUSD: 720,
    durationHours: 4,
    vehicle: 'suv',
    includedAddons: ['mineralWater', 'childSeat', 'newspapers'],
    highlights: ['Flexible Custom Stops', 'Panoramic Skyview Glazing', 'Child Seat Accommodations Available'],
    badge: 'BESPOKE'
  }
];

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', rate: 1.0, flag: '🇺🇸' }
];
