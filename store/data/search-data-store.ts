import { create } from "zustand";
import { Cares } from "@/types/care-types";
import { LatLngLiteral } from "@/types/location-types";
import { IpInfo } from "@/types/ip-info";

type State = {
  careTypes: Cares[];
  currentLocation: LatLngLiteral;
  ipInfo: IpInfo | null;
};

type Action = {
  setCareTypes: (careTypes: Cares[]) => void;
  setCurrentLocation: (location: LatLngLiteral) => void;
  setIpInfo: (ipInfo: IpInfo | null) => void;
};

const useSearchDataStore = create<State & Action>((set) => ({
  careTypes: [],
  currentLocation: { lat: 40.7127753, lng: -74.0059728 },
  ipInfo: null,
  setCareTypes: (careTypes) => set({ careTypes }),
  setCurrentLocation: (location) => set({ currentLocation: location }),
  setIpInfo: (ipInfo) => set({ ipInfo }),
}));

export default useSearchDataStore;
