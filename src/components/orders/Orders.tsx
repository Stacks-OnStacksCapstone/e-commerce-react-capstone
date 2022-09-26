import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Pagination, PaginationItem } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { flexbox } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArraySchema } from "yup";
import Order from "../../models/Order";
import { apiGetAllUserOrders } from "../../remote/e-commerce-api/orderService";
import { OrderCard } from "./OrderCard";

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    let [page, setPage] = useState(1);
    let itemsPerPage = 5;
    let [count, setCount] = useState(0);


    useEffect(() =>{
        async function runEffect(){
            const response = await apiGetAllUserOrders();
            console.log(response);
            setOrders(response.payload);
            setOrders((orders) => {return [...orders].reverse()})
            //setCount(Math.ceil(orders.length / itemsPerPage))
        }
        runEffect();
    }, []);

    useEffect(() => {
        setCount(0);
        function runEffect() {
            setCount(Math.ceil(orders.length / itemsPerPage));
        }
        runEffect();
    }, [orders])

    return(
        <>
        
        <br/>
        <br/>
        <Box>
            <Container>
                <Typography variant="h2">Orders</Typography>
            </Container>
        </Box>
        {/*<Container>
            {orders.map((item) => {
                console.log(item["paymentId"])
                return <Link to={`/orderDetails/${item["orderId"]}`}><OrderCard order={item} key={item["orderId"]} /></Link>
            })}
        </Container>*/}
        <Box>
            {count === 0 || <Pagination count={count} onChange={(e, value) => setPage(value)}/>}
        </Box>
        <Grid container spacing={1} direction="column" justifyContent="space-between">        
        {orders.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item) => {
                return <Grid xs={12} md={12} style={{width: "100%"}}><OrderCard order={item} key={item["orderId"]} /></Grid>
            })}
        </Grid>
        
        </>
    )
}