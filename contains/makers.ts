import {
  CMSRatings,
  ProviderDetails,
  Providers,
  Rating,
  Section,
  SubSection,
} from "types/provider-details";
import { Filters } from "@/types/filter-props";
import { getDistanceFromLatLon } from "@/utils/distance-finder";

type SortKey = keyof Providers;

export const parseProviderResults = async (
  providers: Providers[],
  filters: Filters
) => {
  let allMarkers: Providers[] = [];

  allMarkers = providers.map((item: Providers, index: number) => {
    const distance = getDistanceFromLatLon(
      filters.lat,
      filters.lon,
      item.locations[0].latitude,
      item.locations[0].longitude
    );

    let value: Providers = {
      id: item.id ?? "",
      code: item.code ?? "",
      name: item.name ?? "",
      phone: item.phone?.split(",")[0] ?? "",
      email: item.email?.split(",")[0] ?? "",
      services: item.services ?? [],
      images: item.images ?? [],
      locations: item.locations ?? [],
      rating:
        item.rating?.overall != null
          ? {
              healthInspection: item.rating.healthInspection ?? null,
              qualityMeasure: item.rating.qualityMeasure ?? null,
              staffRating: item.rating.staffRating ?? null,
              longStayQuality: item.rating.longStayQuality ?? null,
              shortStatyQuality: item.rating.shortStatyQuality ?? null,
              overall: item.rating.overall ?? null,
              moreinfo: item.rating.moreinfo ?? "",
              abusereport: item.rating.abusereport ?? "",
              lastupdated: item.rating.lastupdated ?? "",
              metadata: item.rating.metadata ?? undefined,
            }
          : null,
      totalReview: item.totalReview ?? null,
      isPreffered: false,
      distanceInMiles: distance ?? 0,
      isRatingsAviable:
        item.rating?.overall != null && item.rating.overall >= 0,
      section: Array.isArray(item.section) ? item.section : [],
      isSponsored: item.isSponsored ?? false,
      phoneNumber: item.phoneNumber ?? [],
      socialMedia: item.socialMedia ?? [],
      agrReview: item.agrReview
        ? {
            reviews: item.agrReview.reviews ?? [],
          }
        : undefined,
    };

    return value;
  });

  allMarkers.sort(sortByValues("isPreffered", "desc"));
  allMarkers.sort(sortByValues("isRatingsAviable", "asc"));
  allMarkers.sort(sortByValues("section", "desc"));
  allMarkers.sort(sortByValues("images", "desc"));
  // allMarkers.sort(sortByValues("isSponsored", "desc"))

  return allMarkers;
};

export const parseProvider = (
  provider: Providers,
  distance: number
): Providers => {
  const parsedProvider: Providers = {
    id: provider.id ?? "",
    code: provider.code ?? "",
    name: provider.name ?? "",
    phone: provider.phone?.split(",")[0] ?? "",
    email: provider.email?.split(",")[0] ?? "",
    services: provider.services ?? [],
    tags: provider.tags ?? [],
    images: provider.images ?? [],
    locations: provider.locations ?? [],
    rating:
      provider.rating?.overall != null
        ? {
            healthInspection: provider.rating.healthInspection ?? null,
            qualityMeasure: provider.rating.qualityMeasure ?? null,
            staffRating: provider.rating.staffRating ?? null,
            longStayQuality: provider.rating.longStayQuality ?? null,
            shortStatyQuality: provider.rating.shortStatyQuality ?? null,
            overall: provider.rating.overall ?? null,
            moreinfo: provider.rating.moreinfo ?? "",
            abusereport: provider.rating.abusereport ?? "",
            lastupdated: provider.rating.lastupdated ?? "",
            metadata: provider.rating.metadata ?? undefined,
          }
        : null,
    totalReview: provider.totalReview ?? null,
    isPreffered: false,
    distanceInMiles: distance ?? 0,
    isRatingsAviable:
      provider.rating?.overall != null && provider.rating.overall >= 0,
    section: Array.isArray(provider.section) ? provider.section : [],
    isSponsored: provider.isSponsored ?? false,
    phoneNumber: provider.phoneNumber ?? [],
    socialMedia: provider.socialMedia ?? [],
    agrReview: provider.agrReview
      ? {
          reviews: provider.agrReview.reviews ?? [],
        }
      : undefined,
  };

  return parsedProvider;
};

