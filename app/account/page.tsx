import { Metadata } from "next";
import AccountPage from "@/components/layout/Account/Component";


export const metadata: Metadata = {
    title: "Profile | Spot Care",   
    description: "Manage your profile and account settings on Spot Care.",
};

export default function Account() {
  return <AccountPage />;
}