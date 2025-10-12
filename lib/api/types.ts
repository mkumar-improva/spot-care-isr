export type FetchOptions = {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
};

// Raw API response shapes from the SpotCare backend
export type ProviderApi = {
  id: number;
  code: string;
  name: string;
  phone?: string;
  email?: string;
  images?: Array<{
    id?: number;
    imagePath?: string;
    imageCaption?: string;
  }>;
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

export type ProviderSummary = {
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

// Keep the previous exported name available to avoid churn
export type Provider = ProviderSummary;

export type FindNearestParams = {
  lat: number;
  lon: number;
  radius: number;
  careType: string;
  page?: number;
  pageSize?: number;
};

export type ProviderDetailApi = ProviderApi & {
  description?: string | null;
  section?: Array<{
    id: number;
    careType?: string;
    sectionName?: string;
    sectionGroup?: string | null;
    subSections?: Array<{
      id: number;
      subSectionName?: string;
      questions?: Array<{
        id: number;
        questionText?: string;
        responses?: Array<{
          id: number;
          responseText?: string;
        }>;
      }>;
    }>;
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

export type ProviderDetail = ProviderSummary & {
  description?: string | null;
  sections?: Array<{
    id: number;
    name?: string;
    careType?: string;
    group?: string | null;
    subSections?: Array<{
      id: number;
      name?: string;
      questions: Array<{
        id: number;
        text?: string;
        responses: string[];
      }>;
    }>;
  }>;
  socialLinks?: Array<{ id: number; type?: string; url?: string }>;
  phoneNumbers?: string[];
  images?: Array<{ id: number; url: string; caption?: string }>;
  reports?: unknown[];
  totalReview?: number | null;
};
