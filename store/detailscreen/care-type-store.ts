import { create } from "zustand";
import { Cares, SiteSettings, } from '@/types/care-types';

type State = {
    careTypes: Cares[];
}

type Actions = {
    setCareTypes: (types: Cares[]) => void;
}

const useCareTypeStore = create<State & Actions>((set) => ({
    careTypes: [],
    setCareTypes: (types) => set({ careTypes: types }),
}));

export default useCareTypeStore;
export type { Cares};