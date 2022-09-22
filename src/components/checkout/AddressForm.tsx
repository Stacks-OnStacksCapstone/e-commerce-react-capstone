import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Address from '../../models/Address';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as yup from "yup";
import { useFormik } from "formik";

interface addressFormProps {
  updateAddress: (addresses: Address) => void
  handleNext: () => void
}

export default function AddressForm(props: addressFormProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.updateAddress(
      {
        firstName: `${data.get('firstName')}`,
        lastName: `${data.get('lastName')}`,
        address1: `${data.get('address1')}`,
        address2: `${data.get('address2')}`,
        city: `${data.get('city')}`,
        state: `${data.get('state')}`,
        zip: `${data.get('zip')}`,
        country: `${data.get('country')}`
      }
    )
    props.handleNext()
  }

  const formik = useFormik ({
    initialValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      country: "" 
    },
    onSubmit: function (values){
      console.log(values)
    },
    validationSchema: yup.object().shape({
      firstName: yup
          .string()
          .required("First Name is required")
          .matches(/^[aA-zZ]+$/, "Use only allowed characters")
          .max(50, 'First Name is too long'),
      lastName: yup
          .string()
          .matches(/^[aA-zZ]+$/, "Use only allowed characters")
          .required("Last Name is required")
          .max(50, 'Last Name is too long'),
      address1: yup
          .string()
          .required("Address is required"),
      city: yup
          .string()
          .matches(/^[aA-zZ\s]+$/, "Use only allowed characters")
          .required("City is required"),
      zip: yup
          .string()
          .required("Zipcode is required")
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(5, 'Must be exactly 5 digits')
          .max(5, 'Must be exactly 5 digits'),
      country: yup
          .string()
          .matches(/^[aA-zZ]+$/, "Use only allowed characters")
          .required("Country is required"),
    })
  })


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              helperText={formik.touched.firstName ? formik.errors.firstName: ""}
              error= {formik.touched.firstName && Boolean(formik.errors.firstName)}
              label="First name"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              helperText={formik.touched.lastName ? formik.errors.lastName: ""}
              error= {formik.touched.lastName && Boolean(formik.errors.lastName)}
              label="Last name"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              helperText={formik.touched.address1 ? formik.errors.address1: ""}
              error= {formik.touched.address1 && Boolean(formik.errors.address1)}
              label="Address line 1"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              helperText={formik.touched.city ? formik.errors.city: ""}
              error= {formik.touched.city && Boolean(formik.errors.city)}
              label="City"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              helperText={formik.touched.zip ? formik.errors.zip: ""}
              error= {formik.touched.zip && Boolean(formik.errors.zip)}
              label="Zip / Postal code"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              helperText={formik.touched.country ? formik.errors.country: ""}
              error= {formik.touched.country && Boolean(formik.errors.country)}
              label="Country"
              fullWidth
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}