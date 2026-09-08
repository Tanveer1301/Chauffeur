import { create } from 'zustand';
import { BookingMode, VehicleCategory, Currency, LuxuryAddons, Waypoint, BookingRecord } from '@/types';
import { FLEET_TIERS, CURRENCIES, EXPERIENCE_PACKAGES } from '@/data/fleet';

interface BookingState {
  mode: BookingMode;
  setMode: (mode: BookingMode) => void;

  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
  dropoffLocation: string;
  setDropoffLocation: (loc: string) => void;

  waypoints: Waypoint[];
  addWaypoint: () => void;
  updateWaypoint: (id: string, address: string) => void;
  removeWaypoint: (id: string) => void;

  pickupDate: string;
  setPickupDate: (date: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;

  durationHours: number;
  setDurationHours: (hours: number) => void;

  flightNumber: string;
  setFlightNumber: (num: string) => void;
  airline: string;
  setAirline: (airline: string) => void;
  airport: string;
  setAirport: (airport: string) => void;
  terminal: string;
  setTerminal: (terminal: string) => void;
  meetAndGreet: boolean;
  setMeetAndGreet: (val: boolean) => void;
  signboardName: string;
  setSignboardName: (name: string) => void;

  selectedVehicle: VehicleCategory;
  setSelectedVehicle: (veh: VehicleCategory) => void;

  passengers: number;
  setPassengers: (num: number) => void;
  luggage: number;
  setLuggage: (num: number) => void;

  selectedPackageId: string | null;
  setSelectedPackageId: (id: string | null) => void;

  addons: LuxuryAddons;
  toggleAddon: (key: keyof LuxuryAddons) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;

  estimatedMiles: number;
  setEstimatedMiles: (miles: number) => void;

  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;

  activeTab: 'booking' | 'fleet' | 'flight' | 'dashboard' | 'corporate';
  setActiveTab: (tab: 'booking' | 'fleet' | 'flight' | 'dashboard' | 'corporate') => void;

  calculateTotalFareUSD: () => number;
  getFormattedFare: () => string;
  createBookingRecord: () => BookingRecord;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  mode: 'point-to-point',
  setMode: (mode) => set({ mode }),

  pickupLocation: 'John F. Kennedy International Airport (JFK), NY',
  setPickupLocation: (pickupLocation) => set({ pickupLocation }),
  dropoffLocation: 'The Plaza Hotel, Fifth Avenue, New York, NY',
  setDropoffLocation: (dropoffLocation) => set({ dropoffLocation }),

  waypoints: [],
  addWaypoint: () =>
    set((state) => ({
      waypoints: [
        ...state.waypoints,
        { id: Math.random().toString(36).substr(2, 9), address: '' },
      ],
    })),
  updateWaypoint: (id, address) =>
    set((state) => ({
      waypoints: state.waypoints.map((w) => (w.id === id ? { ...w, address } : w)),
    })),
  removeWaypoint: (id) =>
    set((state) => ({
      waypoints: state.waypoints.filter((w) => w.id !== id),
    })),

  pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  setPickupDate: (pickupDate) => set({ pickupDate }),
  pickupTime: '14:30',
  setPickupTime: (pickupTime) => set({ pickupTime }),

  durationHours: 4,
  setDurationHours: (durationHours) => set({ durationHours }),

  flightNumber: 'AA 100',
  setFlightNumber: (flightNumber) => set({ flightNumber }),
  airline: 'American Airlines',
  setAirline: (airline) => set({ airline }),
  airport: 'JFK Airport',
  setAirport: (airport) => set({ airport }),
  terminal: 'Terminal 8',
  setTerminal: (terminal) => set({ terminal }),
  meetAndGreet: true,
  setMeetAndGreet: (meetAndGreet) => set({ meetAndGreet }),
  signboardName: 'LORD ALEXANDER MONTAGUE',
  setSignboardName: (signboardName) => set({ signboardName }),

  selectedVehicle: 'sedan',
  setSelectedVehicle: (selectedVehicle) => set({ selectedVehicle }),

  passengers: 2,
  setPassengers: (passengers) => set({ passengers }),
  luggage: 2,
  setLuggage: (luggage) => set({ luggage }),

  selectedPackageId: null,
  setSelectedPackageId: (selectedPackageId) => set({ selectedPackageId }),

  addons: {
    champagne: true,
    starlinkWifi: true,
    childSeat: false,
    mineralWater: true,
    newspapers: false,
    quietRide: true,
  },
  toggleAddon: (key) =>
    set((state) => ({
      addons: { ...state.addons, [key]: !state.addons[key] },
    })),

  currency: 'USD',
  setCurrency: (currency) => set({ currency }),

  estimatedMiles: 18.5,
  setEstimatedMiles: (estimatedMiles) => set({ estimatedMiles }),

  isCheckoutOpen: false,
  setCheckoutOpen: (isCheckoutOpen) => set({ isCheckoutOpen }),

  activeTab: 'booking',
  setActiveTab: (activeTab) => set({ activeTab }),

  calculateTotalFareUSD: () => {
    const state = get();
    const vehicle = FLEET_TIERS.find((v) => v.id === state.selectedVehicle) || FLEET_TIERS[0];

    if (state.mode === 'experience' && state.selectedPackageId) {
      const pkg = EXPERIENCE_PACKAGES.find((p) => p.id === state.selectedPackageId);
      if (pkg) return pkg.fixedPriceUSD;
    }

    let subtotal = 0;

    if (state.mode === 'hourly') {
      subtotal = vehicle.hourlyRate * state.durationHours;
    } else {
      subtotal = vehicle.baseRate + state.estimatedMiles * vehicle.perMileRate;
    }

    subtotal += state.waypoints.filter((w) => w.address.trim() !== '').length * 45;

    if (state.mode === 'airport' && state.meetAndGreet) {
      subtotal += 60;
    }

    if (state.addons.champagne) subtotal += 150;
    if (state.addons.starlinkWifi) subtotal += 40;
    if (state.addons.childSeat) subtotal += 35;
    if (state.addons.mineralWater) subtotal += 25;

    return Math.round(subtotal);
  },

  getFormattedFare: () => {
    const state = get();
    const usdFare = state.calculateTotalFareUSD();
    return `$${usdFare.toLocaleString()}`;
  },

  createBookingRecord: () => {
    const state = get();
    const vehicle = FLEET_TIERS.find((v) => v.id === state.selectedVehicle) || FLEET_TIERS[0];
    const fare = state.calculateTotalFareUSD();

    return {
      id: `SUP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      mode: state.mode,
      pickup: state.pickupLocation,
      dropoff: state.dropoffLocation,
      date: state.pickupDate,
      time: state.pickupTime,
      vehicle,
      fareUSD: fare,
      status: 'DISPATCHED',
      driverName: 'Julian Thorne',
      driverPhone: '+1 (631) 535-3942',
      driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      vehiclePlate: 'SUPTA-01',
      currentLat: 40.6413,
      currentLng: -73.7781,
      flightNumber: state.mode === 'airport' ? state.flightNumber : undefined,
      signboardName: state.signboardName,
      currency: 'USD',
    };
  },
}));
