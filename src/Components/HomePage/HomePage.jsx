import React from 'react';
import Product from '../Product/Product';
import BestSeller from '../BestSeller/BestSeller';
import Index from '../Index/Index';

const HomePage = () => {
    return (
        <div>
            <Product />
            <BestSeller />
        </div>
    );
};

export default HomePage;