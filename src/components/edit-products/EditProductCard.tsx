import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Product from '../../models/Product';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';

interface productProps {
  product: Product,
  key: number
}

export const EditProductCard = (props: productProps) => {
  const navigate = useNavigate();

  function onClick() {
    navigate("/admin/product/" + props.product.id);
  }

  return (
    <>
      <Card sx={{ width: 345, height: 260, margin: 2 }}>
        <CardActionArea onClick={onClick} sx={{ height: 260 }}>
          <CardMedia
            component="img"
            height="140"
            image={props.product.image}
            alt="product image"
          />
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
        </CardActionArea>
      </Card>
    </>
  )
}