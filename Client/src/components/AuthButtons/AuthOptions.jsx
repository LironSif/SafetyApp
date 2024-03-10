import React from 'react';
import GoogleLogo from '../../assets/Login/Google-logo.svg';
import FacebookIcon from '../../assets/Login/Facebook_icon.svg';
import './AuthOptions.css';

const socialOptions = [
  { name: 'Google', logo: GoogleLogo, authUrl: "/auth/google" },
  // { name: 'Google', logo: GoogleLogo, authUrl: `${import.meta.env.VITE_SERVER_URL}/auth/google` },
  { name: 'Facebook', logo: FacebookIcon, authUrl: `${import.meta.env.VITE_SERVER_DEPLOY_URL}/auth/facebook` },
  // { name: 'Facebook', logo: FacebookIcon, authUrl: `${import.meta.env.VITE_SERVER_URL}/auth/facebook` },
  // Add more social options here as needed
];

const AuthOptions = () => {
  return (
    <section className="auth-options">
      <div className="divider">
        <div className="line"></div>
        <span className="text">or</span>
        <div className="line"></div>
      </div>
      <div className="buttons">
        {socialOptions.map((option) => (
          <button
            key={option.name}
            className="btn"
            onClick={() => (window.location.href = option.authUrl + "xssss")}
          >
            <img src={option.logo} alt={option.name} className="icon" />
            <span className="btn-text">Sign in with {option.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default AuthOptions;
