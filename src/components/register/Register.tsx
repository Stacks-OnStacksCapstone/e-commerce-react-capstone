import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import YupPassword from 'yup-password';

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [message,setMessage] = React.useState(String); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiRegister(`${data.get('firstName')}`, `${data.get('lastName')}`, `${data.get('email')}`, `${data.get('password')}`)
    if (response.status >= 200 && response.status < 300) navigate('/login')
  };
  YupPassword(yup);
  const formik = useFormik ({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    onSubmit: function (values){
      console.log(values)
    },
    validationSchema: yup.object().shape({
      firstName: yup
          .string()
          .required("First Name is required")
          .matches(/^[aA-zZ]+$/, "Use only allowed characters"),
      lastName: yup
          .string()
          .required("Last Name is required")
          .matches(/^[aA-zZ]+$/, "Use only allowed characters"),
      email: yup
          .string()
          .required("Email Address is required"),
      password: yup
          .string()
          .required("Password is required")
          .min(8, "Password must contain 8 or more characters with at least one of each: uppercas, lowercas, number, and special")
          .minLowercase(1, 'password must contain at least 1 lower case letter')
          .minUppercase(1, 'password must contain at least 1 upper case letter')
          .minNumbers(1, 'password must contain at least 1 number')
          .minSymbols(1, 'password must contain at least 1 special character'),
    })
  })

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  helperText={formik.touched.firstName ? formik.errors.firstName: ""}
                  error= {formik.touched.firstName && Boolean(formik.errors.firstName)}
                  required
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur = {formik.handleBlur}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  helperText={formik.touched.lastName ? formik.errors.lastName: ""}
                  error= {formik.touched.lastName && Boolean(formik.errors.lastName)}
                  onChange={formik.handleChange}
                  onBlur = {formik.handleBlur}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  helperText={formik.touched.email ? formik.errors.email: ""}
                  error= {formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  onBlur = {formik.handleBlur}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  helperText={formik.touched.password ? formik.errors.password: ""}
                  error= {formik.touched.password && Boolean(formik.errors.password)}
                  onChange={formik.handleChange}
                  onBlur = {formik.handleBlur}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}