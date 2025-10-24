type FilterProps = {
    searchText?: string;
    careType: string;
    lat: number;
    lon: number;
    radius: string;
    pageSize: number;
    page?: number;
    postalCode: string;
    headerType?: string
}

export type Filters = FilterProps;