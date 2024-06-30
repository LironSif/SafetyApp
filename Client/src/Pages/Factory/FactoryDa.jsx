import React from 'react';
import { useGetDepartmentsByFactoryIdQuery } from '../../services/departmentApi';
import './FactoryDa.css';

const FactoryDa = ({ factoryId }) => {
  const { data: departments, error, isLoading } = useGetDepartmentsByFactoryIdQuery(factoryId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading departments: {error.toString()}</div>;

  return (
    <div className="factory-details">
      {departments.map(department => (
        <div className="department-card" key={department._id}>
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

const getRiskClass = (risks) => {
  const hasChemicalRisk = risks.some(risk => risk.name === 'Chemical Risk');
  const hasNoiseRisk = risks.some(risk => risk.name === 'Noise Risk');

  if (hasChemicalRisk && hasNoiseRisk) return 'red';
  if (hasChemicalRisk) return 'yellow';
  return '';
};

export default FactoryDa;
