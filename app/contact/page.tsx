import ContactComponent from "@/components/layout/Contact/Component";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Spot.care | Trusted Healthcare Providers in the USA',
  description: 'Contact Spot.care to connect with trusted healthcare providers in the USA, including assisted living, skilled nursing, hospice, and home health.',
};

export default function ContactPage() {
  return <ContactComponent />;
}
