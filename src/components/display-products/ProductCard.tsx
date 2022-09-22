import {
  SearchOutlined,
  ShoppingCartOutlined,
  ZoomIn,
} from "@material-ui/icons";
import { useContext } from "react";
import styled from "styled-components";
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge, Grid, Paper, } from "@material-ui/core";
import { apiGetAllReviewsForProduct, apiUpsertProductReview } from "../../remote/e-commerce-api/productReviewService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { ReviewCard } from "../reviews/ReviewCard";
import ProductReview from "../../models/ProductReview";
import { Card, CardContent, CardMedia, Rating, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OpenInFull } from "@mui/icons-material";


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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 1%;
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
    max-height: 75%;
    max-width: 95%;
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
    color: black;
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
  DialogContent: {
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
  productId: number;
  children?: React.ReactNode;
  onClose: () => void;
}

class ProductRequest {
  id: number;
  rating: number;
  comment: string;
  postId: number;

  constructor(rating: number, comment: string, postId: number) {
    this.id = 0;
    this.rating = rating;
    this.comment = comment;
    this.postId = postId;
  }
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const navigate = useNavigate();

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <IconButton
        aria-label="expand-detail-page"
        onClick={() => navigate(`/products/${props.productId}`)}
        sx={{
          position: 'absolute',
          right: 60,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <OpenInFull />
      </IconButton>
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
  const [reviews, setReviews] = React.useState<eCommerceApiResponse>();
  const [newReview, setNewReview] = React.useState<ProductRequest>(new ProductRequest(0, "", props.product.id));
  const { cart, setCart } = useContext(CartContext);
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  React.useEffect(() => {
    async function runEffect() {
      let reviews = await apiGetAllReviewsForProduct(props.product.id);
      setReviews(reviews);
    }

    runEffect();
  }, []);

  const changeQuantity = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    if (index === -1 && product.quantity === 1) {

      newCart.push(product)

    }


    else if (product.quantity === 1 || (product.quantity === -1 && newCart[index].quantity >= 1)) newCart[index].quantity += product.quantity;

    setCart(newCart)

    if (newCart[index].quantity <= 0) removeProduct(product)
  }

  const cartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }
    return total;
  }

  const showProductQuantity = (product: Product) => {
    const index = cart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })
    if (index === -1) return (0)
    console.log(index)
    console.log(cart)
    return cart[index].quantity
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmitReview() {
    try {
      const resp = await apiUpsertProductReview(newReview);
      let reviews = await apiGetAllReviewsForProduct(props.product.id);
      setReviews(reviews);
      setNewReview(new ProductRequest(0, "", props.product.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshReviews() {
    try {
      let reviews = await apiGetAllReviewsForProduct(props.product.id);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  let reviewsMap = <Typography>Loading reviews...</Typography>;

  if (reviews !== undefined) {
    reviewsMap = <Typography>No reviews..</Typography>;
    if (reviews.payload.length > 0) {
      reviewsMap = reviews.payload.slice(0).reverse().map((o: any, index: number) => {
        return <ReviewCard review={o} key={index} refreshReviews={refreshReviews} />
      });
    }
  }

  return (
    <div>
      <Icon aria-label="view-product-details" onClick={handleClickOpen}>
        <ZoomIn />
      </Icon>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
      >
        <BootstrapDialogTitle productId={props.product.id} id="customized-dialog-title" onClose={handleClose}>
          {props.product.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogImage src={props.product.image} />
        </DialogContent>
        <DialogContent dividers>
          <Typography gutterBottom>
            Price: {formatter.format(props.product.price)}
          </Typography>
        </DialogContent>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.product.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
              Here we need to implement add to cart
            </Button> */}
          <IconButton onClick={() => { changeQuantity({ ...props.product, quantity: -1 }) }}>
            <RemoveIcon />
          </IconButton>
          <Typography>
            {showProductQuantity(props.product)}
          </Typography>
          <IconButton onClick={() => { changeQuantity({ ...props.product, quantity: 1 }) }}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => { removeProduct(props.product) }}>
            <DeleteIcon />
          </IconButton>
        </DialogActions>
        <DialogContent dividers>
          <Typography variant="h4" align="center">Leave a Review</Typography>
          <Rating name="rating" value={newReview.rating} onChange={((event: React.SyntheticEvent<Element, Event>, value: number | null) => { if (value !== null) setNewReview({ ...newReview, rating: value }) })} />
          <TextField
            id="outlined-multiline-flexible"
            label="Product Review"
            multiline
            fullWidth
            minRows={8}
            maxRows={8}
            value={newReview.comment}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewReview({ ...newReview, comment: event.target.value }) }}
          />
          <br /><br />
          <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center"><Button variant="contained" onClick={onSubmitReview}>Submit Review</Button></Grid>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h4" align="center">Product Reviews</Typography>
          <Grid container spacing={2} direction="column" alignItems="center" justify="center">
            <Grid item xs={8}>
              {reviewsMap}
            </Grid>
          </Grid>
        </DialogContent>
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

  const showProductQuantity = (product: Product) => {
    const index = cart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })
    if (index === -1) return (0)
    console.log(index)
    console.log(cart)
    return cart[index].quantity
  }


  return (
    <>
      <Container>
        <Card sx={{ width: 345, height: 260 }}>
          <CardMedia
            component="img"
            height="140"
            image={props.product.image}
            alt="product image"
          />
          <Info>
            <Icon>
              <Badge badgeContent={showProductQuantity(props.product)} color="primary">
                <ShoppingCartOutlined onClick={() => { addItemToCart({ ...props.product, quantity: 1 }) }} />
              </Badge>
            </Icon>
            <ProductDetailDialogs product={props.product} key={props.product.id}></ProductDetailDialogs>
          </Info>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item>
                <Typography variant="h5">
                  {props.product.name}
                </Typography>
              </Grid>
              <Grid item xs>
                <Grid container direction="row-reverse">
                  <Typography variant="subtitle1" align="right">
                    ${props.product.price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="body2">
              {props.product.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );

  return (
    <Container>
      <Circle />
      <Image src={props.product.image} />
      <Info>
        <Icon>
          <Badge badgeContent={showProductQuantity(props.product)} color="primary">
            <ShoppingCartOutlined onClick={() => { addItemToCart({ ...props.product, quantity: 1 }) }} />
          </Badge>
        </Icon>
        <ProductDetailDialogs product={props.product} key={props.product.id}></ProductDetailDialogs>
      </Info>
    </Container>

  );
};