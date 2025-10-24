export interface UpsertProviderLocationProps {
  id?: number;
  address: string;
  city: string;
  state: string;
  county: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isSecondary: boolean;
  addressTypeId: number;
  providerCode: string;
  userId: number;
}

export interface ProviderDetails {
  ProviderId: string;
  ProviderName: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;
  Phonenumber: string;
  Email?: string;
  Website?: string;
  Pictures?: string;
  CreatedDate: string;
  UntilDate: string | null;
  ImporterProviderDetails: ImporterProviderDetails[];
  Profiles: Profile[];
  Questions: Question[];
  Awards: any; // You might want to specify a proper type for this
  DistanceInMiles: number;
  ratings?: number;
  CMS: Rating;
  totalReview?: TotalReview;
  CurrentProvider?: string;
  IsPreffered?: boolean;
}

export interface PhoneNumber {
  phoneNumber: string;
  isVerified: boolean;
  isPrimary: boolean;
  phoneType?: PhoneType;
  id: number;
}

export interface SocialMedia {
  id: number;
  socialMediaLink: string;
  socialMediaType: SocialMediaType;
}

export interface SocialMediaType {
  id: number;
}

export interface PhoneType {
  id: number;
  typeName: string;
}

export interface Providers {
  isActive?: any;
  id: number;
  code: string;
  name: string;
  phone: string;
  email?: string;
  description?: string;
  services: string[];
  tags?: string[];
  images: Image[];
  locations: Address[];
  rating?: CMSRatings | null;
  totalReview: TotalReview;
  isPreffered?: boolean;
  distanceInMiles?: number;
  website?: string;
  sections?: Section[];
  isRatingsAviable?: boolean;
  section: [];
  isSponsored?: boolean;
  isEmailVerified?: boolean;
  phoneNumber: PhoneNumber[];
  socialMedia?: SocialMedia[];
  googleReview?: number;
  status?: string;
  claimStatus?: boolean;
  agrReview?: {
    reviews: AgrReviewDetails;
  };
  business?: {
    identityCompleted: boolean;
    servicesCompleted: boolean;
    locationCompleted: boolean;
    contactCompleted: boolean;
  };
}
export interface AgrReviewDetails {
  url: string;
  rating: number;
  reviews: AgrSingleReview[];
  website: string;
  place_id: string;
  user_ratings_total: number;
}

export interface AgrSingleReview {
  text: string;
  time: number;
  rating: number;
  language: string;
  author_url: string;
  translated: boolean;
  author_name: string;
  original_language: string;
  profile_photo_url: string;
  relative_time_description: string;
}

export interface Subscription {
  subscriptionStatus: string;
  subscriptionEndDate: string;
  plan: string;
}

export interface CMSRatings {
  overall: number;
  healthInspection: number;
  qualityMeasure: number;
  staffRating: number;
  longStayQuality: number;
  shortStatyQuality: number;
  lastupdated: string;
  moreinfo?: string;
  abusereport?: string;
  metadata?: Record<string, any>;
}

export interface Image {
  imagePath: string;
  imageOrder: number;
  imageTypeId: number;
}

export interface Address {
  id: number;
  address: string;
  city: string;
  state: string;
  county: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  addressType?: string;
  country: string;
  addressTypeId: number;
}

export interface Rating {
  Overall: number;
  HealthInspection: number;
  QualityMeasure: number;
  StaffRating: number;
  LongStayQM: number;
  LastUpdated: string;
}

interface ImporterProviderDetails {
  PartnerComprehensiveCare: string;
  PartnerCare: string;
  Accessability: string;
  Languages: string;
  PaymentOptions: string;
  GroupAffiliation: string;
  NetworkPlan: string;
  Questions: ProviderQuestion[];
}

interface ProviderQuestion {
  BriefOverview: string;
  HoursOperations: string;
  ExperienceWithMS: string;
  MSUniquePatientsSeenAnnually: string;
  SpecializedMSTraining: string;
  HomeVisitsTelemedicineOffered: string;
}

