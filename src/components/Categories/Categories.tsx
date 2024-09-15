import React, {useState, useEffect, FC} from 'react';
import './Categories.css';
import {IDType} from "../../models/common";
import {CategoryI} from "../../models/shopifyEntities";
import {getCategories} from '../../services/categoryService';
import Button from "../Common/Buttons/Button/Button";

interface CategoriesProps {
    onSelectCategory: (id: IDType) => void;
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
            onSelectCategory(category.node.id);
        }
    };

    const getClassByCategory = (category: CategoryI): string => {
        return activeCategory && activeCategory === category ? 'active' : '';
    }

    return (
        <div className="categories">
            {categories.map((category) => (
                <Button key={category.node.id}
                        className={getClassByCategory(category)}
                        onClick={handlerClick.bind(this, category)}
                >
                    {category.node.title}
                </Button>
            ))}
        </div>
    );
};

export default Categories;