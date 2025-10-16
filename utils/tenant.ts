import { TenantDetails } from "@/types/tenant-details";
import WellstarSymbol from "@/assets/app/wellstar/symbol.png";
import WellstarFullLogo from "@/assets/app/wellstar/full.png";
import WellstarSemiLogo from "@/assets/app/wellstar/semi.png";
import WellstardarkLogo from "@/assets/app/wellstar/dark.png";

import Symbol from "@/assets/app/drd/symbol.png";
import FullLogo from "@/assets/app/drd/full.png";
import SemiLogo from "@/assets/app/drd/semi.png";
import darkLogo from "@/assets/app/drd/dark.png";

import zocDocSymbol from "@/assets/app/zocdoc/symbol.png";
import zocDocFullLogo from "@/assets/app/zocdoc/full.png";
import zocDocSemiLogo from "@/assets/app/zocdoc/semi.png";
import zocDocDarkLogo from "@/assets/app/zocdoc/dark.png";

import careSymbol from "@/assets/app/care/symbol.png";
import careFullLogo from "@/assets/app/care/full.png";
import careSemiLogo from "@/assets/app/care/semi.png";
import careDarkLogo from "@/assets/app/care/dark.png";

import spotSymbol from "@/assets/app/spot/symbol.png";
import spotFullLogo from "@/assets/app/spot/full.png";
import spotSemiLogo from "@/assets/app/spot/semi.png";
import spotDarkLogo from "@/assets/app/spot/dark.png";

export enum Tenant {
    Spot = "spot",
    Wellstar = "wellstar",
    Default = "default",
    Zocdoc = "zocdoc",
    Care = "care"
}

export const buildTenantDetails = (): TenantDetails => {
    return {
        logo: {
            full: WellstarFullLogo,
            semi: WellstarSemiLogo,
            symbol: WellstarSymbol,
            dark: WellstardarkLogo
        }
    }
}

export const buildDefaultTenantDetails = (): TenantDetails => {
    return {
        logo: {
            full: FullLogo,
            semi: SemiLogo,
            symbol: Symbol,
            dark: darkLogo
        }
    }
}

export const buildZocdocTenantDetails = (): TenantDetails => {
    return {
        logo: {
            full: zocDocFullLogo,
            semi: zocDocSemiLogo,
            symbol: zocDocSymbol,
            dark: zocDocDarkLogo
        }
    }
}

export const buildSpotTenantDetails = (): TenantDetails => {
    return {
        logo: {
            full: spotFullLogo,
            semi: spotSemiLogo,
            symbol: spotSymbol,
            dark: spotDarkLogo,
        }
    }
}

export const buildCareTenantDetails = (): TenantDetails => {
    return {
        logo: {
            full: careFullLogo,
            semi: careSemiLogo,
            symbol: careSymbol,
            dark: careDarkLogo
        }
    }
}

export const useTenantConfigs = (tenant: any): TenantDetails => {
    switch (tenant) {
        case Tenant.Default:
            return buildDefaultTenantDetails();
        case Tenant.Wellstar:
            return buildTenantDetails();
        case Tenant.Zocdoc:
            return buildZocdocTenantDetails();
        case Tenant.Care:
            return buildCareTenantDetails();
        case Tenant.Spot:
            return buildSpotTenantDetails();
        default:
            return buildSpotTenantDetails();
    }
}