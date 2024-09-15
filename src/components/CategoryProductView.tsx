import React, {FC, useState} from 'react';
import { IDType } from '../models/common';
import Categories from './Categories';
import ProductList from './ProductList';

const CategoryProductView: FC = () => {
    const [activeCategory, setActiveCategory] = useState<IDType>(null);

    return (
        <>
            <Categories onSelectCategory={setActiveCategory} />
            {activeCategory && (
                <ProductList
                    categoryId={activeCategory}
                    productsPerPage={2}
                />
            )}
        </>
    );
};

export default CategoryProductView;
