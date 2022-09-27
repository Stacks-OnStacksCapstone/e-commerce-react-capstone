import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/orderdetail";

export const apiCreateOrderDetail = async (requestBody : any) : Promise<eCommerceApiResponse> => {
    const response : any = await eCommerceClient.post(
        `${baseURL}`,
        requestBody
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}