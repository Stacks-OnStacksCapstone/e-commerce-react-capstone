
export default class Order {
    orderId: number;
    paymentId: number;
    orderDate: string;
    shipmentAddress: string;

    constructor(
        orderId: number,
        paymentId: number,
        orderDate: string,
        shipmentAddress: string
    ){
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.orderDate = orderDate;
        this.shipmentAddress = shipmentAddress;
    }
}