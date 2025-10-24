export type CareTypes = {
  CategoryId: number;
  CategoryName: string;
  CategoryGroupName: string;
  ParentCategoryId: number;
  CategoryDescription: string;
  CategoryIconAttribute: string;
  CategoryButtonText: string;
  ParentCategoryDescription: string;
  ParentCategoryIconAttribute: string;
  name: string;
  careTypes: [];
};

export type CareResponse = {
  data: CareTypes[];
  siteSettings: SiteSettings[];
};

export type Cares = {
  name: string;
  careTypes: string[];
};

export type SiteSettings = {
  siteKey: string;
  is_enabled: boolean;
};
