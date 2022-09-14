import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Product from "../../models/Product"
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService"
import Navbar from "../navbar/Navbar"
import { EditProductCard } from "./EditProductCard"
import styled from "styled-components";
import { Typography } from "@material-ui/core"
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService"
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient"

const Container = styled.div`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const EditProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [user, setUser] = useState<eCommerceApiResponse>();

    useEffect(() => {
      const fetchData = async () => {
        const result = await apiGetAllProducts()
        setProducts(result.payload)
        getUser();
      }
      fetchData()
    }, []);

    async function getUser() {
      let usr = await apiGetCurrentUser();
      setUser(usr);
    }
  
    if (user === undefined || user.payload.admin != true) {
      return <h1>Unauthorized</h1>
    }

    return(
        <React.Fragment>
            <Navbar/>
            <br />
            <Typography variant="h3">Edit Products</Typography>
            <Container>
                {products.map((item) => (
                    <EditProductCard product={item} key={item.id} />
                ))}
            </Container>
       </React.Fragment>
    );
}