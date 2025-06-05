import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import FactoryDa from '../../pages/Factory/FactoryDa';
import Chemicals from '../../pages/Chemicals/Chemicals'; // Import the new Chemicals component
import { useAuth } from '../../context/AuthContext';
import { useGetFactoryByIdQuery } from '../../services/factoryApi';
import Spinner3 from '../../components/Spinner/Spinner3';

const Dashboard = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const dispatch = useDispatch();

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

  if (isFactoryLoading || isLoadingUser) {
    return <Spinner3 />;
  }

  return (
    <div className="dashboard">
      <Routes>
        <Route path="/factory" element={<FactoryDa factoryId={factoryId} />} />
        <Route path="/chemicals" element={<Chemicals factoryId={factoryId} />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default Dashboard;
