import { render, screen, waitFor } from '@testing-library/react';
//import App from './App';

import { apiGetAllUserOrders } from '../remote/e-commerce-api/orderService';
import { apiLogin } from '../remote/e-commerce-api/authService';
import { OrderCard } from '../components/orders/OrderCard';
import { DisplayProducts } from '../components/display-products/DisplayProducts';

test('grabs all orders for user', async () => {
    //expect.assertions(1);
    const user = await apiLogin("rc@mail.com", "12345");
    const orders = JSON.parse(`[
      {
          "orderId": 1,
          "userEmail": "jj@mail.com",
          "paymentId": "ab0930e8-c631-43e9-b187-237fef52e481",
          "orderDate": "2022-09-22",
          "shipmentAddress": "1, 1, 1, 1, 1"
      }
  ]`)
    render(<OrderCard key={0} order={orders[0]}/>);
    const linkElement = screen.getByText("Order Header");
    expect(linkElement).toBeInTheDocument();
    
  });

test(`grabs no orders when not logged in`, async () =>{
    const orders = JSON.parse(`[
      {
        "orderId": 1,
        "userEmail": "jj@mail.com",
        "paymentId": "ab0930e8-c631-43e9-b187-237fef52e481",
        "orderDate": "2022-09-22",
        "shipmentAddress": "1, 1, 1, 1, 1"
    }
  ]`)
  render(<DisplayProducts></DisplayProducts>);
  const linkElement = screen.queryByText("ORDERS")
  expect(linkElement).toBeNull();
})

