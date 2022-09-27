import {render, screen } from '@testing-library/react'
import UserProfile from '../components/user/UserProfile';
import { apiLogin } from '../remote/e-commerce-api/authService';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('Should render User Profile component', async () => {
    
    //Login and view a profile to update
    const loginUser = await apiLogin("foxthe4th@gmail.com", "Password@123");
     

    render(<UserProfile />);
    const updateMenu = screen.getByText("Welcome to Your Dashboard, ", {exact:false});
    expect(updateMenu).toBeInTheDocument();
});


