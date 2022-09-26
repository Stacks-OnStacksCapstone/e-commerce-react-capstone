import {render, screen, cleanup } from '@testing-library/react'
import UserProfile from '../components/user/UserProfile';
import { apiLogin } from '../remote/e-commerce-api/authService';
import { apiUpdateUser } from '../remote/e-commerce-api/UserService';



it('Should render User Profile component', async () => {
    
    //Login and view a profile to update
    const user = await apiLogin("foxthe4th@gmail.com", "Password@123");
    const updatedUser = await apiUpdateUser("Pitmon", "Foxall IV", "Password@123" );

    
})


