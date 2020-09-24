export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type Paginate<T> = {
    items: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
};