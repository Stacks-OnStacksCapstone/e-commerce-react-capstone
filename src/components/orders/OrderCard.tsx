import { Box, CardContent, Typography, CardActions, Button, Grid, Link, Container } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import Order from "../../models/Order";
import { apiGetAllUserOrders } from "../../remote/e-commerce-api/orderService";
import { OrderDetails } from './OrderDetails';

interface orderProps{
    order: Order,
    key: number,
}


export const OrderCard = (props: orderProps) => {


    return(

            /*<Card sx={{ width: 345, margin: 2, backgroundColor: grey[200] }}>


        <CardContent>
        <Typography variant="body2">
                {props.order.orderDate}
            </Typography>
            <Typography gutterBottom>
                {props.order.shipmentAddress}
            </Typography>
            <Typography variant="body2">
            </Typography>
        </CardContent>
        </Card>*/
            <OrderDetails orderId={props.order.orderId} key={props.order.orderId}></OrderDetails>
        
    )
}
    