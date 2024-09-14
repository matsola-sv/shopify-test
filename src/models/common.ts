export type CursorType = string | null;
export type IDType = string | null;

export interface PageInfoI {
    startCursor: CursorType;
    endCursor: CursorType;
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