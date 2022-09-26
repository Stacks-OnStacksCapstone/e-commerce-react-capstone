export default class UserPayments{

    id: String;
    expDate: Date;
    ccv: string;
    cardNumber: string;

    constructor(paymentId: String, expDate: Date, ccv:string, cardNumber:string){
                    this.id = paymentId;
                    this.expDate = expDate;
                    this.ccv = ccv;
                    this.cardNumber = cardNumber;
        
    }
}