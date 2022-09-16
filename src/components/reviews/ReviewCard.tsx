import { Box, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import React from 'react';
import Product from '../../models/Product';
import ProductReview from '../../models/ProductReview';


interface reviewProps {
    review: ProductReview,
    key: number
}

export const ReviewCard = (props: reviewProps) => {
  return(
    <React.Fragment>
    <CardContent>
      <Typography gutterBottom>
        Product Review
      </Typography>
      <Typography variant="body2">
        {props.review.comment}
      </Typography>
    </CardContent>
  </React.Fragment>
  );
}