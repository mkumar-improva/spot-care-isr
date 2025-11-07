import PageListServer from "@/components/layout/page-list/Component";
import { getSiteUrl, absoluteUrl, getDefaultSocialImage } from "@/lib/site";
import { Services } from "@/services/service";
import { Metadata } from "next";
import logoImg from "@/assets/app/spot/full.png";

//seo
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Record<string, string>;
}): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(
    `/providers?${new URLSearchParams(searchParams).toString()}`
  );

  const careType = searchParams.careType ?? "";
  const location = searchParams.location ?? "";

  const readableType = careType
    ? careType.replace(/-/g, " ")
    : "Healthcare Services";
  const readableLocation = location ? `in ${location}` : "";
  const title = `${readableType} ${readableLocation} | SpotCare`;
  const description = `Find the best ${readableType} ${readableLocation}. Compare top-rated providers near you on SpotCare.`;

  // Using your logo as fallback SEO image
  const ogImageUrl = `${siteUrl}${logoImg.src}`;
  const twitterImageUrl = `${siteUrl}${logoImg.src}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: `${careType}, ${location}, healthcare, providers, SpotCare`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: "SpotCare",
      images: [
        {
          url: ogImageUrl,
          alt: "SpotCare – Healthcare Directory",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImageUrl],
      site: "@SpotCare",
      creator: "@SpotCare",
    },
  };
}

//module
const PageListPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filterData = {
    searchText: searchParams.searchText ?? "",
    careType: searchParams.careType ?? "",
    lat: parseFloat(searchParams.lat) || 0,
    lon: parseFloat(searchParams.lng) || 0,
    page: parseInt(searchParams.page) || 1,
    pageSize: parseInt(searchParams.pageSize) || 10,
    postalCode: searchParams.postalCode ?? "",
    radius: searchParams.radius ?? "",
    location: searchParams.location ?? "",
    filter: searchParams.filter ?? "recommended",
    headerType: searchParams.headerType ?? "services",
    ratingRange: searchParams.ratingRange ?? "0-5",
    searchFilter: searchParams.searchFilter ?? "",
  };

  const { data, total } =
    filterData.searchText && filterData.searchText !== ""
      ? await Services.SearchByProviderNameList(filterData)
      : await Services.LoadCaresAgainstFilters(filterData);

  return (
    <PageListServer
      providersList={data}
      total={total}
      filterData={filterData}
    />
  );
};

export default PageListPage;
