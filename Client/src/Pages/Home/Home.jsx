import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import HeroSection from '../../components/Hero/HeroSection.jsx';
import { useAuth } from '../../context/AuthContext';
import QuickSetup from '../../components/FactorySetup/QuickSetup.jsx';
import { useGetDepartmentsQuery } from '../../services/departmentApi';
import { setQuickSetupComplete } from '../../redux/slices/FactoryCreationSlice';
import Spinner3 from '../../components/Spinner/Spinner3.jsx';


const Home = () => {
  const { user, isLoading, refreshUserData } = useAuth();
  const { data: departments, isSuccess } = useGetDepartmentsQuery();
  const dispatch = useDispatch();
  const isQuickSetupComplete = useSelector((state) => state.factoryCreation.quickSetupComplete);

if(!user){
  refreshUserData()
}
  useEffect(() => {
    if (isSuccess && user?.factory) {
      dispatch(setQuickSetupComplete(true));
    } else {
      dispatch(setQuickSetupComplete(false));
    }
  }, [departments, isSuccess, dispatch]);

  if (isLoading || !isSuccess) {
    return <div><Spinner3/></div>;
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
