import { Box, Card, Typography } from "@material-ui/core";
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
            setOrderDetailsInfo(response.payload);
        }
        fetchResponse();
   }, [])

   return(
    <>
    <Card>
    {orderDetailsInfo.map((item) => {
        return <>item</>;
    })}
    </Card>
    </>
   )
}