export type CursorType = string | null;
export type NullableString = string | null;

export interface Identifiable {
    id: number | string;
}

export interface PageInfoI {
    startCursor: CursorType;    // The position of the first page element.
    endCursor: CursorType;      // The position of the last page element.
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface CollectionI<E> {
    items: E[];
    pageInfo: PageInfoI;
}

export interface ElementI<V> {
    node: V;
}