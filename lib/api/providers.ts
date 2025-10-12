import { apiFetch, ApiError } from './client';
import type {
  FindNearestParams,
  FindNearestResponse,
  ProviderDetail,
  ProviderDetailApi,
  ProviderDetailResponse,
  ProviderSummary,
  ProviderApi,
} from './types';

const DEFAULT_PAGE_SIZE = 100;

function pickFirstLocation(provider: ProviderApi) {
  return Array.isArray(provider.locations) ? provider.locations[0] ?? {} : {};
}

export function normalizeProvider(api: ProviderApi): ProviderSummary {
  const location = pickFirstLocation(api);

  return {
    id: api.id,
    code: api.code,
    name: api.name,
    phone: api.phone,
    email: api.email,
    address: location.address,
    city: location.city,
    state: location.state,
    postalCode: location.postalCode,
    latitude: location.latitude,
    longitude: location.longitude,
    services: api.services,
  };
}

export function normalizeProviderDetail(api: ProviderDetailApi): ProviderDetail {
  const summary = normalizeProvider(api);

  const phonesFromArray =
    api.phoneNumber?.reduce<string[]>((numbers, phone) => {
      if (phone.phoneNumber) {
        numbers.push(phone.phoneNumber.trim());
      }
      return numbers;
    }, []) ?? [];

  const phonesFromString =
    typeof api.phone === 'string'
      ? api.phone
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      : [];

  const phoneNumbers = Array.from(new Set([...phonesFromArray, ...phonesFromString]));

  return {
    ...summary,
    description: api.description ?? null,
    services: api.services ?? summary.services,
    sections:
      api.section?.map((section) => ({
        id: section.id,
        name: section.sectionName,
        careType: section.careType,
        group: section.sectionGroup ?? null,
        subSections:
          section.subSections?.map((subSection) => ({
            id: subSection.id,
            name: subSection.subSectionName,
            questions:
              subSection.questions?.map((question) => ({
                id: question.id,
                text: question.questionText,
                responses:
                  question.responses
                    ?.map((response) => response.responseText)
                    .filter((text): text is string => Boolean(text && text.trim().length))
                    .map((text) => text.trim()) ?? [],
              })) ?? [],
          })) ?? [],
      })) ?? [],
    socialLinks:
      api.socialMedia
        ?.map((social) => ({
          id: social.id ?? 0,
          type: social.socialMediaType?.typeName,
          url: social.socialMediaLink,
        }))
        .filter((link) => Boolean(link.url)) ?? [],
    phoneNumbers,
    images:
      api.images
        ?.map((image) => ({
          id: typeof image.id === 'number' ? image.id : 0,
          url: String(image.imagePath ?? ''),
          caption: image.imageCaption,
        }))
        .filter((image) => Boolean(image.url)) ?? [],
    reports: api.reports ?? [],
    totalReview: api.totalReview ?? null,
  };
}

function buildNearestCacheTag(params: Required<FindNearestParams>): string {
  const { lat, lon, radius, careType, page, pageSize } = params;
  return `nearest:${lat}:${lon}:${radius}:${careType}:${page}:${pageSize}`;
}

type FindNearestOptions = {
  tags?: string[];
  revalidate?: number;
};

export async function findNearestProviders(
  params: FindNearestParams,
  options: FindNearestOptions = {},
): Promise<ProviderSummary[]> {
  const { lat, lon, radius, careType, page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;
  const { tags: extraTags = [], revalidate: overrideRevalidate } = options;

  const searchParams = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius: String(radius),
    careType,
    page: String(page),
    pageSize: String(pageSize),
  });

  const cacheTag = buildNearestCacheTag({
    lat,
    lon,
    radius,
    careType,
    page,
    pageSize,
  });

  const tags = Array.from(new Set(['providers', cacheTag, ...extraTags]));
  const revalidate = overrideRevalidate ?? 900;

  try {
    const response = await apiFetch<FindNearestResponse>(`api/provider/findNearest?${searchParams}`, {
      revalidate,
      tags,
    });
 
    const items = Array.isArray(response?.data) ? response.data : [];
    return items.map(normalizeProvider);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return [];
    }
    throw error;
  }
}

type ListProvidersOptions = {
  tags?: string[];
  revalidate?: number;
};

export async function listProviders(options: ListProvidersOptions = {}): Promise<ProviderSummary[]> {
  const lat = Number(process.env.DEFAULT_LAT ?? '33.9253024');
  const lon = Number(process.env.DEFAULT_LON ?? '-84.38574419999999');
  const radius = Number(process.env.DEFAULT_RADIUS ?? '5');
  const careType = String(process.env.DEFAULT_CARE_TYPE ?? 'Adult Day Care');
  const tags = Array.from(new Set(['providers:sitemap', ...(options.tags ?? [])]));
  return findNearestProviders(
    { lat, lon, radius, careType, page: 1, pageSize: 1000 },
    { tags, revalidate: options.revalidate },
  );
}

export async function getProvider(code: string): Promise<ProviderDetail> {
  const path = `api/provider/details/${code}`;
  try {
    const response = await apiFetch<ProviderDetailResponse>(path, {
      revalidate: 30,
      tags: [`provider:${code}`],
    });

    if (!response?.data) {
      throw new ApiError(`Provider ${code} not found`, { status: 404, statusText: 'Not Found' }, path);
    }

    return normalizeProviderDetail(response.data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Failed to fetch provider ${code}`, { status: 500, statusText: 'Internal Error' }, path);
  }
}
