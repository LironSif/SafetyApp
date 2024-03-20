// YouMustLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const YouMustLogin = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>You have to log in to create a Factory</h2>
      <div style={{ margin: '20px' }}>
        <button onClick={() => navigate('/')} style={{ marginRight: '10px', padding: '10px 20px' }}>Back to Home</button>
        <button onClick={() => navigate('/login')} style={{ padding: '10px 20px' }}>Log in Now</button>
      </div>
    </div>
  );
}

export default YouMustLogin;
