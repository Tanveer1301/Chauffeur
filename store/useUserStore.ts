import { create } from 'zustand';
import { BookingRecord, LoyaltyAccount, CorporateAccount } from '@/types';
import { FLEET_TIERS } from '@/data/fleet';

interface UserState {
  userName: string;
  userEmail: string;
  isLoggedIn: boolean;

  loyaltyAccount: LoyaltyAccount;
  corporateAccount: CorporateAccount;
  isCorporateMode: boolean;
  toggleCorporateMode: () => void;

  language: 'EN' | 'FR' | 'DE' | 'AR' | 'JA';
  setLanguage: (lang: 'EN' | 'FR' | 'DE' | 'AR' | 'JA') => void;

  activeBooking: BookingRecord | null;
  setActiveBooking: (booking: BookingRecord | null) => void;

  bookingHistory: BookingRecord[];
  addBookingToHistory: (booking: BookingRecord) => void;
}

const INITIAL_BOOKING: BookingRecord = {
  id: 'SUP-892410',
  createdAt: new Date().toISOString(),
  mode: 'airport',
  pickup: 'JFK Airport Terminal 8 (Flight AA 100)',
  dropoff: 'Baccarat Hotel, 28 W 53rd St, New York, NY',
  date: '2026-08-22',
  time: '14:30',
  vehicle: FLEET_TIERS[0], // Maybach S580
  fareUSD: 310,
  status: 'DISPATCHED',
  driverName: 'Julian Thorne',
  driverPhone: '+1 (631) 535-3942',
  driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  vehiclePlate: 'SUPTA-01',
  currentLat: 40.6413,
  currentLng: -73.7781,
  flightNumber: 'AA 100',
  signboardName: 'LORD ALEXANDER MONTAGUE',
  currency: 'USD',
};

export const useUserStore = create<UserState>((set) => ({
  userName: 'Lord Alexander Montague',
  userEmail: 'alexander@suptaconcierge.com',
  isLoggedIn: true,

  loyaltyAccount: {
    tier: 'Obsidian Black Card',
    pointsBalance: 14250,
    lifetimeSpendUSD: 48500,
    complimentaryHoursAvailable: 6,
    nextTierProgressPercent: 88,
  },

  corporateAccount: {
    companyName: 'Montague Capital Management LLC',
    corporateId: 'CORP-88902',
    walletBalanceUSD: 24500,
    monthlyLimitUSD: 50000,
    billingEmail: 'billing@montaguecap.com',
    membersCount: 14,
    unpaidInvoiceUSD: 3420,
  },

  isCorporateMode: false,
  toggleCorporateMode: () => set((state) => ({ isCorporateMode: !state.isCorporateMode })),

  language: 'EN',
  setLanguage: (language) => set({ language }),

  activeBooking: INITIAL_BOOKING,
  setActiveBooking: (activeBooking) => set({ activeBooking }),

  bookingHistory: [
    INITIAL_BOOKING,
    {
      id: 'SUP-771902',
      createdAt: '2026-08-15T10:00:00Z',
      mode: 'hourly',
      pickup: 'Financial District, Wall St',
      dropoff: 'Midtown East Offices',
      date: '2026-08-15',
      time: '09:00',
      vehicle: FLEET_TIERS[1], // Escalade ESV
      fareUSD: 740,
      status: 'COMPLETED',
      driverName: 'Marcus Vance',
      driverPhone: '+1 (631) 535-3942',
      driverPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      vehiclePlate: 'SUPTA-04',
      currentLat: 40.7075,
      currentLng: -74.0112,
      currency: 'USD',
    },
    {
      id: 'SUP-654109',
      createdAt: '2026-08-01T18:00:00Z',
      mode: 'experience',
      pickup: 'Central Park West',
      dropoff: 'Metropolitan Opera House',
      date: '2026-08-01',
      time: '19:00',
      vehicle: FLEET_TIERS[2], // Rolls-Royce Phantom
      fareUSD: 980,
      status: 'COMPLETED',
      driverName: 'Julian Thorne',
      driverPhone: '+1 (631) 535-3942',
      driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      vehiclePlate: 'SUPTA-RR',
      currentLat: 40.7711,
      currentLng: -73.9837,
      currency: 'USD',
    },
  ],
  addBookingToHistory: (booking) =>
    set((state) => ({
      bookingHistory: [booking, ...state.bookingHistory],
      activeBooking: booking,
    })),
}));
