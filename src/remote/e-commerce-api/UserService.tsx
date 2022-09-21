
import User from "../../models/User";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/user"

export const apiGetProfile = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data };
}


export const apiDeactivateUser = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}/deactivate`
    );
    return { status: response.status, payload: response.data };
}


export const apiUpdateUser = async (firstName: String, lastName:String, password: String): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}`, {
            firstName: firstName,
            lastName: lastName,
            password: password,
            
        }
    );
    return { status: response.status, payload: response.data };
}

