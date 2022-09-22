import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { UserContext } from './context/user.context';
import User from './models/User';
import { RefreshContext } from './context/refresh.context';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };
  const [user, setUser] = useState<User | undefined>(undefined); //user state added
  const userContext = { user, setUser };                         //UserContext added
  const [toggle, setToggle] = useState(false);

  //userContextProvider added to be able to use the userContext in all components.
  return (
    <ThemeProvider theme={ window.localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme }>
      <CssBaseline />
      <CartContext.Provider value={value}>
      <RefreshContext.Provider value={{toggle: toggle, setToggle: setToggle}}>
      <UserContext.Provider value={userContext}>
        <Router>
          <Navbar/>
          <AppRoutes></AppRoutes>
        </Router>
      </UserContext.Provider>
      </RefreshContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
