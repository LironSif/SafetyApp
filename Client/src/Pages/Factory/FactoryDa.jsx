import React from 'react';
import { useGetDepartmentsByFactoryIdQuery } from '../../services/departmentApi';
import { useAuth } from '../../context/AuthContext';
import YouMustLogin from '../../components/YouMustLogin/YouMustLogin.jsx';
import Spinner4 from '../../components/Spinner/Spinner3.jsx';
import './FactoryDa.css';

const FactoryDa = ({ factoryId }) => {
  const { user, refreshUserData, isLoading: authLoading } = useAuth();
  const { data: departments, error, isLoading: departmentsLoading } = useGetDepartmentsByFactoryIdQuery(factoryId);

  React.useEffect(() => {
    if (!user) {
      refreshUserData();
    }
  }, [user, refreshUserData]);

  const renderContent = () => {
    if (authLoading || departmentsLoading) {
      return <Spinner4 />;
    }

    if (!user) {
      return <YouMustLogin />;
    }

    if (!departments || error) {
      return <div>Error loading departments: {error ? error.toString() : 'No departments found.'}</div>;
    }

    return (
      <div className="factory-details">
        {departments.map(department => (
          <div className="department-cards" key={department._id}>
            <h3>{department.name}</h3>
            <p>Employees: {department.employees.length}</p>
            <div className="risk-level-container">
              <span className="risk-text">Risk Level</span>
              <div className={`risk-circle ${getRiskClass(department.risks)}`}>
                {department.risks.length}
              </div>
            </div>
            <div className="employee-list">
              {department.employees.map(employee => (
                <p key={employee._id}>{employee.email}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

const getRiskClass = (risks) => {
  const hasChemicalRisk = risks.some(risk => risk.name === 'Chemical Risk');
  const hasNoiseRisk = risks.some(risk => risk.name === 'Noise Risk');

  if (hasChemicalRisk && hasNoiseRisk) return 'red';
  if (hasChemicalRisk) return 'yellow';
  return '';
};

export default FactoryDa;
