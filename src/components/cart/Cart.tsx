import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Typography, Radio, FormGroup, RadioGroup, FormControlLabel, FormControl, FormLabel, Table, TableRow } from "@mui/material";
import { apiGetAllUserPaymentMethods } from "../../remote/e-commerce-api/paymentService";
import UserPayments from "../../models/UserPayments";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const ProductDisplay = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-top: 20px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const CheckoutButton = styled.div`
  display: flex;
  justify-content: center;
`;


export const Cart = () => {
  const [paymentInfo, setPaymentInfo] = useState<UserPayments[]>([]);
  
  useEffect(() => {
    setPaymentInfo(() => {return []});
    const getUserPayments = async () => {
      const response = await apiGetAllUserPaymentMethods();
      const paymentArr : UserPayments[] = [];
      for (let i = 0; i < response.payload.length; i++) {
        paymentArr.push(response.payload[i]);
      }
      setPaymentInfo(() => {return paymentArr});
    }
    getUserPayments()
  }, [])

  const { cart, setCart } = useContext(CartContext);
  const [showSummary, setShow] = useState(false);



 

  // Create our number formatter.
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const changeQuantity = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    if (index === -1) newCart.push(product)
    else if (!(product.quantity < 0 && newCart[index].quantity == 1)) newCart[index].quantity += product.quantity

    setCart(newCart)
  }

  const removeProduct = (product: Product) => {
    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    for (let i = 0; i < newCart.length; i++) {
      if (i === index) newCart.splice(i, 1);
    }

    setCart(newCart)
  }

  const navigate = useNavigate();

  useEffect(() => 
  {
    if(cart.length > 0){
      setShow(true);
    } else {
      setShow(false);
    }
  }, [cart]
  )  


  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Button variant="contained" onClick={() => {navigate('/')}}>CONTINUE SHOPPING</Button>
          {/* <TopButton onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {
              cart.map((product)=> (
                <>
                  <ProductDisplay>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount> {product.quantity} </ProductAmount>
                      </ProductAmountContainer>
                      <ButtonGroup >
                        <Button onClick={() => {changeQuantity({...product, quantity: -1})}} >-</Button>
                        <Button onClick={() => {removeProduct(product)}} >
                          <DeleteOutlinedIcon />
                        </Button>
                        <Button onClick={() => {changeQuantity({...product, quantity: 1})}} >+</Button>
                      </ButtonGroup>
                      <ProductPrice>{formatter.format(product.price * product.quantity)}</ProductPrice>
                    </PriceDetail>
                  </ProductDisplay>
                  <Hr/>
                </>
              ))
            }
          </Info>
          {!showSummary || 
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                  {formatter.format(cart.reduce<number>((total, product) => total + product.price * product.quantity, 0))}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>{formatter.format(5.90)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>{formatter.format(-5.90)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
              {formatter.format(cart.reduce<number>((total, product) => total + product.price * product.quantity, 0))}
              </SummaryItemPrice>
            </SummaryItem>
            <Button fullWidth={true} variant="contained" onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</Button>
          </Summary>
          }
        </Bottom>
      </Wrapper>
    </Container>
  );
};