import { findNearestProviders } from '@/lib/api';
import { ProviderGrid, QuerySummary } from '@/components/providers';

export const revalidate = 900;

type ProvidersPageProps = {
  searchParams?: {
    lat?: string;
    lon?: string;
    radius?: string;
    careType?: string;
    page?: string;
    pageSize?: string;
  };
};

type NormalizedQuery = {
  lat: number;
  lon: number;
  radius: number;
  careType: string;
  page: number;
  pageSize: number;
};

const DEFAULT_QUERY: NormalizedQuery = {
  lat: Number(process.env.DEFAULT_LAT ?? '33.9253024'),
  lon: Number(process.env.DEFAULT_LON ?? '-84.38574419999999'),
  radius: Number(process.env.DEFAULT_RADIUS ?? '5'),
  careType: String(process.env.DEFAULT_CARE_TYPE ?? 'Adult Day Care'),
  page: 1,
  pageSize: 1000,
};

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeQuery(searchParams: ProvidersPageProps['searchParams']): NormalizedQuery {
  return {
    lat: parseNumber(searchParams?.lat, DEFAULT_QUERY.lat),
    lon: parseNumber(searchParams?.lon, DEFAULT_QUERY.lon),
    radius: parseNumber(searchParams?.radius, DEFAULT_QUERY.radius),
    careType: searchParams?.careType ? String(searchParams.careType) : DEFAULT_QUERY.careType,
    page: parseNumber(searchParams?.page, DEFAULT_QUERY.page),
    pageSize: parseNumber(searchParams?.pageSize, DEFAULT_QUERY.pageSize),
  };
}

export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const query = normalizeQuery(searchParams);
  const providers = await findNearestProviders(query);

  return (
    <section className="space-y-8">
      <QuerySummary
        lat={query.lat}
        lon={query.lon}
        radius={query.radius}
        careType={query.careType}
        isrWindowMinutes={revalidate / 60}
      />
      <ProviderGrid providers={providers} />
    </section>
  );
}
