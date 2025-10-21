import PrivacyPolicy from "@/components/layout/Privacy/Component.Client";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Spot.care',
  description: 'Read Spot.care’s Privacy Policy to understand how we protect your data and ensure secure connections with healthcare providers in the USA.',
};

const PrivacyPage: React.FC = () => {
  return <PrivacyPolicy />;
}

export default PrivacyPage;