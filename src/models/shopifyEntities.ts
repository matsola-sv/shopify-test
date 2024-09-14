export interface PriceI {
    amount: string;
    currencyCode: string;
}

export interface ProductI {
    node: {
        id: string;
        title: string;
        description?: string;
        priceRange: {
            minVariantPrice: PriceI;
        };
    }
}

export interface CategoryI {
    node: {
        id: string;
        title: string;
    }
}