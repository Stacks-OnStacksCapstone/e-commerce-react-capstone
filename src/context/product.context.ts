import React from 'react';
import Product from '../models/Product';

interface ProductContextState {
    productList: Product[];
    setProductList: (productList: Product[]) => void;
}

export const ProductContext = React.createContext<ProductContextState>({
    productList: [],
    setProductList: () => { }
});