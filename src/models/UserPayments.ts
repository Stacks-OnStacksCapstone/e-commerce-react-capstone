export default class UserPayments{

    id: string;
    expDate: Date;
    ccv: string;
    cardNumber: string;

    constructor(paymentId: string, expDate: Date, ccv:string, cardNumber:string){
                    this.id = paymentId;
                    this.expDate = expDate;
                    this.ccv = ccv;
                    this.cardNumber = cardNumber;
        
    }
}