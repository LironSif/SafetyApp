import React from 'react';
import { useGetDepartmentsByFactoryIdQuery } from '../../services/departmentApi';
import { useAuth } from '../../context/AuthContext';
import YouMustLogin from '../../components/YouMustLogin/YouMustLogin.jsx';
import Spinner4 from '../../components/Spinner/Spinner4.jsx';
import './FactoryDa.css';
import { format, addYears, isValid } from 'date-fns';

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
          <div className="department-card2" key={department._id}>
            <h3>{department.name}</h3>
            <p>Employees: {department.employees.length}</p>
            {department.noise && isValid(new Date(department.noise.lastCheckDate)) && department.noise.measurement ? (
              <div className="noise-details">
                <p>Last Noise Check: {format(new Date(department.noise.lastCheckDate), 'dd/MM/yyyy')}</p>
                <p>Next Noise Check: {format(addYears(new Date(department.noise.lastCheckDate), 1), 'dd/MM/yyyy')}</p>
                <div className="progress-bar-container">
                  <div className="progress-bar-gray">
                    <div
                      className="progress-bar-blue"
                      style={{ width: `${getProgress(department.noise.lastCheckDate)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="noise-details">
                <p>Last Noise Check: No noise test made</p>
                <p>Next Noise Check: TBT</p>
                <div className="progress-bar-container">
                  <div className="progress-bar-gray"></div>
                </div>
              </div>
            )}
            <div className="risk-level-container">
              <span className="risk-text">Risk Level</span>
              <div className={`risk-circle ${getRiskClass(department.risks)}`}>
                <span>{department.risks.length}</span>
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

  return (
    <div className="factory-da-container">
      <h1>Factory Departments Overview</h1>
      <div className="color-explanation">
        <p><span className="risk-circle yellow"></span> Yellow circle: Only chemical risk</p>
        <p><span className="risk-circle red"></span> Red circle: Chemical and noise risk</p>
      </div>
      {renderContent()}
    </div>
  );
};

const getRiskClass = (risks) => {
  const hasChemicalRisk = risks.some(risk => risk.name === 'Chemical Risk');
  const hasNoiseRisk = risks.some(risk => risk.name === 'Noise Risk');

  if (hasChemicalRisk && hasNoiseRisk) return 'red';
  if (hasChemicalRisk) return 'yellow';
  return '';
};

const getProgress = (lastCheckDate) => {
  const lastCheck = new Date(lastCheckDate);
  const nextCheck = addYears(lastCheck, 1);
  const now = new Date();

  const totalDuration = nextCheck - lastCheck;
  const elapsedDuration = now - lastCheck;

  return (elapsedDuration / totalDuration) * 100;
};

export default FactoryDa;