interface Profile {
  ProviderId: string;
  CategoryId: number;
  CategoryName: string;
  CategoryGroupName: string;
  ParentCategoryId: number;
  CategoryDescription: string;
  CategoryIconAttribute: string;
  CategoryButtonText: string;
  ParentCategoryDescription: string;
  ParentCategoryIconAttribute: string;
}

export interface Question {
  QuestionId: string;
  QuestionText: string;
  Response: ResponseOption[];
}

export interface ResponseOption {
  ResponseOptionId: string;
  ResponseOptionText: string;
}

export interface QnaResponse {
  sections: Section[];
  claimStatus: boolean;
}

export interface Section {
  id: number;
  code: string;
  sectionName: string;
  careType: string;
  subSections: SubSection[];
}

export interface SubSection {
  id: number;
  subSectionName: string;
  questions: Questions[];
}

export interface Questions {
  id: number;
  questionText: string;
  responses: Responses[];
}

export interface Responses {
  id: number;
  responseText: string;
}

export interface TotalReview {
  id: number;
  totalRating: string;
  totalReviews: string;
  review: Review[];
}

export interface Review {
  source: string;
  rating: string;
  reviewPeriod: string;
  review: string;
  username: string;
  userThumbnail: string;
}
export interface AgrReview {
  id: number;
  source: string;
  providerCode: string;
  reviews: Array<{
    username: string;
    rating: number;
    review: string;
    [key: string]: any;
  }>;
  providerDetails: Record<string, any>;
  summary: string;
  verification: string;
}

export interface AgrProviderDetails {
  Address: string;
  city: string;
  name: string;
  phone: string;
  postalCode: string;
  providerCode: string;
  verification: string;
}
export interface DashboardProviderDetails {
  Address: string;
  city: string;
  name: string;
  phone: string;
  postalCode: string;
  providerCode: string;
}
export interface ContactTypes {
  id: number;
  fullName: string;
  email: string;
  message: string;
  status: string;
  reason: string;
}
export interface ReportTypes {
  id: number;
  description: string;
  code: string;
  isResolved: boolean;
  reason: string;
  reportModel: {
    id: number;
    category: string;
  };
  provider: {
    name: string;
  };
}
export interface SupportTypes {
  id: number;
  fullName: string;
  email: string;
  message: string;
  status: string;
  reason: string;
}
export interface ReportOption {
  id: number;
  category: string;
}

export interface ProviderProfile {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string | null;
  description: string;
  services: string[];
  tags: string[];
  isActive: boolean;
  isSponsored: boolean;
  isEmailVerified: boolean;
  locations?: UpsertProviderLocationProps[];
  rating?: number | null;
  images?: ProfileImage[];
  totalReview?: TotalReview;
  phoneNumber?: PhoneNumber[];
  status: "approved" | string;
}

export interface ProfileImage {
  id: number;
  imagePath: string;
  imageCaption: string;
  imageOrder: number;
  providerCode: string;
  imageTypeId: number;
}
export interface NpiMetadata {
  npiResult: {
    number: string;
    enumerationType: string;
    basic: {
      orgName: string;
      orgSubpart: string;
      parentLegalBusinessName: string;
      enumerationDate: string;
      lastUpdated: string;
      status: string;
      aoFirstName: string;
      aoLastName: string;
      aoTeleNumber: string;
      aoTitle: string;
      aoNamePrefix: string;
      aoNameSuffix: string;
      name: string;
    };
    addresses: {
      countryCode: string;
      countryName: string;
      addressPurpose: string;
      addressType: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      teleNumber: string;
      faxNumber: string;
    }[];
    taxonomies: {
      code: string;
      desc: string;
      state: string;
      license: string;
      primary: boolean;
      specialization: string;
    }[];
    endPoints: any[];
    otherNames: any[];
    identifiers: {
      code: string;
      desc: string;
      identifier: string;
      state: string;
    }[];
    practiceLocations: any[];
  };
}

export interface ClaimProviderTypes {
  id: number;
  providerCode: string;
  status: string;
  metadata: NpiMetadata;
  user: {
    firstName: string;
    lastName: string;
  };
  providerName: string;
}
export interface SiteSettingData {
  id: number;
  name: string;
  description?: string;
  is_enabled: boolean;
  siteKey: string;
}
