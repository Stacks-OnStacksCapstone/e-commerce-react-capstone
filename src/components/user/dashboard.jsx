import { useEffect, useState } from "react";
import eCommerceClient from "../../remote/e-commerce-api/eCommerceClient";

export default function Dashboard(){

    const [user, setUser] = useState()
    const [persisted, setPersisted] = useState()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password:""
    });


    useEffect(() => {
        console.log("effect invoked");
        findAll();
    }, []);

    async function update(event) {
        event.preventDefault();
        try{
            await eCommerceClient.put("/user", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                
            });
            setPersisted(`You successfully updated your profile!`);
            findAll();
            
        } catch (error) {
            setPersisted(`Update was unsuccessful because ${error.response.data}`);
        }
    }

    async function deactivateUser(userId) {
        try {
            await eCommerceClient.put("/user/deactivate");
            console.log(user);
            setPersisted(`You successfully deactivated your profile!`);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function findAll() {
        try {
            const response = await eCommerceClient.get("/user");
            setUser(response.data);
            setFormData({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                password:response.data.password,
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
                class="registration" 
                placeholder="First"
                value={formData.firstName}
                onChange={(event) => setFormData({ ...formData, firstName: event.target.value})} 
            />
            <br/>

            <label>Last Name:</label>
            <input 
                class="registration" 
                placeholder="Last"
                value={formData.lastName}
                onChange={(event) => setFormData({ ...formData, lastName: event.target.value})} 
            />
            <br/>

            <label>Password:</label>
            <input 
                class="registration" 
                type="password"
                placeholder="password"
                onChange={(event) => setFormData({ ...formData, password: event.target.value})} 
            />
            <br/>
            <br/>
            
            <button onClick={update}>Update</button>
        </form>
        {persisted === undefined ? <p>Please make selections</p> : <p>{persisted}</p>}
        <button onClick= {() => deactivateUser(user.userId)}>Deactivate</button>
        </>
    );
}