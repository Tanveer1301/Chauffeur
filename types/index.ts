export type BookingMode = 'point-to-point' | 'hourly' | 'airport' | 'experience';

export type VehicleCategory = 'sedan' | 'suv' | 'limo' | 'sprinter';

export interface VehicleTier {
  id: VehicleCategory;
  name: string;
  subtitle: string;
  modelName: string;
  passengers: number;
  luggage: number;
  baseRate: number;
  perMileRate: number;
  hourlyRate: number;
  image: string;
  features: string[];
  description: string;
}

export type Currency = 'USD';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  rate: number;
  flag: string;
}

export interface LuxuryAddons {
  champagne: boolean;
  starlinkWifi: boolean;
  childSeat: boolean;
  mineralWater: boolean;
  newspapers: boolean;
  quietRide: boolean;
}

export interface Waypoint {
  id: string;
  address: string;
}

export interface FlightInfo {
  flightNumber: string;
  airline: string;
  airport: string;
  terminal: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'ON TIME' | 'DELAYED' | 'LANDED' | 'SCHEDULED';
  delayMinutes: number;
  gate: string;
}

export interface ExperiencePackage {
  id: string;
  title: string;
  category: 'Corporate' | 'Wedding' | 'Sightseeing' | 'Gala';
  description: string;
  fixedPriceUSD: number;
  durationHours: number;
  vehicle: VehicleCategory;
  includedAddons: (keyof LuxuryAddons)[];
  highlights: string[];
  badge: string;
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  mode: BookingMode;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: VehicleTier;
  fareUSD: number;
  status: 'DISPATCHED' | 'CONFIRMED' | 'COMPLETED' | 'IN_PROGRESS';
  driverName: string;
  driverPhone: string;
  driverPhoto: string;
  vehiclePlate: string;
  currentLat: number;
  currentLng: number;
  flightNumber?: string;
  signboardName?: string;
  currency: Currency;
}

export interface LoyaltyAccount {
  tier: 'Obsidian Black Card' | 'Platinum Sovereign' | 'Gold VIP';
  pointsBalance: number;
  lifetimeSpendUSD: number;
  complimentaryHoursAvailable: number;
  nextTierProgressPercent: number;
}

export interface CorporateAccount {
  companyName: string;
  corporateId: string;
  walletBalanceUSD: number;
  monthlyLimitUSD: number;
  billingEmail: string;
  membersCount: number;
  unpaidInvoiceUSD: number;
}
