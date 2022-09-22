import { Refresh } from "@material-ui/icons";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import ProductReview from "../../models/ProductReview";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { apiGetAllReviewsForProduct, apigetProductAverageScore, apigetProductByScore } from "../../remote/e-commerce-api/productReviewService";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import { ReviewCard } from "./ReviewCard";



export default function ReviewPage(){
    const [reviews, setReviews] = useState<ProductReview[]>([])
    const [product, setProduct] = useState<Product>(new Product(0,"",0,"",0,""))
    const {id} = useParams();
    const [user, setUser] = useState<any>();
    const [avrRating, setAvrRating] = useState<number>();
    const [rating, setRating] = useState<number>();
    

    useEffect(() =>{
        getUser();
        getProduct();
        getProductAverageScore();
        if(rating===undefined){getAllReviewsForProduct()}
        else if(rating<0&&rating>6){
            getReviewsbyRating();
        }
        else {
            getAllReviewsForProduct();
        }
    },[rating])

    async function getUser() {
        const resp = await apiGetCurrentUser();
        setUser(resp.payload);
    }

    async function getProduct() {
        if(id===undefined){
            console.log("no id pulled by use params");
            return;}
        try {
            const result = await apiGetProductById(parseInt(id))
            setProduct(result.payload)
        }
        catch (error){
            console.log(error)
        }
    }

    async function getAllReviewsForProduct(){
        if(id===undefined){
            console.log("no id pulled by use params");
            return;}
        try {
            const result = await apiGetAllReviewsForProduct(parseInt(id))
            setReviews(result.payload)
        }
        catch (error){
            console.log(error)
        }
    }
    async function reviewsReset(){
        getAllReviewsForProduct()
        setRating(0);
    }

    async function getReviewsbyRating() {
        if(id===undefined||rating===undefined){
            console.log("no id pulled by use params or rating is undifined");
            return;}
        try {
            const result = await apigetProductByScore(parseInt(id),rating)
            setReviews(result.payload)
        }
        catch (error){
            console.log(error)
        }
    }
    
    async function getProductAverageScore(){
        if(id===undefined){
            console.log("no id pulled by use params");
            return;}
        try {
            const result = await apigetProductAverageScore(parseInt(id))
            setAvrRating(result.payload);
            console.log(result.payload);
            console.log("avr = "+avrRating);
        }
        catch (error){
            console.log(error)
        }
    }

    let reviewsMap = <Typography>Loading reviews...</Typography>;

    if (reviews !== undefined) {
        reviewsMap = <Typography>No reviews..</Typography>;
        if (reviews.length > 0) {
            for (let index = 0; index < reviews.length; index++) {
                reviewsMap = <ReviewCard review={reviews[index]} key={index} refreshReviews={reviewsReset}/>;   
            }            
        }
    }
    
    function getAvr(){
        return avrRating;
    }



    console.log("avr = "+avrRating);
    return(
        <>
            <Card sx={{ width: 345, margin: 2 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt="product image" 
                />
                <CardContent>
                    <Grid container spacing={0}>
                    <Grid item>
                        <Typography variant="h5">
                        {product.name}
                        </Typography>
                        <Rating name="disabled" value={getAvr()} disabled />
                    </Grid>
                    <Grid item xs>
                        <Grid container direction="row-reverse">
                        <Typography variant="subtitle1" align="right">
                            ${product.price.toFixed(2)}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Typography variant="body2">
                    {product.description}
                    </Typography>
                </CardContent>
            </Card>


            <Typography>{reviewsMap}</Typography>
        </>
        
    )
    
}