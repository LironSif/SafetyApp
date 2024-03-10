import React from "react";
import logo from "../../assets/logo/techh.jpeg";
import { NavbarContainer, Logo, List, ListItem, Avatar, StyledLink } from './NavbarStyled'; // Ensure imports are correct

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

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
          {/* Assuming 'user' object contains a 'name' property */}
          <ListItem>{`Hi, ${user.user.name}`}</ListItem> {/* Use 'user.name' to display the user's name */}
          <ListItem onClick={logout}>Logout</ListItem>
        </List>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
