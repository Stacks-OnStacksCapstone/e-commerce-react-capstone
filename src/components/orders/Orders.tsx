import { Box, Container, Link, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
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
                <Typography variant="h2">Howdy pardner</Typography>
            </Container>
        </Box>
        <Container>
            {orders.map((item) => {
                return <Link href={`orderDetails/${item.id}`}><OrderCard order={item} key={item.id} /></Link>
            })}
        </Container>
        </>
    )
}