
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Product from "../../models/Product"
import { apiDeleteProduct, apiGetProductById, apiUpsertProduct } from "../../remote/e-commerce-api/productService"
import Navbar from "../navbar/Narbar"


export const EditProductPage = () => {

    const [product, setProduct] = useState<Product>(new Product(0,"",0,"",0,""));
    const [defaultValue, setDefaultValue] =useState<Product>(new Product(0,"",0,"",0,""));
    const navigate = useNavigate();
    const {id} = useParams();




    useEffect(() => {
        const fetchData = async () => {
            if (id === undefined){
                console.log("no id pulled by use params");
                return;
            }
            try {
                const result = await apiGetProductById(parseInt(id));
                setProduct(result.payload)
                setDefaultValue({...result.payload})
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        }, [id]);



    const deleteProduct = async () => {
        if (id === undefined){
            console.log("no id pulled by use params");
            return;
        }
        try {
            const result = await apiDeleteProduct(parseInt(id));
            
            if (result.status === 200){
                console.log("item deleted");
                navigate("/admin/products/1")
                return;
            }
            else{
                console.log("error "+result.status)
                return;
            }
            
        } catch (error) {
            console.log(error)
        }
        
        
    }

    const updateProduct= async () => {

        if (id === undefined){
            console.log("no id pulled by use params");
            return;
        }

        console.log(product)

        try {
            await apiUpsertProduct(product);
            setDefaultValue({...product})
            
            
        } catch (error) {
            console.log(error);
        }
    }
    

    if (id === undefined || product === undefined){
        return(
            <>
                <Navbar/>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap' ,
                    justifyContent: "center"
                }}
                >
                    <Paper elevation={3}>
                        <br/>
                        <h1>This item dose not Exist</h1>
                    </Paper>
                </Box>
            </>
        );
    }

    else{
    console.log(defaultValue)
        return(
            <>
            <Navbar/>
            <br />
                <Box>
                    <Container maxWidth="sm">
                        <Paper elevation={3}>
                            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                            
                                <Typography variant="h1">{defaultValue.name}</Typography>
                                <img src={defaultValue.image} alt={defaultValue.name} height="250px"/>
                                <Typography variant="h2">${defaultValue.price}.00</Typography>
                                <Typography variant="h3">{defaultValue.description}</Typography>
                                

                                <TextField
                                    defaultValue={defaultValue.name}
                                    required
                                    label="Product Name"
                                    onChange={(event)=>{setProduct({...product,"name": event.target.value})}}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.image}
                                    required
                                    label="Product Image URL"
                                    onChange={(event)=>{setProduct({...product,"image": event.target.value})}}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.description}
                                    required
                                    label="Product Discription"
                                    onChange={(event)=>{setProduct({...product,"description": event.target.value})}}
                                />
                                <br /><br />
                                <TextField
                                    defaultValue={defaultValue.price}
                                    type="number"
                                    required
                                    label="Product Price"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setProduct({...product,"price": event.target.valueAsNumber})}}
                                />
                                <br /><br />
                                <Button variant="contained" onClick={updateProduct}> Update </Button>
                                <br /><br />
                                <Button variant="contained" onClick={deleteProduct}> Delete </Button>
                                <br /><br />
                            </Grid>
                        </Paper>
                    </Container>
                </Box>
            </>
        );
    }
}