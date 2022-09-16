export default class OrderDetail {
    id : number
    orderId : number
    productId : number
    quantity: number

    constructor(
        id : number,
        orderId : number,
        productId : number,
        quantity : number
    ) {
        this.id = id,
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
}