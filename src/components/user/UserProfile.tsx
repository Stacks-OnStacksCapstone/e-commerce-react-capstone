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
import { Button, Container, Snackbar, Stack, Table, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import { apiCreatePayment, apiCreatePaymentMethod, apiDeletePayment, apiGetAllUserPaymentMethods } from "../../remote/e-commerce-api/paymentService";
import UserPayments from "../../models/UserPayments";
import { positions } from '@mui/system';



const theme = createTheme();


export default function UserProfile() {

    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState<User>()
    const [persisted, setPersisted] = useState<String>("");
    const [errorMessage, setErrorMessage] = useState<String>("");
    const [value, setValue] = useState<String>("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: ""
    });

    const [paymentFormData, setPaymentFormData] = useState({
        expDate: "",
        ccv: "",
        cardNumber: ""
    });
    const [userPaymentMethods, setUserPaymentMethods] = useState<UserPayments[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("effect invoked");
        getProfile();
    }, []);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    React.useEffect(() => {
        findAllUserPaymentMethods();
    }, []);

    async function update(event: { preventDefault: () => void; }) {

        event.preventDefault();

        setOpen(true);

        if (!formData.firstName && !formData.lastName && !formData.password) {
            setErrorMessage(`Please update a field`)
            return;
        }

        try {
            await apiUpdateUser(formData.firstName, formData.lastName, formData.password);
            setPersisted("You've successfully updated your profile!");
            getProfile();

        } catch (error: any) {
            setErrorMessage(`Update was unsuccessful because ${error.payload}`);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setErrorMessage("");
        setPersisted("");
    };

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



    async function createPayment(event: { preventDefault: () => void; }) {

        event.preventDefault();

        setOpen(true);

        if (!paymentFormData.ccv || !paymentFormData.expDate || !paymentFormData.cardNumber) {
            setErrorMessage(`Please fill out all fields`)
            return;
        }

        try {

            await apiCreatePaymentMethod(paymentFormData.ccv, new Date(paymentFormData.expDate), paymentFormData.cardNumber);
            setPersisted("You've successfully added your payment method!");

        } catch (error: any) {
            setErrorMessage(`Adding payment was unsuccessful because ${error.payload}`);
        }
    }



    async function deletePayment(paymentId: String) {
        try {

            await apiDeletePayment(paymentId);
            setPersisted(`You've successfully removed your payment method!`);

        } catch (error) {
            console.log(error);
        }
    }

    async function getProfile() {
        try {
            const result = await apiGetProfile();
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
    async function findAllUserPaymentMethods() {
        try {
            const result = await apiGetAllUserPaymentMethods();
            setUserPaymentMethods(result.payload);

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Box style={{ position: "relative", top: "13px", left: "275px" }} color="inherit" sx={{ m: 8 }}>
                <Typography variant="h2">Welcome to Your Dashboard, {user?.firstName}!</Typography>
            </Box>



            <Container style={{ position: "relative", top: "15px", left: "-300px" }} color="inherit" component="main" maxWidth="xs" >

                <Paper style={{ padding: "12px 35px 10px" }} elevation={2}>

                    <Box color="inherit" sx={{ m: 4, mx: "auto" }}>
                        <Typography variant="h5"> Update Your Profile</Typography>
                    </Box>

                    <Box color="inherit" component="form" noValidate sx={{ mt: 3 }}>

                        <Grid container spacing={3}>
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
                                <Box sx={{ mt: 3, mb: 2 }}>

                                    <Button fullWidth variant="contained" onClick={update}>Update</Button>

                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity={persisted ? "success" : "error"} sx={{ width: '100%' }}>
                                            {persisted ? persisted : errorMessage}
                                        </Alert>
                                    </Snackbar>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>


            <Container style={{ position: "relative", top: "45px", left: "-300px" }} color="inherit" component="main" maxWidth="xs" >

                <Paper style={{ margin: "12px", padding: "12px 35px 10px" }} elevation={3}>

                    <Box color="inherit" sx={{ m: 3, mx: "auto" }}>

                        <Typography variant="h5"> Deactivate Your Account</Typography>

                        <br />

                        <Typography variant="body2">Caution! You will be logged out after deactivating your account. Enter 'deactivate' to proceed.</Typography>
                    </Box>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="deactivate"
                            label="deactivate"
                            type="text"
                            id="deactivate"
                            onChange={(event) => setValue(event.target.value)}
                        />

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Button fullWidth variant="contained" disabled = {!(value==='deactivate')} onClick={() => deactivateUser()}>Deactivate</Button>
                    </Box>
                   </Grid> 
                </Paper>
            </Container>

            <Container style={{ position: "relative", top: "-561px", right: "-300px" }} color="inherit" component="main" maxWidth="sm">

                <Paper style={{ padding: "12px 35px 10px" }} elevation={3}>

                    <Box color="inherit" sx={{ m: 3, mx: "auto" }}>
                        <Typography variant="h5"> Manage Your Payment</Typography>
                    </Box>

                    <Box color="inherit" component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>        
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cardNumber"
                                    label="Card Number"
                                    name="cardNumber"
                                    autoComplete="family-name"
                                    value={paymentFormData.cardNumber}
                                    onChange={(event) => setPaymentFormData({ ...paymentFormData, cardNumber: event.target.value})}
                                />
                            </Grid>    
                            <br />
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="expDate"
                                    label="Expiration Date"
                                    name="expDate"
                                    autoComplete="family-name"
                                    value={paymentFormData.expDate}
                                    onChange={(event) => setPaymentFormData({ ...paymentFormData, expDate: event.target.value })}
                                />
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="ccv"
                                    label="CCV"
                                    name="ccv"
                                    autoComplete="family-name"
                                    value={paymentFormData.ccv}
                                    onChange={(event) => setPaymentFormData({ ...paymentFormData, ccv: event.target.value })}
                                />
                            </Grid>   
                            <Grid item xs={12}>
                                <Box sx={{ mt: 3, mb: 2 }}>

                                    <Button fullWidth variant="contained" onClick={createPayment}>Add Payment</Button>

                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity={persisted ? "success" : "error"} sx={{ width: '100%' }}>
                                            {persisted ? persisted : errorMessage}
                                        </Alert>
                                    </Snackbar>
                                </Box>

                        <Box color="inherit" component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {
                                userPaymentMethods === undefined ?
                                    (<p>No payment method currently found</p>)
                                    :
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHead>Card Number</TableHead>
                                                <TableHead>Expiration Date</TableHead>
                                                <TableHead>CCV</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHead>
                                        <tbody>
                                            {
                                                userPaymentMethods.map((o) => {
                                                    return (
                                                        <tr>
                                                            <td>{o.cardNumber}</td>
                                                            <td>{o.expDate.toString()}</td>
                                                            <td>{o.ccv}</td>
                                                            <td>
                                                                {
                                                                    (<Button fullWidth variant="contained" onClick={() => deletePayment(o.id)}>DELETE</Button>)
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                            }
                        </Grid>
                    </Box>

                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>


        </>
    );
}