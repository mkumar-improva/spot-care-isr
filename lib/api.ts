type FetchOptions = {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
};

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  // Do not throw at import time in Next, but surface helpful error at runtime.
  // eslint-disable-next-line no-console
  console.warn('API_BASE_URL is not set. Set it in your environment.');
}

async function apiFetch<T>(pathWithQuery: string, options: FetchOptions = {}): Promise<T> {
  if (!API_BASE_URL) throw new Error('Missing API_BASE_URL');
  const url = `${API_BASE_URL}${pathWithQuery}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
    cache: options.cache ?? 'force-cache',
  } as RequestInit);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Raw API response shapes from SpotCare backend
export type ProviderApi = {
  id: number;
  code: string;
  name: string;
  phone?: string;
  email?: string;
  images?: unknown[];
  isSponsored?: boolean;
  locations?: Array<{
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    postalCode?: string;
  }>;
  services?: string[];
  rating?: number | null;
  [key: string]: unknown;
};

export type FindNearestResponse = {
  data: ProviderApi[];
  [key: string]: unknown;
};

// Normalized provider used by the UI
export type Provider = {
  id: number;
  code: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  services?: string[];
};

function normalize(p: ProviderApi): Provider {
  const loc = (p.locations && p.locations[0]) || {};
  return {
    id: p.id,
    code: p.code,
    name: p.name,
    phone: p.phone,
    email: p.email,
    address: loc.address,
    city: loc.city,
    state: loc.state,
    postalCode: loc.postalCode,
    latitude: loc.latitude,
    longitude: loc.longitude,
    services: p.services,
  };
}

export type FindNearestParams = {
  lat: number;
  lon: number;
  radius: number;
  careType: string;
  page?: number;
  pageSize?: number;
};

export async function findNearestProviders(params: FindNearestParams): Promise<Provider[]> {
  const { lat, lon, radius, careType, page = 1, pageSize = 100 } = params;
  const qs = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius: String(radius),
    careType,
    page: String(page),
    pageSize: String(pageSize),
  }).toString();

  const tag = `nearest:${lat}:${lon}:${radius}:${careType}:${page}:${pageSize}`;
  const json = await apiFetch<FindNearestResponse>(`/provider/findNearest?${qs}`, {
    revalidate: 900, // 15 minutes for listing
    tags: ['providers', tag],
  });
  const items = Array.isArray(json?.data) ? json.data : [];
  return items.map(normalize);
}

// Backward-compatible helper used by the homepage with env defaults
export async function listProviders(): Promise<Provider[]> {
  const lat = Number(process.env.DEFAULT_LAT ?? '33.9253024');
  const lon = Number(process.env.DEFAULT_LON ?? '-84.38574419999999');
  const radius = Number(process.env.DEFAULT_RADIUS ?? '5');
  const careType = String(process.env.DEFAULT_CARE_TYPE ?? 'Adult Day Care');
  return findNearestProviders({ lat, lon, radius, careType, page: 1, pageSize: 1000 });
}

export type ProviderDetailApi = ProviderApi & {
  description?: string | null;
  section?: Array<{
    id: number;
    careType?: string;
    sectionName?: string;
    sectionGroup?: string | null;
  }>;
  socialMedia?: Array<{
    id: number;
    code?: string;
    socialMediaLink?: string;
    socialMediaType?: { id: number; typeName?: string };
  }>;
  phoneNumber?: Array<{
    id?: number;
    code?: string;
    phoneNumber?: string;
    isPrimary?: boolean;
    isVerified?: boolean;
  }>;
  reports?: unknown[];
  totalReview?: number | null;
};

export type ProviderDetailResponse = {
  data: ProviderDetailApi;
  status?: string;
  message?: string;
  [key: string]: unknown;
};

export type ProviderDetail = Provider & {
  description?: string | null;
  sections?: Array<{ id: number; name?: string; careType?: string }>;
  socialLinks?: Array<{ id: number; type?: string; url?: string }>;
  phoneNumbers?: string[];
  images?: Array<{ id: number; url: string; caption?: string }>;
  reports?: unknown[];
  totalReview?: number | null;
};

function normalizeDetail(api: ProviderDetailApi): ProviderDetail {
  const base = normalize(api);
  return {
    ...base,
    description: api.description ?? null,
    services: api.services ?? base.services,
    sections: api.section?.map((s) => ({ id: s.id, name: s.sectionName, careType: s.careType })) ?? [],
    socialLinks:
      api.socialMedia
        ?.map((s) => ({
          id: s.id,
          type: s.socialMediaType?.typeName,
          url: s.socialMediaLink,
        }))
        .filter((link) => !!link.url) ?? [],
    phoneNumbers: api.phoneNumber?.map((p) => p.phoneNumber).filter(Boolean) ?? [],
    images:
      api.images
        ?.map((img: any) => ({
          id: typeof img.id === 'number' ? img.id : 0,
          url: String(img.imagePath ?? ''),
          caption: img.imageCaption,
        }))
        .filter((img) => img.url) ?? [],
    reports: api.reports ?? [],
    totalReview: api.totalReview ?? null,
  };
}

export async function getProvider(code: string): Promise<ProviderDetail> {
  const json = await apiFetch<ProviderDetailResponse>(`/provider/${code}`, {
    revalidate: 3600, // 1 hour
    tags: [`provider:${code}`],
  });
  if (!json?.data) {
    throw new Error(`Provider ${code} not found`);
  }
  return normalizeDetail(json.data);
}
