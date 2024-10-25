import React, {FC, useState} from 'react';

import { NullableString } from '../../models/common';

import Categories from '../Categories/Categories';
import ProductList from "../ProductList/ProductList";

interface CategoryProductViewProps {
    productsPerPage?: number;
}

const CategoryProductView: FC<CategoryProductViewProps> = ({productsPerPage = 2}) => {
    const [activeCategory, setActiveCategory] = useState<NullableString>(null);

    return (
        <div className="content-wrapper" data-testid="category-product-view">
            <Categories onSelectCategory={setActiveCategory} />
            {activeCategory && (
                <ProductList
                    categoryId={activeCategory}
                    productsPerPage={productsPerPage}
                />
            )}
        </div>
    );
};

export default CategoryProductView;