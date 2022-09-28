import PaymentDetail from "../../models/PaymentDetail"
import UserPayments from "../../models/UserPayments"
import addAuthToken from "./addAuthHeader";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient"

const baseURL = "/api/payment"

export const apiCreatePayment = async (paymentDetails : PaymentDetail[]) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const requestBody : any = {
        "ccv" : paymentDetails[0].detail,
        "expDate" : paymentDetails[3].detail,
        "cardNumber" : paymentDetails[2].detail
    }
    const response = await eCommerceClient.post(
        `${baseURL}`,
        requestBody
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiCreatePaymentMethod = async (ccv: String, expDate: Date, cardNumber: String  ) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const requestBody : any = {
        "ccv" : ccv,
        "expDate" : expDate,
        "cardNumber" : cardNumber
    }
    const response = await eCommerceClient.post(
        `${baseURL}`,
        requestBody
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}

export const apiDeletePayment = async (paymentId: String) : Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.delete(
        `${baseURL}?paymentId=${paymentId}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };

}

export const apiGetAllUserPaymentMethods = async (): Promise<eCommerceApiResponse> => {
    addAuthToken();
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data, headers: response.headers };
}
