import React, {FC, Suspense, useState} from 'react';

import { NullableString } from '../../models/common';

import Categories from '../Categories/Categories';
import Preloader from "../Common/Preloader/Preloader";

// Dynamic loading components
// Moved outside the function to avoid repeated React.lazy calls on every render of CategoryProductView.
const ProductList = React.lazy(() => import('../ProductList/ProductList'));

interface CategoryProductViewProps {
    productsPerPage?: number;
}

const CategoryProductView: FC<CategoryProductViewProps> = ({productsPerPage = 2}) => {
    const [activeCategory, setActiveCategory] = useState<NullableString>(null);

    return (
        <div className="content-wrapper" data-testid="category-product-view">
            <Categories onSelectCategory={setActiveCategory} />
            {activeCategory && (
                <Suspense fallback={<Preloader/>}>
                    <ProductList
                        categoryId={activeCategory}
                        productsPerPage={productsPerPage}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default CategoryProductView;
