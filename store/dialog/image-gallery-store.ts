import create from "zustand";
import { Providers } from "@/types/provider-details";

type State = {
  selectedProviderDetail: Providers | null;
  isImageGalleryOpen: boolean;
};

type Action = {
  setSelectedProviderDetails: (selectedProviderDetail: Providers) => void;
  setIsImageGalleryOpen: (isImageGalleryOpen: boolean) => void;
};

const ImageGalleryStore = create<State & Action>((set) => ({
  selectedProviderDetail: null,
  isImageGalleryOpen: false,

  setSelectedProviderDetails: (provider) => set({ selectedProviderDetail: provider }),
  setIsImageGalleryOpen: (isOpen) => set({ isImageGalleryOpen: isOpen }),
}));

export default ImageGalleryStore;