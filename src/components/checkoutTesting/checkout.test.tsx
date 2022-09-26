import { render } from "@testing-library/react"
import { apiLogin } from "../../remote/e-commerce-api/authService"
import Checkout from "../checkout/Checkout"


test('grabs address, payment, and order for User', async () => {
    const user = await apiLogin("rc@mail.com", "12345")
    const address = JSON.parse(`[
        {
            "firstName": "valid",
            "lastName": "valid",
            "address1": "valid",
            "address2": "",
            "city": "valid",
            "state": "valid",
            "zip": "12345"
            "country": "valid"
        }
    ]`)
    const payment = JSON.parse(`[
        {
            "cardName": "valid",
            "cardNumber": "1234567890123456",
            "expDate": "2000-10-10",
            "ccv": "123"
        }
    ]`)
    render(<Checkout key={0} />)
})