import { Box, CardContent, CardMedia, Container, Grid, Typography } from "@material-ui/core";
import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import OrderDetail from "../../models/OrderDetail";
import Product from "../../models/Product";
import { apiGetOrderDetails } from "../../remote/e-commerce-api/orderService";
import { apiGetProductById } from "../../remote/e-commerce-api/productService"
import OrderProduct from "./OrderProduct";

export const OrderDetails = () => {
   const {id} = useParams();
   const [orderDetailsInfo, setOrderDetailsInfo] = useState<OrderDetail[]>([]);
   const [productInfo, setProductInfo] = useState<Product>(new Product(0, "", 0, "", 0, ""));

   useEffect(() => {
        const fetchResponse = async () => {
            const response = await apiGetOrderDetails(id);
            console.log(response);
            console.log(id);
            setOrderDetailsInfo(response.payload);

        }
        fetchResponse();
   }, [])

   return(
    <>
    <Container style={{alignItems:"center", justifyContent:"center", marginTop:60}}>
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
    {orderDetailsInfo.map((item) => {
        return <>
            <Card sx={{ width: 345}}>
            <CardContent>
                <Typography>OrderDetail ID: {item.id}</Typography>
                <Typography>Order ID: {item.ordersId}</Typography>
                <OrderProduct product = {item.productId} />
                <Typography>Quantity: {item.quantity}</Typography>
            </CardContent>
            </Card>
            <br />
        </>
    })}
    </Grid>
    </Container>
    </>
   )
}