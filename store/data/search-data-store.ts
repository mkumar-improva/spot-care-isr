import { create } from "zustand";
import { Cares } from "@/types/care-types";
import { LatLngLiteral } from "@/types/location-types";

type State = {
  careTypes: Cares[];
  currentLocation: LatLngLiteral;
};

type Action = {
  setCareTypes: (careTypes: Cares[]) => void;
  setCurrentLocation: (location: LatLngLiteral) => void;
};

const useSearchDataStore = create<State & Action>((set) => ({
  careTypes: [],
  currentLocation: { lat: 40.7127753, lng: -74.0059728 },
  setCareTypes: (careTypes) => set({ careTypes }),
  setCurrentLocation: (location) => set({ currentLocation: location }),
}));

export default useSearchDataStore;
