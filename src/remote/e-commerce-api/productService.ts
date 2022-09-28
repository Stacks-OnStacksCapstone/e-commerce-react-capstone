import Product from "../../models/Product";
import addAuthToken from "./addAuthHeader";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/product"

export const apiGetAllProducts = async (): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiGetProductById = async (id: number): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiGetProductByKeyword = async (keyword:String): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `${baseURL}/search/${keyword}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiUpsertProduct = async (product: Product): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.put<any>(
        `${baseURL}`,
        product
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiPurchase = async (products: {id: number, quantity: number}[]): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.patch<any>(
        `${baseURL}`,
        products
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiDeleteProduct = async (id: number): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.delete<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}