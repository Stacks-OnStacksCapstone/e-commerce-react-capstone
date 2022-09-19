import { createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { apiLogin, apiLogout } from "../../remote/e-commerce-api/authService";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  async function logout() {
    await apiLogout();
  }


  return (
    <ThemeProvider theme={theme}>
        <button onClick={logout}>Logout</button>
    </ThemeProvider>

  );
}