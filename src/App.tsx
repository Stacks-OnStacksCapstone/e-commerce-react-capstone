import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
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
  const [toggle, setToggle] = useState(false);

  return (
    <ThemeProvider theme={ window.localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme }>
      <CssBaseline />
      <CartContext.Provider value={value}>
      <RefreshContext.Provider value={{toggle: toggle, setToggle: setToggle}}>
        <Router>
          <Navbar/>
          <AppRoutes></AppRoutes>
        </Router>
      </RefreshContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
