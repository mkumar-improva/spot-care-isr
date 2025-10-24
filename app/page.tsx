import PageHome from '@/components/layout/home/Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spot.care | Find Trusted Healthcare Providers in the USA',
  description: 'Connect with top-rated healthcare providers in the USA. Compare assisted living, skilled nursing, hospice, and home health services.',
};

export default function HomePage() {
  return (
    <PageHome />
  );
}
