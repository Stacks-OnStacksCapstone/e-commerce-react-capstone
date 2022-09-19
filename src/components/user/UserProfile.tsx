import { useEffect, useState } from "react";
import eCommerceClient from "../../remote/e-commerce-api/eCommerceClient";
import { apiDeactivateUser, apiGetProfile, apiUpdateUser } from "../../remote/e-commerce-api/UserService";
import User from "../../models/User";
import { apiLogout } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){


    const [user, setUser] = useState<User>()
    const [persisted, setPersisted] = useState<String>();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password:""
    });
    const navigate = useNavigate();



    useEffect(() => {
        console.log("effect invoked");
        getProfile();
    }, []);

    async function update(event: { preventDefault: () => void; }) {
        event.preventDefault();
        try{
            await apiUpdateUser(formData.firstName, formData.lastName, formData.password);
            
            setPersisted("You successfully updated your profile!");
            getProfile();
            
        } catch (error :any) {
            setPersisted(`Update was unsuccessful because ${error.payload}`);
        }
    }

    async function deactivateUser() {
        try {
            
            await apiDeactivateUser();
            await apiLogout();
            navigate('/login');
            console.log(user);
            setPersisted(`You successfully deactivated your profile!`);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function getProfile() {
        try {
            const result = await apiGetProfile()
            setUser(result.payload);
            setFormData({
                firstName: result.payload.firstName,
                lastName: result.payload.lastName,
                password:result.payload.password,
            });   
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Welcome to your Dashboard, dear {user?.firstName}!</h1>
            <p>
                Here you can update your profile:
            </p>
            <form>

            <label>First Name:</label>
            <input
                placeholder="First"
                value={formData.firstName}
                onChange={(event) => setFormData({ ...formData, firstName: event.target.value})} 
            />
            <br/>

            <label>Last Name:</label>
            <input 
                placeholder="Last"
                value={formData.lastName}
                onChange={(event) => setFormData({ ...formData, lastName: event.target.value})} 
            />
            <br/>

            <label>Password:</label>
            <input 
                type="password"
                placeholder="password"
                onChange={(event) => setFormData({ ...formData, password: event.target.value})} 
            />
            <br/>
            <br/>
            
            <button onClick={update}>Update</button>
        </form>
        {persisted === undefined ? <p>Please make selections</p> : <p>{persisted}</p>}
        <button onClick= {() => deactivateUser()}>Deactivate</button>
        </>
    );
}