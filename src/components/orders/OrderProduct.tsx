import { Typography, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";

export default function OrderProduct(props : any) {
    const [productInfo, setProductInfo] = useState<Product>(new Product(0, "", 0, "", 0, ""));
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await apiGetProductById(props.product);
            setProductInfo(response.payload);
            console.log(productInfo);

        }
        fetchResponse();
        console.log(props);
   }, [])
    return(
        <>

                {/*<CardMedia
                        component="img"
                        height="140"
                        width="140"
                        image={productInfo.image}
                        alt={productInfo.name}
                        loading="lazy"
    style={{marginRight:"15px", width: "140px", objectFit:"cover"}} />*/}
                <Typography>{productInfo.name}</Typography>
        </>
    )
    }