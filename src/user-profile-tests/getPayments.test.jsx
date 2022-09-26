import UserPayments from "../models/UserPayments";
import { apiGetAllUserPaymentMethods } from "../remote/e-commerce-api/paymentService";


const payments = [
    {
        "id": "4",
        "ccv": "123",
        "expDate": 2023-12-12,
        "cardNumber": "1234123412341234"
    },
    {
        "id": "5",
        "ccv": "321",
        "expDate": 2023-10-10,
        "cardNumber": "4321432143214321"
    }
]

it('gets all payments', async () => {
    expect.assertions(1);
    const response = await apiGetAllUserPaymentMethods();
    expect(response.payload).toEqual(expect.arrayContaining(payments))
})