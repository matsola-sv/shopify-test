import React, {FC, useState} from 'react';
import { NullableString } from '../../models/common';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';

const CategoryProductView: FC = () => {
    const [activeCategory, setActiveCategory] = useState<NullableString>(null);

    return (
        <div className="content-wrapper" data-testid="category-product-view">
            <Categories onSelectCategory={setActiveCategory} />
            {activeCategory && (
                <ProductList
                    categoryId={activeCategory}
                    productsPerPage={2}
                />
            )}
        </div>
    );
};

export default CategoryProductView;
