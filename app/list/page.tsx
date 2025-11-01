import PageListServer from "@/components/layout/page-list/Component";
import { Services } from "@/services/service";

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
