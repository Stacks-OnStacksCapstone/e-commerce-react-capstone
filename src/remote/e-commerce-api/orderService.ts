import Address from "../../models/Address";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/order/history"

export const apiGetAllUserOrders = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return{ status: response.status, payload: response.data };
}

export const apiGetOrderDetails = async (id: any) : Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `/api/orderdetail/order/${id}`
    );
    return{ status: response.status, payload: response.data };
}

export const apiCreateOrder = async (paymentId : string, addressInfo : Address) : Promise<eCommerceApiResponse> => {
    const shipmentAddress : string = `${addressInfo.address1}, ${addressInfo.city}, ${addressInfo.state}, ${addressInfo.zip}, ${addressInfo.country}`;
    const requestBody : any = {
        "paymentId" : paymentId,
        "shipmentAddress" : shipmentAddress
    }
    const response = await eCommerceClient.post<any>(
        `/api/order`,
        requestBody
    );
    return{ status: response.status, payload: response.data};
}

export const apiGetOrderById = async (orderId : number) : Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `/api/order/${orderId}`
    );
    return{ status: response.status, payload: response.data};
}