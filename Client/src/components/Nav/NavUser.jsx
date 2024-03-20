import React from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/techh.jpeg";
import UserMenu from '../UserManu/UserMenu.jsx';
import './NavUser.css';

const NavUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  
  localStorage.setItem('factoryId', user.factory);
  const avatarSrc = user?.avatar || logo;
  let userName = user?.email || 'Welcome, Guest!';

  // Truncate userName to 9 characters + ellipsis if longer
  if (userName.length > 15) {
    userName = `${userName.substring(0, 15)}...`;
  }

  return (
    <div className='Navuser'>
      <div className='user-profile' >
        <img src={avatarSrc} onClick={()=> navigate("/")} alt="User Avatar" className='avatar'/>
        <div  onClick={()=> navigate("/")} className='username'>{userName}</div>
        <UserMenu />
      </div>
    </div>
  );
};

export default NavUser;
