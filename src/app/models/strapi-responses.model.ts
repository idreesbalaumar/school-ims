export interface StrapiSingleResponse<T> {
    data: StrapiDataModel<T>;
    meta: {};
}

export interface StrapiListResponse<T> {
    data: StrapiDataModel<T>[];
}

export interface StrapiDataModel<T> {
    id: number;
    attributes: T;
}