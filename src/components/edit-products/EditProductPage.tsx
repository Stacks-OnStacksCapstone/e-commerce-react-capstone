import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Product from "../../models/Product"
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService"
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient"
import { apiDeleteProduct, apiGetProductById, apiUpsertProduct } from "../../remote/e-commerce-api/productService"



export const EditProductPage = () => {

    const [product, setProduct] = useState<Product>(new Product(0, "", 0, "", 0, ""));
    const [defaultValue, setDefaultValue] = useState<Product>(new Product(0, "", 0, "", 0, ""));
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<eCommerceApiResponse>();

    useEffect(() => {
        const fetchData = async () => {
            getUser();
            if (id === undefined) {
                console.log("no id pulled by use params");
                return;
            }
            try {
                const result = await apiGetProductById(parseInt(id));
                setProduct(result.payload)
                setDefaultValue({ ...result.payload })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id]);


    async function getUser() {
        let usr = await apiGetCurrentUser();
        setUser(usr);
    }


    const deleteProduct = async () => {
        if (id === undefined) {
            console.log("no id pulled by use params");
            return;
        }
        try {
            const result = await apiDeleteProduct(parseInt(id));

            if (result.status === 200) {
                console.log("item deleted");
                navigate("/admin/products/1")
                return;
            }
            else {
                console.log("error " + result.status)
                return;
            }

        } catch (error) {
            console.log(error)
        }


    }

    const updateProduct = async () => {

        if (id === undefined) {
            console.log("no id pulled by use params");
            return;
        }

        console.log(product)

        try {
            await apiUpsertProduct(product);
            setDefaultValue({ ...product })


        } catch (error) {
            console.log(error);
        }
    }

    if (user === undefined || user.payload.admin != true) {
        return <h1>Unauthorized</h1>
    }



    if (id === undefined || product === undefined) {
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "center"
                }}
                >
                    <Paper elevation={3}>
                        <br />
                        <h1>This item dose not Exist</h1>
                    </Paper>
                </Box>
            </>
        );
    }

    else {
        console.log(defaultValue)
        return (
            <>
                <br />
                <Box>
                    <Container maxWidth="md">
                        <Paper elevation={3}>
                            <Grid container spacing={0} justify="flex-end">
                                <Button variant="contained" onClick={() => { navigate("/admin/products"); }}> Back to Products </Button>
                            </Grid>
                            <Grid container spacing={0} direction="column" alignItems="center" justify="center">

                                <Typography variant="h3">{defaultValue.name}</Typography>
                                <img src={defaultValue.image} alt={defaultValue.name} height="250px" />
                                <Typography variant="h4">${defaultValue.price}.00</Typography>
                                <Typography variant="h5">{defaultValue.description}</Typography>
                                <br />
                                <br />
                                <br />

                                <TextField
                                    defaultValue={defaultValue.name}
                                    required
                                    label="Product Name"
                                    onChange={(event) => { setProduct({ ...product, "name": event.target.value }) }}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.image}
                                    required
                                    label="Product Image URL"
                                    onChange={(event) => { setProduct({ ...product, "image": event.target.value }) }}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.description}
                                    required
                                    label="Product Description"
                                    onChange={(event) => { setProduct({ ...product, "description": event.target.value }) }}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.price}
                                    type="number"
                                    required
                                    label="Product Price"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setProduct({ ...product, "price": event.target.valueAsNumber }) }}
                                />
                                <br /><br />
                            </Grid>
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Button variant="contained" onClick={updateProduct}> Update </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button variant="contained" onClick={deleteProduct}> Delete </Button>
                            </Grid>
                        </Paper>
                    </Container>
                </Box>
            </>
        );
    }
}