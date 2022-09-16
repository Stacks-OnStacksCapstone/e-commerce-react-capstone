import { Box, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import Product from '../../models/Product';
import ProductReview from '../../models/ProductReview';
import { apiGetCurrentUser } from '../../remote/e-commerce-api/authService';
import { apiDeleteProductReview, apiGetAllReviewsForProduct } from '../../remote/e-commerce-api/productReviewService';


interface reviewProps {
  review: ProductReview,
  key: number
  refreshReviews: any
}

export const ReviewCard = (props: reviewProps) => {
  const [user, setUser] = useState<any>();

  useEffect(()=> {
    async function runEffect() {
      const resp = await apiGetCurrentUser();
      console.log(resp);
      setUser(resp.payload);
    }
    runEffect();
  }, []);

  async function onDelete() {
    try {
      const resp = await apiDeleteProductReview(props.review.id);
      props.refreshReviews();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card sx={{ width: 345, margin: 2, backgroundColor: grey[200] }}>
      <CardContent>
        <Typography gutterBottom>
          {props.review.user.firstName}
        </Typography>
        <Typography variant="body2">
        <Rating name="disabled" value={props.review.rating} disabled />
        </Typography>
        <Typography variant="body2">
          {props.review.comment}
        </Typography>
        <CardActions>
          {user !== undefined && props.review.user.userId === user.id && <Button variant="contained" size="small" onClick={onDelete}>Delete</Button>}
        </CardActions>
      </CardContent>
    </Card>
  );
}