export enum Tenant  {
    DRD = 'drd', WELLSTAR = 'wellstar', Zocdoc = "zocdoc",
    Care = "care", Spot = "spot"
}
export type TenantDetails = {
    logo: {
        full: string;
        semi: string;
        symbol: string
        dark: string;
    }
}