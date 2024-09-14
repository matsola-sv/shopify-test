import React, {useState} from 'react';
import './assets/css/App.css';
import {IDType} from "./models/common";
import Categories from './components/Categories';
import ProductList from './components/ProductList';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState<IDType>(null);
    return (
        <div className="app">
            <Categories onSelectCategory={setSelectedCategory} />
            {selectedCategory && (
                <ProductList
                    categoryId={selectedCategory}
                    productsPerPage={2}
                />
            )}
        </div>
    );
};

export default App;