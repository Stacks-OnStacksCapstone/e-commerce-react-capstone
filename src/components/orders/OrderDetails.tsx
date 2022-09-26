import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Avatar, CardContent, CardHeader, cardHeaderClasses, CardMedia } from "@mui/material";
import Card from '@mui/material/Card';
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import OrderDetail from "../../models/OrderDetail";
import Product from "../../models/Product";
import Order from "../../models/Order";
import { apiGetOrderById, apiGetOrderDetails } from "../../remote/e-commerce-api/orderService";
import { apiGetProductById } from "../../remote/e-commerce-api/productService"
import OrderProduct from "./OrderProduct";

const styles = {
    outerCardStyling: {
        padding: "30px",
    },
    innerCardStyling: {
        width: "800", 
        display: "flex",
        marginBottom: "15px",
    },
    innerCardStylingNoMargin: {
        width: "800", 
        display: "flex",
        marginBottom: "0px", 
    }
}

interface orderDetailsProps{
    orderId: number,
    key: number,
}

export const OrderDetails = (props : orderDetailsProps) => {
   const id = props.orderId;
   const [orderDetailsInfo, setOrderDetailsInfo] = useState<OrderDetail[]>([]);
   const [productInfo, setProductInfo] = useState<Product[]>([]);
   const [orderInfo, setOrderInfo] = useState<Order>(new Order(0, 0, "", ""))
   const [sum, setSum] = useState<number>(0);
   useEffect(() => {

        const products : Product[] = [];
        const fetchOrderDetailResponse = async () => {
            const orderResponse = await apiGetOrderById(id);
            setOrderInfo(() => orderResponse.payload);
            const response = await apiGetOrderDetails(id);
            setOrderDetailsInfo(() => response.payload);
            for (let i = 0; i < response.payload.length; i++) {
                const productResponse = await apiGetProductById(response.payload[i].productId);
                products.push(productResponse.payload);
                //setProductInfo((productInfo) => [...productInfo, productResponse.payload])
            }
            setProductInfo(products);
        }
        fetchOrderDetailResponse();
        
   }, [])

   useEffect(() => {
        setSum(0)
        for (let i = 0; i < orderDetailsInfo.length; i++) {
            setSum((sum) => {
                return sum += orderDetailsInfo[i].quantity * productInfo[i].price;
            })
        }
   }, [productInfo])
   

   /*useEffect(() => {
        const fetchOrderResponse = async () => {
            const orderResponse = await apiGetOrderById(id);
            setOrderInfo(() => orderResponse.payload);
        }
        fetchOrderResponse();
   }, [orderDetailsInfo])

   useEffect(() => {
        const fetchProductResponse = async () => {
            for await (const orderDetail of orderDetailsInfo) {
                const productResponse = await apiGetProductById(orderDetail.productId);
                console.log(orderDetail)
                setProductInfo(productInfo => [...productInfo, productResponse.payload])
            }
        }
        fetchProductResponse();
   }, [orderInfo])*/
   

   /*const fetchProductInfoResponse = async (id : number) => {
        const response = await apiGetProductById(id);
        setProductInfo(response.payload);
    }*/

   return(
    
    <>
    <Container style={{alignItems:"center", justifyContent:"center", marginTop:60}}>
    <Grid container spacing={0} direction="column">
        <Grid style={{display:"flex", flexDirection:"column"}}>
        
            <Card style={styles.outerCardStyling} elevation={3}>
            <CardHeader 
            title="Order Header"
            subheader={
                    <Box style={{display: "flex", flexDirection: "row"}}>
                        {orderInfo === undefined || <Typography style={{marginRight:30}}>Order date: {orderInfo.orderDate}</Typography>}
                        {sum === 0 || <Typography>Order total: ${sum}</Typography>}
                    </Box>
                    }
            >
            </CardHeader>
        {orderDetailsInfo.map((item, i) => {
            return (<>
                <Card style={(i === orderDetailsInfo.length - 1 ? styles.innerCardStylingNoMargin : styles.innerCardStyling)}>
                {productInfo[i] !== undefined && <CardHeader 
                    avatar={
                        <Avatar 
                            src={productInfo[i].image} variant="square"
                            sx={{height:140, width:140}}
                        />
                    }>

                </CardHeader>}
                <Container style={{ display: 'flex', flexDirection: 'row' , justifyContent:"space-between"}}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems:"center"}}>
                        { productInfo[i] !== undefined &&
                        <CardContent >
                            <Link style={{color: "inherit", display: "flex",flexDirection: "row",alignItems: "center", textDecoration:"none"}} to={`/products/${item.productId}`}><Typography>{productInfo[i].name}</Typography></Link>
                            {productInfo[i] !== undefined && <Typography>{productInfo[i].description}</Typography>}
                        </CardContent>
                        }   
                    </Box>
                    <Box style={{display:"flex", alignItems:"center"}}>
                        { item !== undefined &&
                    <CardContent>
                        <Typography>OrderDetail ID: {item.id}</Typography>
                        <Typography>Order ID: {id}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Product ID: {item.productId}</Typography>
                    </CardContent>
                }
                    </Box>
                </Container>
                </Card>
            </>)
        })}
        </Card>
        </Grid>
    </Grid>
    </Container>
    </>)
}