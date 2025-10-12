import type { Metadata } from 'next';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { getProvider } from '@/lib/api';
import type { ProviderDetail } from '@/lib/api';
import {
  ProviderGallery,
  ProviderOverview,
  ProviderSections,
  ProviderSocialLinks,
} from '@/components/providers';
import { absoluteUrl, getDefaultSocialImage, getSiteUrl } from '@/lib/site';

type Params = { params: { id: string } };

export const revalidate = 3600; // 30 seconds for detail pages

const SITE_NAME = 'SpotCare';
const FALLBACK_DESCRIPTION =
  'Explore healthcare providers on SpotCare to discover services, contact information, and up-to-date care availability.';

function buildLocation(provider: ProviderDetail): string | null {
  const segments = [provider.city, provider.state, provider.postalCode].filter(Boolean);
  return segments.length ? segments.join(', ') : null;
}

function buildDescription(provider: ProviderDetail): string {
  const trimmedDescription = provider.description?.trim();
  if (trimmedDescription) {
    return trimmedDescription;
  }

  const location = buildLocation(provider);
  const services =
    provider.services && provider.services.length ? provider.services.filter(Boolean).join(', ') : null;

  const parts = [
    `Learn more about ${provider.name}`,
    location ? `located in ${location}` : null,
    services ? `offering ${services}` : null,
    'Discover contact details, amenities, and care insights powered by SpotCare ISR.',
  ].filter(Boolean);

  return `${parts.join('. ')}.`;
}

function buildKeywords(provider: ProviderDetail): string[] {
  const keywords = new Set<string>([
    'SpotCare',
    'healthcare provider',
    'care services',
    'healthcare directory',
    provider.name,
  ]);

  if (provider.city) keywords.add(provider.city);
  if (provider.state) keywords.add(provider.state);
  if (provider.postalCode) keywords.add(provider.postalCode);

  provider.services?.forEach((service) => {
    if (service) {
      keywords.add(service);
      keywords.add(`${service} provider`);
    }
  });

  return Array.from(keywords);
}

function resolvePrimaryImage(provider: ProviderDetail) {
  const primary = provider.images?.find((image) => image?.url);
  if (!primary || !primary.url) {
    return null;
  }

  const isAbsolute = /^https?:\/\//i.test(primary.url);
  return {
    url: isAbsolute ? primary.url : null,
    alt: primary.caption?.trim() || `${provider.name} facility exterior`,
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(`/providers/${params.id}`);
  const { url: defaultOgImageUrl, alt: defaultOgAlt } = getDefaultSocialImage('opengraph');
  const { url: defaultTwitterImageUrl } = getDefaultSocialImage('twitter');

  try {
    const provider = await getProvider(params.id);
    const description = buildDescription(provider);
    const location = buildLocation(provider);
    const keywords = buildKeywords(provider);
    const primaryImage = resolvePrimaryImage(provider);
    const ogImageUrl = primaryImage?.url ?? defaultOgImageUrl;
    const ogImageAlt = primaryImage?.alt ?? defaultOgAlt;
    const twitterImageUrl = primaryImage?.url ?? defaultTwitterImageUrl;
    const title = `${provider.name} | ${SITE_NAME} Provider`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      keywords,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        type: 'website',
        url: pageUrl,
        title,
        description,
        siteName: SITE_NAME,
        locale: 'en_US',
        images: [
          {
            url: ogImageUrl,
            alt: ogImageAlt,
            width: 1200,
            height: 630,
          },
        ],
        phoneNumbers: provider.phoneNumbers,
        emails: provider.email ? [provider.email] : undefined,
        countryName: provider.state ?? undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [twitterImageUrl],
        site: '@SpotCare',
        creator: '@SpotCare',
      },
      other: {
        'provider:code': provider.code,
        'provider:location': location ?? '',
      },
    };
  } catch (error) {
    console.warn('Failed to generate metadata for provider', params.id, error);

    return {
      metadataBase: new URL(siteUrl),
      title: `Provider ${params.id} | ${SITE_NAME}`,
      description: FALLBACK_DESCRIPTION,
      keywords: ['SpotCare', 'healthcare provider directory'],
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        type: 'website',
        url: pageUrl,
        title: `Provider ${params.id} | ${SITE_NAME}`,
        description: FALLBACK_DESCRIPTION,
        siteName: SITE_NAME,
        locale: 'en_US',
        images: [
          {
            url: defaultOgImageUrl,
            alt: defaultOgAlt,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Provider ${params.id} | ${SITE_NAME}`,
        description: FALLBACK_DESCRIPTION,
        images: [defaultTwitterImageUrl],
        site: '@SpotCare',
        creator: '@SpotCare',
      },
    };
  }
}

export default async function ProviderPage({ params }: Params) {
  try {
    const provider = await getProvider(params.id);
    revalidateTag('providers:sitemap');

    return (
      <section className="space-y-8">
        <ProviderOverview provider={provider} />
        <ProviderGallery provider={provider} />
        <ProviderSocialLinks provider={provider} />
        <ProviderSections provider={provider} />
      </section>
    );
  } catch (error) {
    console.warn('Failed to load provider', params.id, error);
    return notFound();
  }
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [];
}
