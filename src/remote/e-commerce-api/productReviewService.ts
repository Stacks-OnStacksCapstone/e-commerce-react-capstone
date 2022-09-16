import Product from "../../models/Product";
import ProductReview from "../../models/ProductReview";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/productreview"

export const apiGetAllReviews = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<ProductReview>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data };
}

export const apiGetAllReviewsForProduct = async (productId: number): Promise<eCommerceApiResponse> => {
    try {
        const response = await eCommerceClient.get<ProductReview>(
            `${baseURL}/${productId}`
        );
        return { status: response.status, payload: response.data };
    }
    catch (error) {
        console.log(error);
    }

    return { status: 0, payload: null };
}

export const apiUpsertProductReview = async (productRequest: any): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}`, productRequest
    );
    return { status: response.status, payload: response.data };
}

export const apiDeleteProductReview = async (reviewId: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<ProductReview>(
        `${baseURL}/${reviewId}`
    );
    return { status: response.status, payload: response.data };
}