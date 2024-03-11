// Navbar.js
import React from "react";
import { useAuth } from "../../context/AuthContext.jsx"; 
import logo from "../../assets/logo/techh.jpeg";
import { NavbarContainer, Logo, List, ListItem, Avatar, StyledLink } from './NavbarStyled';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <NavbarContainer>
      <Logo>
        <StyledLink to="/">Sifi Login</StyledLink>
      </Logo>
      {user ? (
        <List>
          <ListItem>
            <Avatar src={logo} alt="Tech Logo" />
          </ListItem>
          <ListItem>{`Hi, ${user.email}`}</ListItem>
          <ListItem onClick={logout} style={{ cursor: 'pointer' }}>
            Logout
          </ListItem>
        </List>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
