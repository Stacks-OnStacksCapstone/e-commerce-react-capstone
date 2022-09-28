import Address from "../../models/Address";
import addAuthToken from "./addAuthHeader";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/order/history"

export const apiGetAllUserOrders = async (): Promise<eCommerceApiResponse> => {
    try {
        addAuthToken();
        const response = await eCommerceClient.get<any>(
            `${baseURL}`
        );
        return { status: response.status, payload: response.data, headers: response.headers };
    } catch(error) { console.log(error); 
        return{ status: 401, payload: null, headers: {} };
    }
}

export const apiGetOrderDetails = async (id: any) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `/api/orderdetail/order/${id}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiCreateOrder = async (paymentId : string, addressInfo : Address) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const shipmentAddress : string = `${addressInfo.address1}, ${addressInfo.city}, ${addressInfo.state}, ${addressInfo.zip}, ${addressInfo.country}`;
    const requestBody : any = {
        "paymentId" : paymentId,
        "shipmentAddress" : shipmentAddress
    }
    const response = await eCommerceClient.post<any>(
        `/api/order`,
        requestBody
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiGetOrderById = async (orderId : number) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `/api/order/${orderId}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}