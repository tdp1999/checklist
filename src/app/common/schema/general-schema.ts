export interface PaginationInterface<T> {
    data: T;
    paginations: {
        _totalRow: number;
        _page: number;
        _limit: number;
    };
}
