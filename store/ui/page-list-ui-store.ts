import { create } from "zustand";

type State = {
  rangeRatings: number[];
  isRecommendedActive: boolean;
  isRatingsActive: boolean;
  isShortDistanceActive: boolean;
  isLongDistanceActive: boolean;
  isAdvanceFilterAscending: boolean;
  isAdvanceFilterDescending: boolean;
  searchText: string;
  isSearchFocused: boolean;
};

type Actions = {
  setRangeRatings: (ratings: number[]) => void;
  setIsRecommendedActive: (val: boolean) => void;
  setIsRatingsActive: (val: boolean) => void;
  setIsShortDistanceActive: (val: boolean) => void;
  setIsLongDistanceActive: (val: boolean) => void;
  setIsAdvanceFilterAscending: (val: boolean) => void;
  setIsAdvanceFilterDescending: (val: boolean) => void;
  setSearchText: (text: string) => void;
  setIsSearchFocused: (val: boolean) => void;
};

const usePageListUIStore = create<State & Actions>((set) => ({
  rangeRatings: [0, 5],
  isRecommendedActive: true,
  isRatingsActive: false,
  isShortDistanceActive: false,
  isLongDistanceActive: false,
  isAdvanceFilterAscending: false,
  isAdvanceFilterDescending: false,
  searchText: "",
  isSearchFocused: false,
  setRangeRatings: (ratings: number[]) => set({ rangeRatings: ratings }),
  setIsRecommendedActive: (val: boolean) => set({ isRecommendedActive: val }),
  setIsRatingsActive: (val: boolean) => set({ isRatingsActive: val }),
  setIsShortDistanceActive: (val: boolean) =>
    set({ isShortDistanceActive: val }),
  setIsLongDistanceActive: (val: boolean) => set({ isLongDistanceActive: val }),
  setIsAdvanceFilterAscending: (val: boolean) =>
    set({ isAdvanceFilterAscending: val }),
  setIsAdvanceFilterDescending: (val: boolean) =>
    set({ isAdvanceFilterDescending: val }),
  setSearchText: (text: string) => set({ searchText: text }),
  setIsSearchFocused: (val: boolean) => set({ isSearchFocused: val }),
}));

export default usePageListUIStore;
