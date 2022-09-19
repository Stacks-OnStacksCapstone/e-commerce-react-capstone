import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { ProductContext } from '../../context/product.context';
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Navbar';
import { ProductCard } from "./ProductCard";
import SearchbarProducts from './SearchbarProducts';


const Container = styled.div`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const DisplayProducts = () => {
  const [productList, setProductList] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      
      const result = await apiGetAllProducts()
      setProductList(result.payload)
    }
    fetchData()
  }, [])

  useEffect(() => {
  }, [productList])
  // const products: Product[] = [
  //   {
  //       id:1,
  //       image:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:3,
  //       image:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:4,
  //       image:"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:5,
  //       image:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:6,
  //       image:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:8,
  //       image:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  // ]

  return (
    <React.Fragment>
      <ProductContext.Provider value={{productList, setProductList}}>
      <Container style={{alignItems: 'center', justifyContent: 'center'}}>
        <SearchbarProducts/>
      </Container>
      <Container>
        {productList.map((item) => {
            console.log(item)
            return <><ProductCard product={item} key={item.id} /></>
        }
        )}
      </Container>
      </ProductContext.Provider>
    </React.Fragment>
    
  );
};