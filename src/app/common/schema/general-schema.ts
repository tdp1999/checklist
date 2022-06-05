export interface PaginationInterface<T> {
    data: T;
    paginations: {
        _totalRows: number;
        _page: number;
        _limit: number;
    };
}
