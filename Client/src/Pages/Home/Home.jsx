import React from 'react';
import './Home.css';
import { useCheckAuthStatusQuery } from "../../services/userApi"; 

const Home = () => {
  const { data: user, isLoading } = useCheckAuthStatusQuery();
console.log(user)
  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator or message
  }

  return (
    <div className='home'>
      <div className='sidebar'>
        <div className='user-profile'>
          {/* Display the avatar using an img tag */}
          <img src={user?.user?.avatar} alt="Avatar" className='avatar'/>
          {/* Fallback content in case user or user.email is undefined */}
          <div className='username'>{user?.user?.email || 'No User Email'}</div>
          <button className='options-button'>Options</button>
        </div>
        <div className='navigation-section'>
          {/* It's not clear why you have a hardcoded email here. Consider dynamic content or remove it if not needed */}
          <div className='email'>d</div>
          <ul className='nav-list'>
            <li>Getting Started</li>
            <li>Setup & Installation</li>
            {/* Continue adding the rest of your navigation items */}
            <li>Settings</li>
            <li>Account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
