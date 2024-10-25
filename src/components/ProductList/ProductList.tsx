import React, {FC, useCallback} from 'react';

import {CollectionI, CursorType} from "../../models/common";
import {PriceI, ProductI} from "../../models/shopifyEntities";

import {getProductsByCategory} from '../../services/productService';

import PaginatedList from "../Common/PaginatedList/PaginatedList";

import './ProductList.css';

interface ProductsProps {
    categoryId: string;
    productsPerPage?: number; // Max number of products per page
}

const ProductList: FC<ProductsProps> = ({ categoryId, productsPerPage = 10 }) => {
    const fetchProducts = useCallback(
        async (cursor: CursorType): Promise<CollectionI<ProductI>| null> => {
           return await getProductsByCategory(
               categoryId, cursor, productsPerPage
           );
        },
        [categoryId, productsPerPage]
    );

    const renderProduct = (product: ProductI): React.ReactNode => {
        const {amount, currencyCode}: PriceI = product.priceRange.minVariantPrice;

        return (
            <div key={product.id} className="product-card">
                <div className="product">
                    <h3>{product.title}</h3>
                    <p>{amount} {currencyCode}</p>
                </div>
            </div>
        );
    };

    return (
        <PaginatedList<ProductI>
            fetchData={fetchProducts}
            renderItem={renderProduct}
        />
    );
};

export default ProductList;
