import { create } from 'zustand';
import { VehicleCategory } from '@/types';

interface FleetState {
  selectedVehicleId: VehicleCategory;
  setSelectedVehicleId: (id: VehicleCategory) => void;

  paintColor: string;
  setPaintColor: (color: string) => void;

  paintFinish: 'metallic' | 'satin' | 'pearl';
  setPaintFinish: (finish: 'metallic' | 'satin' | 'pearl') => void;

  rimStyle: 'gold-spoke' | 'black-concave' | 'chrome';
  setRimStyle: (rim: 'gold-spoke' | 'black-concave' | 'chrome') => void;

  tintLevel: number; // 0.1, 0.85, 0.98
  setTintLevel: (tint: number) => void;

  interiorMode: boolean;
  setInteriorMode: (val: boolean) => void;

  autoRotate: boolean;
  setAutoRotate: (rotate: boolean) => void;

  scrollRoadProgress: number;
  setScrollRoadProgress: (progress: number) => void;
}

export const useFleetStore = create<FleetState>((set) => ({
  selectedVehicleId: 'sedan',
  setSelectedVehicleId: (selectedVehicleId) => set({ selectedVehicleId }),

  paintColor: '#0B0B0E', // Default Obsidian Metallic
  setPaintColor: (paintColor) => set({ paintColor }),

  paintFinish: 'metallic',
  setPaintFinish: (paintFinish) => set({ paintFinish }),

  rimStyle: 'gold-spoke',
  setRimStyle: (rimStyle) => set({ rimStyle }),

  tintLevel: 0.85, // Executive privacy tint
  setTintLevel: (tintLevel) => set({ tintLevel }),

  interiorMode: false,
  setInteriorMode: (interiorMode) => set({ interiorMode }),

  autoRotate: true,
  setAutoRotate: (autoRotate) => set({ autoRotate }),

  scrollRoadProgress: 0,
  setScrollRoadProgress: (scrollRoadProgress) => set({ scrollRoadProgress }),
}));
