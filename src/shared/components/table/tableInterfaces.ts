import type { ColumnDef } from '@tanstack/react-table';

export interface ITable<T> {
    data: TPaginatedResponse<T>;
    columns: ColumnDef<any>[],
    onRowClick?: ((row: T) => void) | null;
}

export interface TPaginationMeta {
    current: number;
    currentItemCount: number;
    endPage: number;
    first: number;
    firstItemNumber: number;
    firstPageInRange: number;
    last: number;
    lesItemNumber: number;
    lastPageInRange: number;
    pageCount: number;
    pageRange: number;
    pageInRange: Array<number>;
    startPage: number;
    totalCount: number;
}

export type TPaginatedResponse<T> = {
    data: Array<T>;
    meta: TPaginationMeta;
}