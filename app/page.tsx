import { SearchForm } from '@/components/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spot.care | Find Trusted Healthcare Providers in the USA',
  description: 'Connect with top-rated healthcare providers in the USA. Compare assisted living, skilled nursing, hospice, and home health services.',
};

const DEFAULT_LAT = Number(process.env.DEFAULT_LAT ?? '33.9253024');
const DEFAULT_LON = Number(process.env.DEFAULT_LON ?? '-84.38574419999999');
const DEFAULT_RADIUS = Number(process.env.DEFAULT_RADIUS ?? '5');
const DEFAULT_CARE_TYPE = String(process.env.DEFAULT_CARE_TYPE ?? 'Adult Day Care');

export default function HomePage() {
  return (
    <section className="grid gap-16 py-10">
      <div className="grid gap-6 text-center sm:text-left">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          SpotCare Provider Directory
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Find the right care provider in seconds.
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:mx-0">
          Search across the SpotCare network using geographic coordinates, care types, and radius filters.
          We keep every listing fresh with Incremental Static Regeneration so you always see near real-time updates.
        </p>
      </div>

      <SearchForm
        defaultCareType={DEFAULT_CARE_TYPE}
        defaultLat={DEFAULT_LAT}
        defaultLon={DEFAULT_LON}
        defaultRadius={DEFAULT_RADIUS}
        className="mx-auto w-full max-w-3xl"
      />
    </section>
  );
}
