export default class User{

    userId: number;
    email: string;
    firtName: string;
    lastName: string;
    isAdmin: boolean;
    isActive: boolean;

    constructor(userId: number, email: string, firstName:string, lastName:string, 
                isAdmin: boolean, isActive: boolean){
                    this.userId = userId;
                    this.email = email;
                    this.firtName = firstName;
                    this.lastName = lastName;
                    this.isAdmin = isAdmin;
                    this.isActive = isActive;
        
    }
}


