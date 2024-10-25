import React, {useState, useEffect, FC} from 'react';

import {NullableString} from "../../models/common";
import {CategoryI} from "../../models/shopifyEntities";

import {getCategories} from '../../services/categoryService';

import Button from "../Common/Buttons/Button/Button";

import './Categories.css';

interface CategoriesProps {
    onSelectCategory: (id: NullableString) => void;
}

const Categories: FC<CategoriesProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<CategoryI[]>([]);
    const [activeCategory, setActiveCategory] = useState<CategoryI>();

    useEffect(() => {
        getCategories()
            .then(items => setCategories(items))
            .catch(console.error);
    }, []);

    const handlerClick = (category: CategoryI) => {
        if (category !== activeCategory) {
            setActiveCategory(category);
            onSelectCategory(category.id);
        }
    };

    const getClassByCategory = (category: CategoryI): string => {
        return activeCategory && activeCategory === category ? 'active' : '';
    }

    return (
        <div className="categories">
            {categories.map((category) => (
                <Button key={category.id}
                        className={getClassByCategory(category)}
                        onClick={handlerClick.bind(this, category)}
                >
                    {category.title}
                </Button>
            ))}
        </div>
    );
};

export default Categories;