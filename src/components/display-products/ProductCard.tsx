import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { useContext } from "react";
  import styled from "styled-components" ;
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;s
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;

  const DialogImage = styled.img`
    display: block;
    width: 75%;
    height: 75%;
    margin: auto;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  const DialogContentStyle = {
    DialogContent:{
      padding: "50px"
    },
}
  
  interface productProps {
      product: Product,
      key: number
  }

  const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  export default function ProductDetailDialogs(props: productProps) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Icon aria-label="view-product-details" onClick={handleClickOpen}>
          <SearchOutlined />
        </Icon>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {props.product.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <DialogImage src={props.product.image}/>
          </DialogContent>
          <DialogContent dividers>
          <Typography gutterBottom>
            Price: ${props.product.price}
          </Typography>
          </DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>
              {props.product.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Here we need to implement add to cart
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
    }

  export const ProductCard = (props: productProps) => {
    const { cart, setCart } = useContext(CartContext);

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product, quantity: 1})}} />
          </Icon>
          <ProductDetailDialogs product={props.product} key={props.product.id}></ProductDetailDialogs>
        </Info>
      </Container>

    );
  };