import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { apiResetPassword, apiVerifyToken } from '../../remote/e-commerce-api/authService';

const MenuItem = styled.div`
  cursor: pointer;
`;

export default function ResetPassword() {
    const navigate = useNavigate();
    const [message,setMessage] = useState(String);
    const [isValid,setIsValid] = useState(false);
    const {token} = useParams();

    useEffect(() => {
        verifyToken();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (token !== undefined) {
                const data = new FormData(event.currentTarget);
                const response = await apiResetPassword(token,`${data.get('password')}`);
                if (response.status >= 200 && response.status < 300) {
                    setMessage(`Password was successfully reset! navigating to login`);
                    navigate('/login');
                }
            } else {
                setMessage("Token not found, you must use the link provided in your email.");
            }
        } catch (error: unknown) {
            if (typeof error === "string") console.error(error);
            else if (error instanceof AxiosError) {
                console.error(error);
                let errResponse = error.response;
                if (errResponse !== undefined) {
                    if (errResponse.status === 404) setMessage("Invalid token, you must use the link provided in your email.");
                }
            }
        }
    };

    const verifyToken = async () => {
        try {
            if (token !== undefined) {
                const response = await apiVerifyToken(token);
                if (response.status >= 200 && response.status < 300) {
                    setIsValid(true);
                }
            } else {
                setMessage("Use the links below to navigate to register or send another link to your email");
                setIsValid(false);
            }
        } catch (error: unknown) {
            if (typeof error === "string") console.error(error);
            else if (error instanceof AxiosError) {
                console.error(error);
                let errResponse = error.response;
                if (errResponse !== undefined) {
                    if (errResponse.status === 404) setMessage("Use the links below to navigate to register or send another link to your email");;
                }
            }
            setIsValid(false);
        }
    };

    return (
    <>
        { isValid ? (
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
                Reset Password
            </Typography>
            {message === undefined ? <p></p> : <p>{message}</p>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Reset Password
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="login" variant="body2">
                            {"Return to Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        ) : (
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignText: 'center'
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password Token has expired
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <h5>{message}</h5>
                    <Grid container>
                        <MenuItem>
                            <Link onClick={() => {navigate('/forgot-password')}} variant="body2">Send another link to your email here</Link>
                        </MenuItem>
                        <br />
                        <MenuItem>
                            <Link onClick={() => {navigate('/register')}} variant="body2">Don't have an account? Sign Up</Link>
                        </MenuItem>
                    </Grid>
                </Box>
            </Box>
        </Container>
        )};
    </>
    );

}