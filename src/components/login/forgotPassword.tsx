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
import { useNavigate } from "react-router-dom";
import { apiForgotPassword } from '../../remote/e-commerce-api/authService';
import { useState } from 'react';
import { AxiosError } from 'axios';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [message,setMessage] = useState(String);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const response = await apiForgotPassword(`${data.get('email')}`);
            if (response.status >= 200 && response.status < 300) {
                setMessage(`A link to reset your password has been sent to '${data.get('email')}', please check your email!`);
                // navigate('/login');
            }
        } catch (error: unknown) {
            if (typeof error === "string") console.error(error);
            else if (error instanceof AxiosError) {
                console.error(error);
                let errResponse = error.response;
                if (errResponse !== undefined) {
                    if (errResponse.status === 404) setMessage("Entered email does not correspond to a registered user");
                    // if (errResponse.status === 400) setMessage("Entered password was invalid");
                }
            }
        }
    };

    return (
    <>
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
                Send a link to your Email
            </Typography>
            {message === undefined ? <p></p> : <p>{message}</p>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send Reset Password Link
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
    </>
    );

}