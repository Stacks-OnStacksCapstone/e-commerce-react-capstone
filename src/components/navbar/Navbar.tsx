import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
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
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<eCommerceApiResponse>();
  
  async function getUser() {
    let usr = await apiGetCurrentUser();
    setUser(usr);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo onClick={() => {navigate('/')}}>Revature Swag Shop</Logo>
        </Left>
        <Right>
          {!(user === undefined || user.payload.admin != true) && <MenuItem onClick={() => {navigate('/admin/products')}}>EDIT PRODUCTS</MenuItem>}
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {navigate('/login')}}>SIGN IN</MenuItem>
          <MenuItem onClick={() => {navigate('/cart')}}>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
