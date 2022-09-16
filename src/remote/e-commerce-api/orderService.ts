import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/order/history"

export const apiGetAllUserOrders = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return{ status: response.status, payload: response.data };
}