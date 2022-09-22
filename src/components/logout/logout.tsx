import { createTheme, ThemeProvider } from "@material-ui/core";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiLogin, apiLogout } from "../../remote/e-commerce-api/authService";

const theme = createTheme();

export default function Logout() {
  const navigate = useNavigate();

  async function logout() {
    try{
    await apiLogout();
    navigate('/login');
    
  } catch (error) {
    console.log(error);
  }
}


  return (
        <MenuItem style={{fontSize: "14px", cursor: "pointer", marginLeft: "25px"}} onClick={logout}>LOGOUT</MenuItem>
  );
}

