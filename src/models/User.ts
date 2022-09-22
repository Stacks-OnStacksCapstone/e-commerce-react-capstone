export default class User{

    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    active: boolean;

    constructor(userId: number, email: string, firstName:string, lastName:string, 
                isAdmin: boolean, isActive: boolean){
                    this.userId = userId;
                    this.email = email;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.admin = isAdmin;
                    this.active = isActive;
        
    }
}


