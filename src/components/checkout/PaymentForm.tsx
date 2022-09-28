import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PaymentDetail from '../../models/PaymentDetail';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Table, TableRow } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";
import UserPayments from '../../models/UserPayments';
import { apiGetAllUserPaymentMethods } from "../../remote/e-commerce-api/paymentService";
import { useEffect, useState } from 'react';

interface paymentFormProps {
  handleBack: () => void
  handleNext: () => void
  updatePayment: (paymentDetail: PaymentDetail[]) => void
}

export default function PaymentForm(props: paymentFormProps) {
  const [paymentInfo, setPaymentInfo] = useState<UserPayments[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<number>(0);
  
  useEffect(() => {
    setPaymentInfo(() => {return []});
    const getUserPayments = async () => {
      const response = await apiGetAllUserPaymentMethods();
      const paymentArr : UserPayments[] = [];
      for (let i = 0; i < response.payload.length; i++) {
        paymentArr.push(response.payload[i]);
      }
      setPaymentInfo(() => {return paymentArr});
    }
    getUserPayments()
  }, [])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = paymentInfo[selectedPayment];
    console.log(data);
    props.updatePayment(
      [
        {name: "Payment Id", detail: `${data["id"]}`},
        {name: "Card Type", detail: `${data["ccv"]}`},
        {name: "Card Number", detail: formatCardNumber(`${data["cardNumber"]}`)},
        {name: "Expiry Date", detail: `${data["expDate"]}`}
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
      {/*<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
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
    </Box>*/}
      <Box component="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel id="payment-options-group-label">Payment Options</FormLabel>
        <RadioGroup
          aria-labelledby="payment-options-radio-group"

          >
            <Table>
              {paymentInfo.map((e, i) => { return (
                <TableRow>
                    <FormControlLabel value={i} control={<Radio onChange={()=>{setSelectedPayment(i)}}/>} label={`Card Number: ${e.cardNumber}`}/>
                    <Typography>{`Card number: ${e.cardNumber}`}</Typography>
                    <Typography>{`Expiration date: ${e.expDate}`}</Typography>
                </TableRow>)})
              
              }
            </Table>
        </RadioGroup>
        <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>Submit payment</Button>
        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
      </FormControl>
      
      </Box>
    </React.Fragment>
  );
}
