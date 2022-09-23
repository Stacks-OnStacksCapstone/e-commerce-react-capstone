export default class UserPayments{

    paymentId: number;
    expDate: Date;
    ccv: string;
    cardNumber: string;

    constructor(paymentId: number, expDate: Date, ccv:string, cardNumber:string){
                    this.paymentId = paymentId;
                    this.expDate = expDate;
                    this.ccv = ccv;
                    this.cardNumber = cardNumber;
        
    }
}