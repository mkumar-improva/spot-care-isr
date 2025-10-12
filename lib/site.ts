const FALLBACK_SITE_URL = 'http://localhost:3000';
const DEFAULT_SOCIAL_IMAGE_ALT =
  'SpotCare Healthcare Provider Directory hero graphic with caregivers supporting patients.';

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return FALLBACK_SITE_URL;
  }

  const prefixed = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return prefixed.replace(/\/+$/, '');
}

/**
 * Resolve the canonical site URL used for metadata generation.
 * Prefers explicit configuration but gracefully falls back to localhost.
 */
export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  return envUrl ? normalizeUrl(envUrl) : FALLBACK_SITE_URL;
}

/**
 * Ensure the provided path or URL is absolute, resolving against the site URL when necessary.
 */
export function absoluteUrl(pathOrUrl: string): string {
  const siteUrl = getSiteUrl();
  const trimmed = pathOrUrl.trim();
  if (!trimmed) {
    return siteUrl;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    const normalizedPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
    return new URL(normalizedPath, `${siteUrl}/`).toString();
  }
}

export function getDefaultSocialImage(type: 'opengraph' | 'twitter' = 'opengraph') {
  const path = type === 'twitter' ? '/twitter-image' : '/opengraph-image';

  return {
    url: absoluteUrl(path),
    alt: DEFAULT_SOCIAL_IMAGE_ALT,
  };
}
