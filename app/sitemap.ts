import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/providers`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ];
}
