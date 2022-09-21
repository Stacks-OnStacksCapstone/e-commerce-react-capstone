import { useEffect, useState } from "react";
import { apiDeactivateUser, apiGetProfile, apiUpdateUser } from "../../remote/e-commerce-api/UserService";
import User from "../../models/User";
import { apiGetCurrentUser, apiLogout } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from "@mui/material";
import Paper from '@mui/material/Paper';


const theme = createTheme();


export default function UserProfile() {

    const [user, setUser] = useState<User>()
    const [persisted, setPersisted] = useState<String>();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("effect invoked");
        getProfile();
    }, []);

    async function update(event: { preventDefault: () => void; }) {
        event.preventDefault();
        try {
            await apiUpdateUser(formData.firstName, formData.lastName, formData.password);

            //const resp = await apiGetCurrentUser();
            
            

            setPersisted("You've successfully updated your profile!");
            getProfile();

        } catch (error: any) {
            setPersisted(`Update was unsuccessful because ${error.payload}`);
        }
    }

    async function deactivateUser() {
        try {

            await apiDeactivateUser();
            await apiLogout();
            navigate('/login');
            console.log(user);
            setPersisted(`You've successfully deactivated your profile!`);

        } catch (error) {
            console.log(error);
        }
    }

    async function getProfile() {
        try {
            const result = await apiGetProfile()
            setUser(result.payload);
            setFormData({
                firstName: result.payload.firstName,
                lastName: result.payload.lastName,
                password: result.payload.password,
            });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Box color="inherit" sx={{ m: 4 }}>
                <Typography variant="h2">Welcome to Your Dashboard, {user?.firstName}!</Typography>
            </Box>



            <Container color="inherit" component="main" maxWidth="xs">

                <Paper style={{ padding: "12px 35px 10px" }} elevation={3}>

                    <Box color="inherit" sx={{ m: 3, mx: "auto" }}>
                        <Typography variant="h5"> Update Your Profile</Typography>
                    </Box>

                    <Box color="inherit" component="form" noValidate sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
                                    autoFocus
                                />
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                />
                                <Box sx={{ mt: 3, mb: 2}}>
                                    <Button fullWidth variant="contained" onClick={update}>Update</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        {persisted === undefined ? <p></p> : <p>{persisted}</p>}
                    </Box>
                </Paper>
            </Container>

           


            <Container style={{width:"468px"}}color="inherit" component="main" maxWidth="sm" >

            
                <Paper style={{margin:"12px", padding: "12px 35px 10px" }} elevation={3}>

                

                    <Box color="inherit" sx={{ m: 3, mx: "auto" }}>
                        <Typography variant="h5"> Deactivate Your Account</Typography>
                        
                        <br />

                        <Typography variant="body2">Please proceed with caution! You will be logged out after deactivating your account.</Typography>
                    </Box>

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Button fullWidth variant="contained" onClick={() => deactivateUser()}>Deactivate</Button>
                    </Box>
                </Paper>
        
            </Container>

        </>
    );
}