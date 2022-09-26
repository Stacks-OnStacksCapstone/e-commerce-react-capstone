import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from "../dark-mode/useDarkMode";
import Toggler from "../dark-mode/Toggler";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { RefreshContext } from "../../context/refresh.context";
import Logout from "../logout/logout";
import { UserContext } from "../../context/user.context";
import SearchbarProducts from "../display-products/SearchbarProducts";


const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0C486B;
  height:70px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
`;


const Navbar = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);  //userContext added
  const navigate = useNavigate();

  // async function getUser() {                   //We dont need the getUser and useEffect methods, since we are using userContext to get the current user
  //   let user = await apiGetCurrentUser();
  //   setUser(user);
  // }

  // useEffect(() => {
  //   getUser();
  // }, [user]);
  const {toggle, setToggle} = useContext(RefreshContext)

  async function getUser() {
    let usr = await apiGetCurrentUser();
    console.log("user:", usr);
    setUser(usr.payload);
  }

  useEffect(() => {
    getUser();
  }, [toggle]);



  // const [theme, setTheme] = useState('light');
  // const themeToggler = () => {
  // theme === 'light' ? setTheme('dark') : setTheme('light')
  // }

  const [theme, themeToggler] = useDarkMode();

  const cartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }
    return total;
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => { navigate('/') }}>
            <img className="congoLogo" src="/congo-logo.png" alt="The Congo logo" />
          </Logo>
        </Left>
        <Right>
        <Toggler theme={theme} toggleTheme={themeToggler} />
          {!(user === undefined || user === null || user.admin != true) && <MenuItem onClick={() => { navigate('/admin/products') }}><strong>EDIT PRODUCTS</strong></MenuItem>}
          {(user !== undefined && user !== null) ?
            (<>
              <MenuItem onClick={() => { navigate('/userProfile') }}><strong>PROFILE</strong></MenuItem>
              <MenuItem onClick={() => { navigate('/orders') }}><strong>ORDERS</strong></MenuItem>
              <Logout></Logout>
            </>) :
            (<><MenuItem onClick={() => { navigate('/register') }}><strong>REGISTER</strong></MenuItem>
              <MenuItem onClick={() => { navigate('/login') }}><strong>SIGN IN</strong></MenuItem></>)}
          <MenuItem onClick={() => { navigate('/cart') }}>
            <Badge badgeContent={cartTotal()} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
