import React, { useState } from 'react';
import './SetupFactory.css';
import FactoryDetails from '../FactoryDetails/FactoryDetails.jsx';
import EmployeesDetails from '../EmployeesDetails/EmployeesDetails.jsx';
import DeptDetails from '../DeptDetails/DeptDetails.jsx';
import ConfigDept from '../ConfigDept/ConfigDept.jsx';

const SetupFactory = () => {
  // Array of components for navigation
  const components = [
    <FactoryDetails key="factory" />,
    <EmployeesDetails key="employees" />,
    <DeptDetails key="dept" />,
    <ConfigDept key="config" />
  ];

  // State to keep track of the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to the next component
  const next = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to navigate to the previous component
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <div className='setup-factory'>
      {components[currentIndex]}

      <div className="navigation-buttons">
        {/* Invisible spacer for aligning the Next button when Previous is not shown */}
        {currentIndex === 0 && <div className="spacer"></div>}
        {currentIndex > 0 && (
          <button className="prev" onClick={prev}>Previous</button>
        )}
        {currentIndex < components.length - 1 && (
          <button className="next" onClick={next}>Next</button>
        )}
        {/* Ensure there's always a spacer after the buttons to keep alignment */}
        {currentIndex === components.length - 1 && <div className="spacer"></div>}
      </div>
    </div>
  );
};
export default SetupFactory;
