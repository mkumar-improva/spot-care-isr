import { create } from "zustand";

interface ReviewState {
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (value: boolean) => void;
  resetReview: () => void;
}

const useReviewStore = create<ReviewState>((set) => ({
  isReviewModalOpen: false,
  
  setIsReviewModalOpen: (value: boolean) =>
    set({ isReviewModalOpen: value }),
  
  resetReview: () =>
    set({ isReviewModalOpen: false }),
}));

export default useReviewStore;
