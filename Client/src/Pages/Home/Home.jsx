import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import HeroSection from '../../components/Hero/HeroSection.jsx';
import { useAuth } from '../../context/AuthContext';
import QuickSetup from '../../components/FactorySetup/QuickSetup.jsx';
import { useGetDepartmentsQuery } from '../../services/departmentApi';
import { setQuickSetupComplete } from '../../redux/slices/FactoryCreationSlice';


const Home = () => {
  const { user, isLoading } = useAuth();
  const { data: departments, isSuccess } = useGetDepartmentsQuery();
  const dispatch = useDispatch();
  const isQuickSetupComplete = useSelector((state) => state.factoryCreation.quickSetupComplete);
console.log(isQuickSetupComplete)
  useEffect(() => {
    // Assuming that having at least one department signifies completion
    if (isSuccess && user.factoryId) {
      dispatch(setQuickSetupComplete(true));
    } else {
      dispatch(setQuickSetupComplete(false));
    }
  }, [departments, isSuccess, dispatch]);

  if (isLoading || !isSuccess) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className='home'>
      <HeroSection />
      {/* Conditional rendering based on the quick setup completion state */}
      {!isQuickSetupComplete && <QuickSetup />}
    </div>
  );
};

export default Home;
