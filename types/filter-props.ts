type FilterProps = {
  searchText?: string;
  careType: string;
  lat: number;
  lon: number;
  radius: string;
  pageSize: number;
  page?: number;
  postalCode: string;
  headerType?: string;
  ratingRange?: string;
  filter?: string;
  searchFilter?: string;
};

export type Filters = FilterProps;

export type filterType = {
  isShortDistanceActive?: boolean;
  isLongDistanceActive?: boolean;
  isAdvanceFilterAscending?: boolean;
  isAdvanceFilterDescending?: boolean;
  isRatingsActive?: boolean;
  isRecommendedActive?: boolean;
  rangeRatings?: number[];
  reset?: boolean;
  isAdvanceSearchContent?: string;
};
