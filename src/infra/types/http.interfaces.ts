export interface IPaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IPaginateResponse<T> {
    items: T[];
    meta: IPaginationMeta;
}