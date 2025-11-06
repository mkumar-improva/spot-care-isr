import create from "zustand";
import { LatLngLiteral } from "@/types/location-types";

type State = {
  isTouchDevice: boolean;
  latLng: LatLngLiteral | null;
};

type Actions = {
  setIsTouchDevice: (val: boolean) => void;
  setLatLng: (latLng: LatLngLiteral | null) => void;
};

const useCommonUiStore = create<State & Actions>((set) => ({
  isTouchDevice: false,
  latLng: null,
  setLatLng: (latLng) => set({ latLng }),
  setIsTouchDevice: (val: boolean) => set({ isTouchDevice: val }),
}));

export default useCommonUiStore;
