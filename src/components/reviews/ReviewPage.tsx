import { ConstructionOutlined } from "@mui/icons-material";
import { Alert, Button, Grid, Rating, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../models/Product";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { apicanPost, apiGetAllReviewsForProduct, apigetProductAverageScore, apigetProductByScore, apiUpsertProductReview } from "../../remote/e-commerce-api/productReviewService";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import { ReviewCard } from "./ReviewCard";



class ProductRequest {
    id: number;
    rating: number;
    comment: string;
    postId: number;
  
    constructor(rating: number, comment: string, postId: number) {
      this.id = 0;
      this.rating = rating;
      this.comment = comment;
      this.postId = postId;
    }
  }


export default function ReviewPage(){
    const [reviews, setReviews] = useState<eCommerceApiResponse>()
    const [product, setProduct] = useState<Product>(new Product(0,"",0,"",0,""))
    const [newReview, setNewReview] = useState<ProductRequest>(new ProductRequest(0, "", product.id));    

    const [open, setOpen] = useState(false);
    const [persisted, setPersisted] = useState<String>();
    
    const {id} = useParams();
    const [user, setUser] = useState<any>();
    const [avrRating, setAvrRating] = useState<number>();
    const [rate, setRate] = useState<number | null>();
    const navigate = useNavigate();

    

    useEffect(() =>{
        
        getUser();
        getProduct();
        getProductAverageScore();
        if(rate===undefined||rate===null){
            getAllReviewsForProduct()
        }
        else if(rate>0&&rate<6){
            getReviewsbyRating();
        }
        else {
            getAllReviewsForProduct();
        }
    },[rate])

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
            setReviews(result)
        }
        catch (error){
            console.log(error)
        }
    }
    async function reviewsReset(){
        getAllReviewsForProduct()
        setRate(-1);
    }

    async function getReviewsbyRating() {
        if(id===undefined||rate===undefined||rate===null){
            console.log("no id pulled by use params or rating is undifined");
            return;}
        try {
            const result = await apigetProductByScore(parseInt(id),rate)
            setReviews(result)
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
        }
        catch (error){
            console.log(error)
        }
    }

    async function onSubmitReview() {
        try {
            if(await (await apicanPost(product.id,user.userId)).payload){
                await apiUpsertProductReview(newReview);
                let reviews = await apiGetAllReviewsForProduct(product.id);
                setReviews(reviews);
                setNewReview(new ProductRequest(0, "", product.id));
                setRate(-2)
            }else{
                setOpen(true);
                setPersisted("You may only post one review")
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    let reviewsMap = <Typography>Loading reviews...</Typography>;

    if (reviews !== undefined) {
        reviewsMap = <Typography>No reviews found..</Typography>;
        if (reviews.payload.length > 0) {
            reviewsMap = reviews.payload.slice(0).reverse().map((o: any, index: number) => {
                return <ReviewCard review={o} key={index} refreshReviews={reviewsReset} />
            });
        }
    }

    if(avrRating!==undefined)
    return(
       
        <>
            <Button style={{ margin: "20px" }} variant="contained" onClick={() => { navigate("/"); }}> Back to Products </Button>
            <br />
 
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <Grid container justifyContent="center" alignItems="center">
                        <img src={product.image} height={"50%"} width={"50%"} alt="product.name"/>
                    </Grid>
                </Grid>

                <Grid item xs={6} padding={1} justifyContent="center" alignItems="center">
                    <Typography variant="h4" align="center">Leave a Review</Typography>
                    <Rating name="rating" value={newReview.rating} onChange={((event: React.SyntheticEvent<Element, Event>, value: number | null) => { if (value !== null) setNewReview({ ...newReview, rating: value, postId: product.id}) })} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Product Review"
                        multiline
                        fullWidth
                        minRows={8}
                        maxRows={8}
                        value={newReview.comment}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewReview({ ...newReview, comment: event.target.value, postId: product.id }) }}
                    />
                    <br /><br />
                    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                        <Button variant="contained" onClick={onSubmitReview}>
                            Submit Review
                        </Button>
                    </Grid>
                    
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {persisted}
                        </Alert>
                    </Snackbar>

                    <br />
                </Grid>

                
            </Grid>


            <Grid container>

                <Grid item xs={6} padding={1} justifyContent="center" alignItems="center">
                    <Typography component="h1" variant="h4" align="center">
                        {product.name}
                    </Typography>
                    <Rating name="read-only" defaultValue={0} value={avrRating} readOnly />
                    <br />
                    <Typography gutterBottom>
                        {product.description}
                    </Typography>
                </Grid>
                
                <Grid item xs={6} padding={1} justifyContent="center" alignItems="center">
                    <Typography variant="h4" align="center">Product Reviews</Typography>
                    <Typography variant="h6" align="center">Sort Reviews</Typography>
                        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                            <Rating
                                name="simple-controlled"
                                value={rate}
                                onChange={(event, newValue) => {
                                    setRate(newValue);
                                }}
                            />
                        </Grid>
                    
                    <Grid container justifyContent="center" alignItems="center">
                        {reviewsMap}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
    else{return <></>}
    
}