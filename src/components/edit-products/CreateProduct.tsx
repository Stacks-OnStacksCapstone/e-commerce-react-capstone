import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Product from "../../models/Product";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";


export const CreateProduct = () => {

  const [formData, setFormData] = useState<Product>(new Product(0, "", 0, "", 0, ""));
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

  return <>
    <br />
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <br />
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

