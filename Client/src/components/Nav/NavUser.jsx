import React, { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/techh.jpeg";
import UserMenu from '../UserManu/UserMenu.jsx'; // Ensure the path is correct
import './NavUser.css';

const NavUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Set factoryId to user.factory or an empty string if it's not set
    localStorage.setItem('factoryId', user?.factory || '');
  }, [user]); // Dependency array includes user, so this runs when user updates

  const avatarSrc = user?.avatar || logo;
  let userName = user?.email || 'Welcome, Guest!';

  if (userName.length > 15) {
    userName = `${userName.substring(0, 15)}...`;
  }

  return (
    <div className='Navuser'>
      <div className='user-profile'>
        <img src={avatarSrc} onClick={() => navigate("/")} alt="User Avatar" className='avatar'/>
        <div onClick={() => navigate("/")} className='username'>{userName}</div>
        <UserMenu />
      </div>
    </div>
  );
};

export default NavUser;
