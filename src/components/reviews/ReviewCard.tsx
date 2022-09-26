import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey } from '@material-ui/core/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useEffect, useState } from 'react';
import ProductReview from '../../models/ProductReview';
import { apiGetCurrentUser } from '../../remote/e-commerce-api/authService';
import { apiDeleteProductReview, apiGetAllReviewsForProduct } from '../../remote/e-commerce-api/productReviewService';
import Rating from '@mui/material/Rating';


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
      setUser(resp.payload);
    }
    runEffect();
  }, []);

  async function onDelete() {
    try {
      const resp = await apiDeleteProductReview(props.review.id);
      props.refreshReviews();
    } catch (error) {
      //console.log(error);
    }
  }
  return (
    <Card sx={{ width: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom>
          {props.review.user.firstName}
        </Typography>
        <Typography variant="body2">
        <Rating name="read-only" value={props.review.rating} readOnly />
        </Typography>
        <Typography variant="body2">
          {props.review.comment}
        </Typography>
        <CardActions>
          {user && props.review.user.userId === user.userId && <Button variant="contained" size="small" onClick={onDelete}>Delete</Button>}
        </CardActions>
      </CardContent>
    </Card>
  );
}