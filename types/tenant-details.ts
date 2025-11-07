import { StaticImageData } from 'next/image';

export enum Tenant  {
    DRD = 'drd', WELLSTAR = 'wellstar', Zocdoc = "zocdoc",
    Care = "care", Spot = "spot"
}
export type TenantDetails = {
    logo: {
        full: StaticImageData;
        semi: StaticImageData;
        symbol: StaticImageData;
        dark: StaticImageData;
    }
}