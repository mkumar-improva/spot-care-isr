import { notFound } from 'next/navigation';
import { getProvider } from '@/lib/api';

type Params = { params: { id: string } };

export const revalidate = 3600; // 1 hour for detail pages

export default async function ProviderPage({ params }: Params) {
  const code = params.id;
  try {
    const provider = await getProvider(code);
    const socialLinks = provider.socialLinks?.filter((link) => link.url) ?? [];


    return (
      <div className="container" style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>{provider.name}</h2>
          <p className="muted">Provider code: {provider.code}</p>
          {provider.description ? <p>{provider.description}</p> : null}

          <section>
            {provider.address ? <p>{provider.address}</p> : null}
            {provider.city || provider.state || provider.postalCode ? (
              <p>
                {[provider.city, provider.state, provider.postalCode].filter(Boolean).join(', ')}
              </p>
            ) : null}
            {provider.phoneNumbers?.length ? (
              <p>
                Phone: {provider.phoneNumbers.join(', ')}
              </p>
            ) : provider.phone ? (
              <p>Phone: {provider.phone}</p>
            ) : null}
            {provider.email ? <p>Email: {provider.email}</p> : null}
            {provider.services?.length ? (
              <p>Services: {provider.services.join(', ')}</p>
            ) : null}
          </section>
        </div>

        {provider.images?.length ? (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Gallery</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {provider.images.map((img) => (
                <figure key={img.id} style={{ margin: 0 }}>
                  <img
                    src={img.url}
                    alt={img.caption ?? provider.name}
                    style={{ maxWidth: '200px', borderRadius: '4px', border: '1px solid #eee' }}
                  />
                  {img.caption ? (
                    <figcaption className="muted" style={{ fontSize: '0.85rem' }}>
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {socialLinks.length ? (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Social & Web</h3>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.type ?? 'Link'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {provider.sections?.length ? (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Sections</h3>
            <ul>
              {provider.sections.map((section) => (
                <li key={section.id}>
                  {section.name}
                  {section.careType ? <span className="muted"> ({section.careType})</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  } catch (error) {
    console.warn('Failed to load provider', code, error);
    return notFound();
  }
}

// Optionally pre-render a small set of provider pages at build time.
// If your API supports an index of IDs, you can fetch and return them.
// Returning an empty array will defer to on-demand rendering with ISR.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [];
}
