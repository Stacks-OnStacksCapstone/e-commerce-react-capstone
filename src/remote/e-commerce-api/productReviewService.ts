import Product from "../../models/Product";
import ProductReview from "../../models/ProductReview";
import addAuthToken from "./addAuthHeader";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/productreview"

export const apiGetAllReviews = async (): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<ProductReview>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiGetAllReviewsForProduct = async (productId: number): Promise<eCommerceApiResponse> => {
    try {
        addAuthToken();
        const response = await eCommerceClient.get<ProductReview>(
            `${baseURL}/${productId}`
        );
        return { status: response.status, payload: response.data, headers: response.headers };
    }
    catch (error) {
        console.log(error);
    }

    return { status: 500, payload: null, headers: {} };
}

export const apigetProductByScore = async (productId: number, rating: number): Promise<eCommerceApiResponse> =>{
    try{
        addAuthToken();
        const response = await eCommerceClient.get<ProductReview>(
            `${baseURL}/rate/${productId}/${rating}`
        )
        return { status: response.status, payload: response.data, headers: response.headers };
    }
    catch (error){
        console.log(error);
    }
    return { status: 500, payload: null, headers: {} };
}

export const apigetProductAverageScore = async (productId: number): Promise<eCommerceApiResponse> =>{
    try {
        addAuthToken();
        const response = await eCommerceClient.get<Number>(
            `${baseURL}/avr/${productId}`
        )
        return { status: response.status, payload: response.data, headers: response.headers };
    } catch (error) {
        console.log(error);
    }
    return { status: 500, payload: null, headers: {} };
}

export const apicanPost = async (productId: number,userId: number): Promise<eCommerceApiResponse> =>{
    try {
        addAuthToken();
        const response = await eCommerceClient.get<Boolean>(
            `${baseURL}/post/${productId}/${userId}`
        )
        return { status: response.status, payload: response.data, headers: response.headers };
    } catch (error) {
        console.log(error);
    }
    return { status: 500, payload: null, headers: {} };
}


export const apiUpsertProductReview = async (productRequest: any): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.put<any>(
        `${baseURL}`, productRequest
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiDeleteProductReview = async (reviewId: number): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.delete<ProductReview>(
        `${baseURL}/${reviewId}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}