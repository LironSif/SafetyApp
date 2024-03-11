import React from "react";
import logo from "../../assets/logo/techh.jpeg";
import { NavbarContainer, Logo, List, ListItem, Avatar, StyledLink } from './NavbarStyled';
import { useLogoutUserMutation, useCheckAuthStatusQuery } from '../../services/userApi'; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from '../../redux/slices/UserSlice'; // Adjust the path as necessary

const Navbar = () => {
  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();
  const { data: user } = useCheckAuthStatusQuery();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const logout = () => {
    logoutUser().unwrap()
      .then(() => {
        console.log(user); // This might still show the user data as it was before the logout mutation
        // navigate('/login'); // Redirect to the login page
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        // Optionally, provide user feedback here
      })
      .finally(() => {
        console.log("Logout process finished."); // Executed after either the try or catch block
      });
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
          <ListItem>{`Hi, ${user?.user?.email}`}</ListItem>
          <ListItem onClick={logout} style={{ cursor: 'pointer', opacity: isLogoutLoading ? 0.5 : 1 }}>
            {isLogoutLoading ? 'Logging Out...' : 'Logout'}
          </ListItem>
        </List>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
