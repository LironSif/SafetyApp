import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Home.css';
import HeroSection from '../../components/Hero/HeroSection.jsx';
import { useAuth } from '../../context/AuthContext';
import QuickSetup from '../../components/FactorySetup/QuickSetup.tsx';
import { useGetFactoryByIdQuery } from '../../services/factoryApi';
import { setQuickSetupComplete } from '../../redux/slices/FactoryCreationSlice';
import Spinner3 from '../../components/Spinner/Spinner3.jsx';

const Home = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const dispatch = useDispatch();

  // useEffect to store user._id into localStorage
  useEffect(() => {
    if (user && user._id) {
      localStorage.setItem('userID', user._id);
      console.log('User ID set in localStorage:', user._id);
    }
  }, [user]);

  const factoryId = user?.factory || localStorage.getItem('factoryId');

  const { data: factory, isSuccess: isFactorySuccess, isLoading: isFactoryLoading } = useGetFactoryByIdQuery(factoryId, {
    skip: !factoryId,
  });

  useEffect(() => {
    if (isFactorySuccess) {
      const setupComplete = !!factory;
      dispatch(setQuickSetupComplete(setupComplete));
    }
  }, [factory, isFactorySuccess, dispatch]);

  if (isFactoryLoading || isLoadingUser) {
    return <Spinner3 />;
  }
console.log(!factory )
  return (
    <div className='home'>
      <HeroSection />
      {!factory && <QuickSetup />}
    </div>
  );
};

export default Home;
