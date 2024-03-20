// SetupYourFactory.jsx
import React from 'react';
import SetupFactory from '../../components/FactorySetup/SetupFactory.jsx';
import YouMustLogin from '../../components/YouMustLogin/YouMustLogin.jsx'; // Adjust the import path as necessary
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct

const SetupYourFactory = () => {
  const { user } = useAuth(); // Use the useAuth hook to get user details

  return (
    <div>
      {user ? <SetupFactory /> : <YouMustLogin />}
    </div>
  );
}

export default SetupYourFactory;
