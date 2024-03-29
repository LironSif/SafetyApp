import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext.jsx';
import GenericFactoryForm from '../GenericFactoryForm/GenericForm.jsx';
import GenericDepartmentForm from '../GenericFactoryForm/GenericDepartmentForm.jsx';
import { formSetup as importedFactoryFormSetup } from '../../Config/factoryFormQuickConfig.js';
import { deptFormSetup as importedDeptFormSetup } from '../../Config/DeptFormQuickConfig.js';
import Spinner3 from '../Spinner/Spinner3.jsx';
import Modal from '../modals/setupModal.jsx';
import './QuickSetup.css';
import { setQuickSetupComplete } from '../../redux/slices/FactoryCreationSlice'; // Ensure correct import path

const QuickSetup = () => {
  const { user } = useAuth(); // Assuming useAuth() could return null or undefined for user
  const dispatch = useDispatch();
  const isFactoryCreated = useSelector((state) => state.factoryCreation.isFactoryCreated);
  const areDepartmentsCreated = useSelector((state) => state.factoryCreation.areDepartmentsCreated);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isFactoryCreated && areDepartmentsCreated) {
      setShowSpinner(true); // Start showing the spinner
      setTimeout(() => {
        setShowSpinner(false); // Stop showing the spinner after 2 seconds
        setShowModal(true); // Show the modal
        dispatch(setQuickSetupComplete(true)); // Update the state to indicate completion
      }, 2000); // Adjusted to 2000 to match the comment
    }
  }, [isFactoryCreated, areDepartmentsCreated, dispatch]);

  const handleCloseModal = () => setShowModal(false);
  const handleNavigate = () => {
    setShowModal(false);
    // Implement your navigation logic here, e.g., redirecting to a different page or section
  };

  // Safeguard to ensure user object and its properties like _id are accessed safely
  const factoryFormSetup = user ? { ...importedFactoryFormSetup, userId: user._id } : { ...importedFactoryFormSetup };
  const departmentFormSetup = user ? { ...importedDeptFormSetup, userId: user._id } : { ...importedDeptFormSetup };

  return (
    <div className="quick-setup">
      {showSpinner && <Spinner3 />}
      {showModal && <Modal onClose={handleCloseModal} onNavigate={handleNavigate} />}
      {!showSpinner && !showModal && (
        <>
          <div className={`GenericForm ${!isFactoryCreated ? '' : 'disabled'}`}>
            <div className="form-header">
              <div className={`circle ${isFactoryCreated ? 'success' : ''}`}>1</div>
            </div>
            <h2>Setup Your Factory</h2>
            <GenericFactoryForm setup={factoryFormSetup} />
          </div>
          <div className={`GenericForm ${isFactoryCreated ? '' : 'disabled'}`}>
            <div className="form-header">
              <div className={`circle ${areDepartmentsCreated ? 'success' : ''}`}>2</div>
            </div>
            <h2>Setup Your Departments</h2>
            {isFactoryCreated ? <GenericDepartmentForm setup={departmentFormSetup} /> : <div>Please complete factory setup first.</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default QuickSetup;
