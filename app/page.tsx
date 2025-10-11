import Link from 'next/link';
import { findNearestProviders } from '@/lib/api';

export const revalidate = 900; // Segment-level default (15 min)

type HomeProps = {
  searchParams?: {
    lat?: string;
    lon?: string;
    radius?: string;
    careType?: string;
    page?: string;
    pageSize?: string;
  };
};

export default async function HomePage({ searchParams }: HomeProps) {
  const lat = Number(searchParams?.lat ?? process.env.DEFAULT_LAT ?? '33.9253024');
  const lon = Number(searchParams?.lon ?? process.env.DEFAULT_LON ?? '-84.38574419999999');
  const radius = Number(searchParams?.radius ?? process.env.DEFAULT_RADIUS ?? '5');
  const careType = String(searchParams?.careType ?? process.env.DEFAULT_CARE_TYPE ?? 'Adult Day Care');
  const page = Number(searchParams?.page ?? 1);
  const pageSize = Number(searchParams?.pageSize ?? 1000);

  const providers = await findNearestProviders({ lat, lon, radius, careType, page, pageSize });

  return (
    <div className="container">
      <p className="muted">Incremental Static Regeneration enabled (15 min).</p>
      <p className="muted">
        Querying nearest providers for lat={lat}, lon={lon}, radius={radius} km, careType="{careType}".
      </p>
      <div className="grid">
        {providers.map((p) => (
          <Link key={p.code ?? p.id} href={`/providers/${p.code}`} className="card">
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <p className="muted">{p.services?.join(', ') || '—'}</p>
            {p.address ? <p style={{ marginBottom: 0 }}>{p.address}</p> : null}
            {p.city || p.state ? (
              <p className="muted" style={{ marginTop: '0.25rem' }}>
                {[p.city, p.state, p.postalCode].filter(Boolean).join(', ')}
              </p>
            ) : null}
            {p.phone ? <p>Phone: {p.phone}</p> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
