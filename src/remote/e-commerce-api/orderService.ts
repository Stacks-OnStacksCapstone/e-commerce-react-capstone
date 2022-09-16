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