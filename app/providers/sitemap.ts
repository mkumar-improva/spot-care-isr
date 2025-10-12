import type { MetadataRoute } from 'next';
import { listProviders } from '@/lib/api';
import { getSiteUrl } from '@/lib/site';

export const revalidate = 30;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  try {
    const providers = await listProviders();
    const lastModified = new Date();

    return providers
      .filter((provider) => Boolean(provider.code))
      .map((provider) => ({
        url: `${baseUrl}/providers/${provider.code}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.6,
      }));
  } catch (error) {
    console.warn('Failed to build provider sitemap', error);
    return [];
  }
}
