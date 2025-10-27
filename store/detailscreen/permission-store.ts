import { create } from "zustand";
import { SiteSettingData } from "types/provider-details";

interface PermissionState {
  siteSettingData: SiteSettingData[];
  setSiteSettingData: (data: SiteSettingData[]) => void;
  resetPermissions: () => void;
}

const usePermissionStore = create<PermissionState>((set) => ({
  siteSettingData: [],
  
  setSiteSettingData: (data: SiteSettingData[]) =>
    set({ siteSettingData: data }),
  
  resetPermissions: () =>
    set({ siteSettingData: [] }),
}));

export default usePermissionStore;
