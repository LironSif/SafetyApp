import React, { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/techh.jpeg";
import UserMenu from '../UserManu/UserMenu.jsx'
import './NavUser.css';

const NavUser = () => {
  const { user, refreshUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('factoryId', user.factory || '');
    }
  }, [user]);

  const avatarSrc = user?.avatar || logo;
  let userName = user?.email || 'Welcome, Guest!';

  if (userName.length > 15) {
    userName = `${userName.substring(0, 15)}...`;
  }

  return (
    <div className='NavUser'>
      <div className='user-profile'>
        <img src={avatarSrc} onClick={() => navigate("/")} alt="User Avatar" className='avatar' />
        <div onClick={() => navigate("/")} className='username'>{userName}</div>
        <UserMenu />
      </div>
    </div>
  );
};

export default NavUser;
