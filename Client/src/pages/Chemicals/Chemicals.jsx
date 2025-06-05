import React, { useEffect } from 'react';
import { useGetDepartmentsByFactoryIdQuery } from '../../services/departmentApi';
import { useAuth } from '../../context/AuthContext';
import YouMustLogin from '../../components/YouMustLogin/YouMustLogin.jsx';
import Spinner4 from '../../components/Spinner/Spinner3.jsx';
import './Chemicals.css';

const Chemicals = ({ factoryId }) => {
  const { user, refreshUserData, isLoading: authLoading } = useAuth();
  const { data: departments, error, isLoading: chemicalsLoading } = useGetDepartmentsByFactoryIdQuery(factoryId);

  useEffect(() => {
    if (!user) {
      refreshUserData();
    }
  }, [user, refreshUserData]);

  const getStateClass = (state) => {
    switch (state) {
      case 'Liquid':
        return 'state-liquid';
      case 'Gas':
        return 'state-gas';
      case 'Solid':
        return 'state-solid';
      default:
        return '';
    }
  };

  const renderContent = () => {
    if (authLoading || chemicalsLoading) {
      return <Spinner4 />;
    }

    if (!user) {
      return <YouMustLogin />;
    }

    if (!departments || error) {
      return <div>Error loading chemicals: {error ? error.toString() : 'No chemicals found.'}</div>;
    }

    return (
      <div className="chemical-details">
        {departments.map(department => (
          <div className="department-card" key={department._id}>
            <h3>{department.name}</h3>
            <p className="total-chemicals">Total Chemicals: {department.chemicals.length}</p>
            <div className="chemical-list">
              {department.chemicals.map(chemical => (
                <div className="chemical-item" key={chemical._id}>
                  <p>Name: {chemical.Name}</p>
                  <p>Quantity: {chemical.quantity}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(chemical._id, -1)}>-</button>
                    <button onClick={() => handleQuantityChange(chemical._id, 1)}>+</button>
                  </div>
                  <p>Risk Level: {chemical.riskLevel}</p>
                  <p className={getStateClass(chemical.STATE)}>State: {chemical.STATE}</p>
                  <p>FIRE HAZARD: {chemical.FIRE_HAZARD}</p>
                  <div>
                    <strong>Recommended PPE:</strong>
                    <ul>
                      {chemical.PPE.map((ppe, index) => (
                        <li key={index}>{ppe}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {department.chemicals.length > 2 && (
                <div className="scroll-indicator">Scroll for more...</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleQuantityChange = (chemicalId, change) => {
    // Handle the logic for changing the chemical quantity
    console.log(`Chemical ID: ${chemicalId}, Change: ${change}`);
  };

  return (
    <div className="chemicals-container">
      <h1>Factory Chemicals</h1>
      <p>Total Departments: {departments ? departments.length : 0}</p>
      {renderContent()}
    </div>
  );
};

export default Chemicals;
