import { createTheme, ThemeProvider } from "@material-ui/core";
import { MenuItem, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshContext } from "../../context/refresh.context";
import { apiLogin, apiLogout } from "../../remote/e-commerce-api/authService";

const theme = createTheme();

export default function Logout() {
  const navigate = useNavigate();
  const {toggle, setToggle} = useContext(RefreshContext)

  async function logout() {
    try{
    await apiLogout();
    setToggle(!toggle);
    navigate('/login');
    
  } catch (error) {
    console.log(error);
  }
}


  return (
        <MenuItem style={{fontSize: "14px", cursor: "pointer", marginLeft: "25px"}} onClick={logout}>LOGOUT</MenuItem>
  );
}