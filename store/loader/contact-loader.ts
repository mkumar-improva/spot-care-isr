import {create} from "zustand";

type State ={
    contactLoader: boolean;
}

type Action = {
    setContactLoader: (loading: boolean) => void;
}

const useContactLoader = create<State & Action>((set) => ({
    contactLoader: false,
    setContactLoader: (loading) => set({ contactLoader: loading }),
}));

export default useContactLoader;
