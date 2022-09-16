import { CardContent, Typography } from "@material-ui/core";
import Card from '@mui/material/Card';
import grey from "@mui/material/colors/grey";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import OrderDetail from "../../models/OrderDetail";
import { apiGetOrderDetails } from "../../remote/e-commerce-api/orderService";

export const OrderDetails = () => {
   const {id} = useParams();
   const [orderDetailsInfo, setOrderDetailsInfo] = useState<OrderDetail[]>([]);

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
    <Card sx={{ width: 345, margin: 2, backgroundColor: grey[200] }}>
    {orderDetailsInfo.map((item) => {
        return <>
        <CardContent>
            <Typography>OrderDetail ID: {item.id}</Typography>
            <Typography>Order ID: {item.ordersId}</Typography>
            <Typography>Product ID: {item.productId}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
        </CardContent>
        </>
    })}
    </Card>
    </>
   )
}