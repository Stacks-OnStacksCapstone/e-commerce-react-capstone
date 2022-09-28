import { Button, Container, DialogContent, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Product from "../../models/Product"
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { apiGetAllReviewsForProduct, apigetProductAverageScore, apiUpsertProductReview } from "../../remote/e-commerce-api/productReviewService";
import { CartContext } from "../../context/cart.context";
import { ReviewCard } from "../reviews/ReviewCard";
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from "react-router-dom";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

interface productProps {
  product: Product,
  key: number
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


export const ProductDetailsPage = () => {

  const [product, setProduct] = useState<Product>(new Product(0, "", 0, "", 0, ""));
  const [defaultValue, setDefaultValue] = useState<Product>(new Product(0, "", 0, "", 0, ""));
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = React.useState<eCommerceApiResponse>();
  const [newReview, setNewReview] = React.useState<ProductRequest>(new ProductRequest(0, "", product.id));
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState<number>(0);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  React.useEffect(() => {
    async function runEffect() {
      if (id === undefined) {
        console.log("no id pulled by use params");
        return;
      }
      try {
        const result = await apiGetProductById(parseInt(id))
        setProduct(result.payload)
        setDefaultValue({ ...result.payload })
        const avgResult = await apigetProductAverageScore(parseInt(id))
        setAvgRating(avgResult.payload)
      } catch (error) {
        console.log(error)
      }
      let reviews = await apiGetAllReviewsForProduct(parseInt(id));
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

  const showProductQuantity = (product: Product) => {
    const index = cart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })
    if (index === -1) return (0)
    console.log(index)
    console.log(cart)
    return cart[index].quantity
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let reviewsMap = <Typography>Loading reviews...</Typography>;

  async function onSubmitReview() {
    try {
      const resp = await apiUpsertProductReview(newReview);
      let reviews = await apiGetAllReviewsForProduct(product.id);
      setReviews(reviews);
      setNewReview(new ProductRequest(0, "", product.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshReviews() {
    try {
      let reviews = await apiGetAllReviewsForProduct(product.id);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  if (reviews !== undefined) {
    reviewsMap = <Typography>No reviews..</Typography>;
    if (reviews.payload.length > 0) {
      reviewsMap = reviews.payload.slice(0).reverse().map((o: any, index: number) => {
        return <ReviewCard review={o} key={index} refreshReviews={refreshReviews} />
      });
    }
  }

  return (
    <>
      <br />
      {/* <Top> */}
      <Button style={{ margin: "20px" }} variant="contained" onClick={() => { navigate("/"); }}> Back to Products </Button>
      {/* </Top> */}
      <br />
      <br />
      <br />
      <Grid container spacing={2} >
        <Grid item xs></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Container>
            <img src={product.image} width="95%" height="95%" />
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Typography component="h1" variant="h4" align="center">
            {product.name}
          </Typography>
          <Rating name = "readOnly" value = {avgRating} readOnly></Rating>
          <br />
          <Typography gutterBottom>
            {product.description}
          </Typography>
          <br />
          <Grid container alignItems="center" wrap="nowrap" >
            <Grid item>
              <IconButton onClick={() => { changeQuantity({ ...product, quantity: -1 }) }}>
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>
                {showProductQuantity(product)}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => { changeQuantity({ ...product, quantity: 1 }) }}>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => { removeProduct(product) }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Typography variant="h5" gutterBottom>
                Price: {formatter.format(product.price)}
              </Typography>
            </Grid>
          </Grid>
          <br />
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
            <br />
          </DialogContent>
          <DialogContent dividers>
            <Typography variant="h4" align="center">Product Reviews</Typography>
            <Grid container spacing={2} direction="column" alignItems="center" justify="center">
              <Grid item xs={8}>
                {reviewsMap}
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  )

}