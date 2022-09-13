import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Product from "../../models/Product"
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService"
import Navbar from "../navbar/Narbar"
import { EditProductCard } from "./EditProductCard"
import styled from "styled-components";

const Container = styled.div`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const EditProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const {page} = useParams();

    useEffect(() => {
      const fetchData = async () => {
        const result = await apiGetAllProducts()
        setProducts(result.payload)
      }
      fetchData()
    }, []);

    return(
        <React.Fragment>
            <Navbar/>
            <Container>
                {products.map((item) => (
                    <EditProductCard product={item} key={item.id} />
                ))}
            </Container>
       </React.Fragment>
    );
}