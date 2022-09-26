import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
//import App from './App';
import eCommerceClient, { eCommerceApiResponse } from "../remote/e-commerce-api/eCommerceClient";
import Address from '../models/Address';
import { apiGetAllUserOrders } from '../remote/e-commerce-api/orderService';
import { apiLogin } from '../remote/e-commerce-api/authService';
import { OrderCard } from '../components/orders/OrderCard';
import { isConstructorDeclaration } from 'typescript';

test('grabs all orders for user', async () => {
    expect.assertions(1);
    const user = await apiLogin("jj@mail.com", "12345");
    const orders = await apiGetAllUserOrders();
    render(<OrderCard key={0} order={orders.payload[0]}/>);
    const linkElement = screen.getByText(orders.payload[0]);
    expect(linkElement).toBeInTheDocument();
    console.log("gello");
  });


