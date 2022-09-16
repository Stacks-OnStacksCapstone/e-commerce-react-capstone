export default class OrderDetail {
    id : number
    ordersId : number
    productId : number
    quantity: number

    constructor(
        id : number,
        ordersId : number,
        productId : number,
        quantity : number
    ) {
        this.id = id,
        this.ordersId = ordersId;
        this.productId = productId;
        this.quantity = quantity;
    }
}