import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import HeroSection from '../../components/Hero/HeroSection.jsx';
import { useAuth } from '../../context/AuthContext';
import QuickSetup from '../../components/FactorySetup/QuickSetup.jsx';
import { useGetDepartmentsQuery } from '../../services/departmentApi';
import { setQuickSetupComplete } from '../../redux/slices/FactoryCreationSlice';
import Spinner3 from '../../components/Spinner/Spinner3.jsx';

const Home = () => {
  const { user, isLoading: isLoadingUser, refreshUserData } = useAuth();
  const { data: departments, isSuccess: isDepartmentsSuccess } = useGetDepartmentsQuery();
  const dispatch = useDispatch();
  const isQuickSetupComplete = useSelector((state) => state.factoryCreation.quickSetupComplete);
  
  // Introduce a new state variable to track the overall loading state
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      refreshUserData();
    }
  }, [user, refreshUserData]);

  useEffect(() => {
    // Check if all conditions are satisfied: user and departments are loaded, and the loading flags are false
    if (!isLoadingUser && isDepartmentsSuccess && user) {
      setIsDataLoading(false);

      // Dispatch setQuickSetupComplete based on user having a factory and departments being successfully fetched
      if (user?.factory && departments) {
        dispatch(setQuickSetupComplete(true));
      } else {
        dispatch(setQuickSetupComplete(false));
      }
    }
  }, [user, isLoadingUser, isDepartmentsSuccess, departments, dispatch]);

  // Show spinner if data is still loading
  if (isDataLoading) {
    return <Spinner3 />;
  }

  // After loading is complete, render your components
  return (
    <div className='home'>
      <HeroSection />
      {!isQuickSetupComplete && <QuickSetup />}
    </div>
  );
};

export default Home;
