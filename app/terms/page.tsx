import Terms from "@/components/layout/Terms/Component";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Spot.care',
  description: 'Read Spot.care’s Terms & Conditions to understand the rules and guidelines for using our platform and connecting with healthcare providers in the USA.',
};

export default function TermsPage() {
    return <Terms />;
}