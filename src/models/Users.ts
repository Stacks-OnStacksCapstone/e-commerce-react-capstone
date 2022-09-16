export default class Users {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isActive: boolean;

    constructor(id: number, email: string, firstName: string, lastName: string, isAdmin: boolean, isActive: boolean){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
    }
}