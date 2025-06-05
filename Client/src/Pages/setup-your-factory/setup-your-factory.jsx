import React, { useEffect } from "react";
import SetupFactory from "../../components/FactorySetup/SetupFactory.jsx";
import YouMustLogin from "../../components/YouMustLogin/YouMustLogin.jsx";
import { useAuth } from "../../context/AuthContext";
import Spinner4 from "../../components/Spinner/Spinner4.jsx";

const SetupYourFactory = () => {
  const { user, refreshUserData, isLoading } = useAuth();

  useEffect(() => {
    if (!user?.factory) {
      refreshUserData();
    }
  }, []);

  // Determine what to render based on the user and user.factory state
  const renderContent = () => {
    // Show spinner when data is loading
    if (isLoading) {
      return <Spinner4 />;
    }

    // If there's no user, prompt to login
    if (!user) {
      return <YouMustLogin />;
    }

    // If there's a user but no factory, show specific message or component
    if (!user.factory) {
      return <div>You have no factory set up. Please set up your factory.</div>;
    }

    // If there's a user and a factory, proceed with the setup
    return <SetupFactory />;
  };

  return <div>{renderContent()}</div>;
};

export default SetupYourFactory;
