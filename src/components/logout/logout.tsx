import { createTheme, ThemeProvider } from "@material-ui/core";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RefreshContext } from "../../context/refresh.context";
import { apiLogin, apiLogout } from "../../remote/e-commerce-api/authService";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

const theme = createTheme(); 

export default function Logout() {
  
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const {toggle, setToggle} = useContext(RefreshContext)

  async function logout() {
    try{
    await apiLogout();
    setUser(undefined);  // Unsetting user globally in userContext after user logs out.
    setCart([]);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setToggle(!toggle);
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
}


  return (
        <MenuItem style={{fontSize: "14px", cursor: "pointer", marginLeft: "25px"}} onClick={logout}><strong>LOGOUT</strong></MenuItem>
  );
}

