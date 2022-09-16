import Users from "../../models/Users";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/product"

export const apiGetAllUserOrders = async (user: Users): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return{ status: response.status, payload: response.data };
}