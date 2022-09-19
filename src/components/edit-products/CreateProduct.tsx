import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getSuggestedQuery } from "@testing-library/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Product from "../../models/Product";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";


export const CreateProduct = () => {

  const [formData, setFormData] = useState<Product>(new Product(0, "", 0, "", 0, ""));
  const [user, setUser] = useState<eCommerceApiResponse>();
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      const resp = await apiUpsertProduct(formData);
      navigate("/admin/product/" + resp.payload.id);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    let usr = await apiGetCurrentUser();
    setUser(usr);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (user === undefined || user.payload.admin != true) {
    return <h1>Unauthorized</h1>
  }

  return <>
    <br />
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <br />
          <Grid container spacing={0} justify="flex-end">
              <Button variant="contained" onClick={() => { navigate("/admin/products"); }}> Return to Products</Button><span>&nbsp;&nbsp;</span>
          </Grid>
          <Typography variant="h4">Create Product</Typography>
          <br />
          <TextField
            required

            id="outlined-required"
            label="Product Name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>
            ) => { setFormData({ ...formData, name: event.target.value }) }}
          />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Product Description"
            onChange={(event: React.ChangeEvent<HTMLInputElement>
            ) => { setFormData({ ...formData, description: event.target.value }) }}
          />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Image URL"
            onChange={(event: React.ChangeEvent<HTMLInputElement>
            ) => { setFormData({ ...formData, image: event.target.value }) }}
          />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Product Price"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>
            ) => { setFormData({ ...formData, price: event.target.valueAsNumber }) }}
          />
          <br />
          <br />
          <Button variant="contained" onClick={onSubmit}>

            create product
          </Button>
          <br />
        </Grid>
      </Paper>
    </Container>
  </>
}

