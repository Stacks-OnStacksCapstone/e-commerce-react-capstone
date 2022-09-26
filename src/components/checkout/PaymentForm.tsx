import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PaymentDetail from '../../models/PaymentDetail';
import { Box, Button } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";

interface paymentFormProps {
  handleBack: () => void
  handleNext: () => void
  updatePayment: (paymentDetail: PaymentDetail[]) => void
}

export default function PaymentForm(props: paymentFormProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.updatePayment(
      [
        {name: "Card Type", detail: `${data.get('ccv')}`},
        {name: "Card Holder", detail: `${data.get('cardName')}`},
        {name: "Card Number", detail: formatCardNumber(`${data.get('cardNumber')}`)},
        {name: "Expiry Date", detail: `${data.get('expDate')}`}
      ]
    )
    props.handleNext()
  }

  const formatCardNumber = (cardNumber: string) => {
    return `xxxx-xxxx-xxxx-${cardNumber.slice(-4)}`
  }
  
  const formik = useFormik ({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      ccv: "",
    },
    onSubmit: function (values){
      console.log(values)
    },
    validationSchema: yup.object().shape({
      cardName: yup
          .string()
          .required("Card Name is required")
          .matches(/^[aA-zZ\s]+$/, "Use only allowed characters")
          .max(30, 'Card Name is too long'),
      cardNumber: yup
          .string()
          .matches(/^[0-9]+$/, "Use only allowed characters")
          .required("Card Number is required")
          .min(16, 'Must exactly be 16 digits')
          .max(16, 'Must exactly be 16 digits'),
      expDate: yup
          .string()
          .required("Expiration Date is required")
          .matches(/^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}/, "Use this template: yyyy-mm-dd")
          .max(10, 'Invalid Date'),
      ccv: yup
          .string()
          .matches(/^[0-9]+$/, "Use only allowed characters")
          .required("CCV is required")
          .min(3, 'Must exactly be 3 digits')
          .max(3, 'Must exactly be 3 digits'),
    })
  })

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              helperText={formik.touched.cardName ? formik.errors.cardName: ""}
              error= {formik.touched.cardName && Boolean(formik.errors.cardName)}
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              helperText={formik.touched.cardNumber ? formik.errors.cardNumber: ""}
              error= {formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              fullWidth
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Exp Date"
              helperText={formik.touched.expDate ? formik.errors.expDate: ""}
              error= {formik.touched.expDate && Boolean(formik.errors.expDate)}
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="ccv"
              name="ccv"
              label="CCV"
              helperText={formik.touched.ccv ? formik.errors.ccv: ""}
              error= {formik.touched.ccv && Boolean(formik.errors.ccv)}
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
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