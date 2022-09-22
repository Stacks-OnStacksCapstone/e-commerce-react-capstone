import { Box, Container, Grid, Typography } from "@material-ui/core";
import { CardContent } from "@mui/material";
import Card from '@mui/material/Card';
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import OrderDetail from "../../models/OrderDetail";
import Product from "../../models/Product";
import { apiGetOrderDetails } from "../../remote/e-commerce-api/orderService";
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
   console.log(props);
   const [orderDetailsInfo, setOrderDetailsInfo] = useState<OrderDetail[]>([]);
   const [productInfo, setProductInfo] = useState<Product>(new Product(0, "", 0, "", 0, ""));

   useEffect(() => {
        const fetchOrderDetailResponse = async () => {
            const response = await apiGetOrderDetails(id);
            setOrderDetailsInfo(response.payload);
        }
        fetchOrderDetailResponse();
   }, [])

   const fetchProductInfoResponse = async (id : number) => {
        const response = await apiGetProductById(id);
        setProductInfo(response.payload);
    }

   return(
    <>
    <Container style={{alignItems:"center", justifyContent:"center", marginTop:60}}>
    <Grid container spacing={0} direction="column">
        <Grid style={{display:"flex", flexDirection:"column"}}>
            <Card style={styles.outerCardStyling} elevation={3}>
        {orderDetailsInfo.map((item, i) => {
            {console.log(i)}
            return (<>
                <Card style={(i === orderDetailsInfo.length - 1 ? styles.innerCardStylingNoMargin : styles.innerCardStyling)}>
                <Container style={{ display: 'flex', flexDirection: 'row' , justifyContent:"space-between"}}>
                    <Box>
                        <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems:"center"}}>
                            <Link style={{color: "black",display: "flex",flexDirection: "row",alignItems: "center", textDecoration:"none"}} to={`/products/${item.productId}`}><OrderProduct product = {item.productId} /></Link>
                        </CardContent>
                    </Box>
                    <Box style={{display:"flex", alignItems:"center"}}>
                    <CardContent>
                        <Typography>OrderDetail ID: {item.id}</Typography>
                        <Typography>Order ID: {item.ordersId}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Product ID: {item.productId}</Typography>
                    </CardContent>
                    </Box>
                </Container>
                </Card>
            </>)
        })}
        </Card>
        </Grid>
    </Grid>
    </Container>
    </>
   )
}