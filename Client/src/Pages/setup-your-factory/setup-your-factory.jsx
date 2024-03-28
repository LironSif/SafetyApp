import React, { useState, useEffect } from 'react';
import SetupFactory from '../../components/FactorySetup/SetupFactory.jsx';
import YouMustLogin from '../../components/YouMustLogin/YouMustLogin.jsx';
import Spinner3 from '../../components/Spinner/Spinner3.jsx';
import { useAuth } from '../../context/AuthContext';

const SetupYourFactory = () => {
  const { user, isLoading } = useAuth();
  const [readyToShow, setReadyToShow] = useState(false); // New state to control visibility

  useEffect(() => {
    // If not loading and user state is checked, set readyToShow to true
    if (!isLoading && user !== undefined) {
      setReadyToShow(true);
    }
  }, [isLoading, user]);

  // Decide what to render based on the user state
  const renderContent = () => {
    if (!user) {
      return <YouMustLogin />;
    } else if (!user.factory) {
      return <div>You have no factory set up. Please set up your factory.</div>;
    } else {
      return <SetupFactory />;
    }
  };

  if (!readyToShow) {
    return <Spinner3 />;
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default SetupYourFactory;
