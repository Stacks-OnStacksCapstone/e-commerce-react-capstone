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
import { apiLogin } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { useState, useContext, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(String);

  const [persisted, setPersisted] = useState<String>();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
    const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`);
    if (response.status >= 200 && response.status < 300) {
      setUser(response.payload);  // Setting user globally in userContext after user logs in.
      navigate('/');
    }
      
    } catch(error :any) {
      
      console.log(error);
      if (error.response.status >= 400)
      setPersisted("Login was unsuccessful because your account has been deactivated!");
  }};
  

  return (
      <Container color="inherit" component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
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
            Sign in
          </Typography>
          {message === undefined ? <p></p> : <p>{message}</p>}
          <Box color="inherit" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container direction='column'>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                {persisted === undefined ? <p></p> : <p>{persisted}</p>}
              </Grid>
              <Grid item>
                <Link href="forgot-password" variant="body2">
                  {"Reset your password"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
  );
}