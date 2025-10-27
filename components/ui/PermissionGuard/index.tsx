import type { ReactNode } from "react"
import usePermissionStore from "@/store/detailscreen/permission-store"

interface PermissionGuardProps {
    siteKey: string
    children: ReactNode
    fallback?: ReactNode
}

export function PermissionGuard({ siteKey, children }: PermissionGuardProps) {
    const { siteSettingData } = usePermissionStore();
    // Find the setting for the given site key
    const setting = siteSettingData.find((setting) => setting.siteKey === siteKey)

    if (!setting) return <>{children}</> // If no setting found, render children by default

    // Check if the setting exists and is enabled
    const isEnabled = setting?.is_enabled === true
    // Render children if enabled, otherwise render fallback
    return isEnabled ? <>{children}</> : <></>
}