export interface CategoryI {
    id: string;
    title: string;
}

export interface PriceI {
    amount: string;
    currencyCode: string;
}

export interface ProductI {
    id: string;
    title: string;
    description?: string;
    priceRange: {
        minVariantPrice: PriceI;
    };
}
