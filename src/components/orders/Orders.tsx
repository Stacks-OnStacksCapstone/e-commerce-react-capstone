import { Box, Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Order from "../../models/Order";
import { apiGetAllUserOrders } from "../../remote/e-commerce-api/orderService";
import { OrderCard } from "./OrderCard";

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() =>{
        async function runEffect(){
            const response = await apiGetAllUserOrders();
            console.log(response);
            setOrders(response.payload)
        }
        runEffect();
    }, []);

    return(
        <>
        <br/>
        <br/>
        <Box>
            <Container>
                <Typography variant="h2">Orders</Typography>
            </Container>
        </Box>
        <Container>
            {orders.map((item) => {
                console.log(item["paymentId"])
                return <Link to={`/orderDetails/${item["orderId"]}`}><OrderCard order={item} key={item["orderId"]} /></Link>
            })}
        </Container>
        </>
    )
}