const sortByValues = (key: SortKey, direction: "asc" | "desc") => {
  return (a: Providers, b: Providers): number => {
    let valueA: any;
    let valueB: any;

    // Check if the key exists and get values from providerDetails
    if (a && b && key in a && key in b) {
      if (key === "isRatingsAviable") {
        valueA = valueA ? 1 : 0;
        valueB = valueB ? 1 : 0;
      }
    }

    // Handle sorting for boolean values specifically for 'IsPreffered'
    if (key === "isPreffered" || key === "isSponsored") {
      // Convert boolean to number for sorting: true (preferred) > false (not preferred)
      valueA = valueA ? 1 : 0;
      valueB = valueB ? 1 : 0;
    }

    if (key === "images") {
      valueA = a[key]?.length > 0 ? 1 : 0;
      valueB = b[key]?.length > 0 ? 1 : 0;
    } else {
      valueA = a[key];
      valueB = b[key];
    }

    if (key === "section") {
      valueA = a[key]?.length != undefined && a[key]?.length > 0 ? 1 : 0;
      valueB = b[key]?.length != undefined && b[key]?.length > 0 ? 1 : 0;
    }

    // Default numeric and string sorting
    if (typeof valueA === "number" && typeof valueB === "number") {
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  };
};

// export const loadAllMarkers = async (profileDetails: ProviderDetails[], filter: Filters) => {
//   let allMarkers: any[] = [];
//   if (profileDetails) {
//     allMarkers = await Promise.all(
//       profileDetails.map(async (item: ProviderDetails, index: number) => {
//         const address = `${item?.Address}, ${item?.City}, ${item?.Zip}`;

//         let res = await AddressToLatLng(address);
//         const results = res["results"];

//         const healthInspection = Math.floor(Math.random() * 6) + 1;
//         const qualityMeasure = Math.floor(Math.random() * 6) + 1;
//         const staffRating = Math.floor(Math.random() * 6) + 1;
//         const longStayQM = Math.floor(Math.random() * 6) + 1;

//         // Calculate overall rating by averaging individual ratings
//         const overall = Math.floor((healthInspection + qualityMeasure + staffRating + longStayQM) / 4);

//         const currentDate = getFormattedDate(new Date());

//         let value: MarkerPin;
//         if (results?.length > 0) {
//           const i = results[0];
//           value = {
//             id: index.toString(),
//             lat: i["geometry"]["location"]["lat"],
//             lng: i["geometry"]["location"]["lng"],
//             title: item.ProviderName,
//             providerDetails: item,
//           };
//           value.providerDetails!.CurrentProvider! = filter.careType.toString() ?? "";
//           value.providerDetails!.ratings = overall;
//           value.providerDetails!.IsPreffered = item.City.includes("Atlanta") || item.City.includes("Marietta");
//           value.providerDetails!.CMS = {
//             HealthInspection: healthInspection,
//             QualityMeasure: qualityMeasure,
//             LastUpdated: currentDate,
//             LongStayQM: longStayQM,
//             StaffRating: staffRating,
//             Overall: overall
//           }
//         } else {
//           value = {
//             id: index.toString(),
//             lat: 0,
//             lng: 0,
//             title: item.ProviderName,
//             providerDetails: item,
//           };
//           value.providerDetails!.IsPreffered = item.City.includes("Atlanta") || item.City.includes("Marietta");
//           value.providerDetails!.CurrentProvider! = filter.careType.toString() ?? "";
//           value.providerDetails!.ratings = overall;
//           value.providerDetails!.CMS = {
//             HealthInspection: healthInspection,
//             QualityMeasure: qualityMeasure,
//             LastUpdated: currentDate,
//             LongStayQM: longStayQM,
//             StaffRating: staffRating,
//             Overall: overall
//           }
//         }
//         return value
//       })
//     );
//     allMarkers = sortByImage(allMarkers);
//   }

//   return allMarkers;
// };

function sortByImage(objects: any[]) {
  return objects.sort((a, b) => {
    if (
      a.providerDetails.Pictures === "" &&
      b.providerDetails.Pictures !== ""
    ) {
      return 1;
    } else if (
      a.providerDetails.Pictures !== "" &&
      b.providerDetails.Pictures === ""
    ) {
      return -1;
    } else {
      return a.providerDetails.Pictures.localeCompare(b.Pictures);
    }
  });
}

export function filterSections(sections: Section[]): Section[] {
  return sections
    .map((section) => ({
      ...section,
      subSections: section.subSections
        .map((subSection) => ({
          ...subSection,
          questions: subSection.questions.filter(
            (question) => question.responses && question.responses.length > 0
          ),
        }))
        .filter((subSection) => subSection.questions.length > 0),
    }))
    .filter((section) => section.subSections.length > 0);
}

export function extractCMSRatingsSubSection(
  sections: Section[]
): SubSection | undefined {
  for (const section of sections) {
    const cmsRatingsSubSection = section.subSections.find(
      (subSection) => subSection.subSectionName.toLowerCase() === "cms ratings"
    );
    if (cmsRatingsSubSection) {
      return cmsRatingsSubSection;
    }
  }
  return undefined;
}

export function mapCMSRatingsToCMSRatings(
  cmsRatingsSubSection: SubSection,
  metadata: Record<string, any> = {}
): CMSRatings {
  const cmsRatings: CMSRatings = {
    overall: 0,
    healthInspection: 0,
    qualityMeasure: 0,
    staffRating: 0,
    longStayQuality: 0,
    shortStatyQuality: 0,
    lastupdated: new Date().toISOString(),
    metadata: metadata,
  };

  cmsRatingsSubSection.questions.forEach((question) => {
    if (question.responses.length > 0) {
      const responseText = question.responses[0].responseText;
      const qText = question.questionText.toLowerCase();

      // Map numeric values using partial matching:
      if (qText.includes("overall") && qText.includes("rating")) {
        cmsRatings.overall = parseFloat(responseText);
      } else if (qText.includes("health") && qText.includes("inspection")) {
        cmsRatings.healthInspection = parseFloat(responseText);
      } else if (
        qText.includes("quality measure") ||
        qText.includes("quality messaure")
      ) {
        cmsRatings.qualityMeasure = parseFloat(responseText);
      } else if (
        qText.includes("staffing") ||
        (qText.includes("staff") && qText.includes("rating"))
      ) {
        cmsRatings.staffRating = parseFloat(responseText);
      } else if (qText.includes("long-stay")) {
        cmsRatings.longStayQuality = parseFloat(responseText);
      } else if (qText.includes("short-stay")) {
        cmsRatings.shortStatyQuality = parseFloat(responseText);
      }

      // Map string values for additional information:
      else if (qText.includes("link for more info")) {
        cmsRatings.moreinfo = responseText;
      } else if (qText.includes("abuse report")) {
        cmsRatings.abusereport = responseText;
      }
    }
  });

  return cmsRatings;
}
