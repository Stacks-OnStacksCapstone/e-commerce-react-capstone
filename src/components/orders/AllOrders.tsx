import * as React from 'react';
import { useEffect, useState } from 'react';
import Order from '../../models/Order';
import { apiGetAllUserOrders } from '../../remote/e-commerce-api/orderService';


interface allOrdersProps {
    handleBack: () => void
    handleNext: () => void
}

export default function AllOrders(props: allOrdersProps){
    const [orders, setOrder] = useState<Order[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllUserOrders();
            setOrder(response.payload);
        }
        fetchData();
    }, [])

    

    return(
        
        <React.Fragment>


        </React.Fragment>
    )
}