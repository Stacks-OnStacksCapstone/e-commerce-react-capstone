
export default class Order {
    id: number;
    paymentId: number;
    orderDate: string;
    shipmentAddress: string;

    constructor(
        id: number,
        paymentId: number,
        orderDate: string,
        shipmentAddress: string
    ){
        this.id = id;
        this.paymentId = paymentId;
        this.orderDate = orderDate;
        this.shipmentAddress = shipmentAddress;
    }
}