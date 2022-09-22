import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/auth"

export const apiLogin = async (email: string, password: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/login`,
        { email: email, password: password }
    );
    return { status: response.status, payload: response.data };
}

export const apiGetCurrentUser = async (): Promise<eCommerceApiResponse> => {
    try {
        const response = await eCommerceClient.get<any>(
            `${baseURL}`
        );
        
        return { status: response.status, payload: response.data };
    } catch (error: any) {
        return { status: error.response.status, payload: null };
    }
}

export const apiLogout = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/logout`
    );
    return { status: response.status, payload: response.data };
}

export const apiRegister = async (firstName: string, lastName: string, email: string, password: string): Promise<eCommerceApiResponse> => {
    console.log({firstName: firstName, lastName: lastName, email: email, password: password})
    const response = await eCommerceClient.post<any>(
        `/user`,
        {email: email, password: password, firstName: firstName, lastName: lastName}
    );
    return { status: response.status, payload: response.data };
}

export const apiForgotPassword = async (email: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}/forgot-password`,
        { email: email }
    );
    return { status: response.status, payload: response.data };
}

export const apiVerifyToken = async (token: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/reset-password/${token}`
    );
    return { status: response.status, payload: response.data };
}

export const apiResetPassword = async (token: string, password: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}/reset-password/${token}`,
        { password: password }
    );
    return { status: response.status, payload: response.data };
}