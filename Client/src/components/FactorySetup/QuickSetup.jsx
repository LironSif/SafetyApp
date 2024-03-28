import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFactoryMutation } from "../../services/factoryApi";
import { useCreateDepartmentMutation } from "../../services/departmentApi";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner3 from "../Spinner/Spinner3.jsx";
import Modal from "../modals/setupModal.jsx";
import "./QuickSetup.css";

const QuickSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [createFactory, { isLoading: isCreatingFactory, isSuccess: isFactorySuccess, data: factoryData, error: factoryError }] = useCreateFactoryMutation();
  const [createDepartment, { isLoading: isCreatingDepartment, isSuccess: isDepartmentSuccess, error: departmentError }] = useCreateDepartmentMutation();

  const [factoryDetails, setFactoryDetails] = useState({ factoryName: "", factoryAddress: "" });
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [factoryErrorMessage, setFactoryErrorMessage] = useState("");
  const [departmentErrorMessage, setDepartmentErrorMessage] = useState("");
  const [factorySuccessMessage, setFactorySuccessMessage] = useState("");
  const [departmentSuccessMessage, setDepartmentSuccessMessage] = useState("");

  const preExistingDepartments = ["Office", "Maintenance", "Manufacturing", "Storage", "Yard"];

  useEffect(() => {
    if (isFactorySuccess) {
      localStorage.setItem("factoryId", factoryData._id);
      setFactorySuccessMessage("Factory successfully created.");
    }
    
    if (isFactorySuccess && isDepartmentSuccess) {
      setDepartmentSuccessMessage("Departments successfully created.");
      setShowModal(true);
 
    }

    if (factoryError) {
      setFactoryErrorMessage(factoryError.data?.message || "An unexpected error occurred during factory creation.");
    }

    if (departmentError) {
      setDepartmentErrorMessage(departmentError.data?.message || "An unexpected error occurred during department creation.");
    }
  }, [isFactorySuccess, factoryData, factoryError, isDepartmentSuccess, departmentError]);

  const handleFactoryDetailsChange = (e) => {
    const { name, value } = e.target;
    setFactoryDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectDepartment = (dept) => {
    setSelectedDepartments(prev => prev.includes(dept) ? prev : [...prev, dept]);
  };

  const handleRemoveDepartment = (dept) => {
    setSelectedDepartments(prev => prev.filter(d => d !== dept));
  };

  const validateFactoryDetails = () => {
    if (!user?._id) {
      setFactoryErrorMessage("Please log in first.");
      return false;
    }
    if (!factoryDetails.factoryName || !factoryDetails.factoryAddress) {
      setFactoryErrorMessage("Both factory name and address must be provided.");
      return false;
    }
    return true;
  };

  const handleSubmitFactory = async (e) => {
    e.preventDefault();
    setFactoryErrorMessage(""); // Clear any previous error message
    if (!validateFactoryDetails()) {
      return;
    }
    try {
      await createFactory({ ...factoryDetails, userId: user._id });
    } finally {
      setShowSpinner(false); // Missing setShowSpinner(true) before the try block
    }
  };

  const handleSubmitDepartments = async () => {
    setDepartmentErrorMessage(""); // Clear any previous error message
    const factoryId = localStorage.getItem("factoryId");
    if (!factoryId || selectedDepartments.length === 0) {
      setDepartmentErrorMessage("No departments selected or missing factory ID.");
      return;
    }
    try {
      await createDepartment({
        factoryId,
        userId: user._id,
        departments: selectedDepartments,
      });
    } finally {
      setShowSpinner(false); // setShowSpinner(true) should also be set before the try block
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/'); // Navigate to the home page after closing the modal
  };

  // Show spinner when any action is being processed
  if (isCreatingFactory || isCreatingDepartment) {
    return <Spinner3 />;
  }

  return (
    <div className="quick-setup">
      <div className={`card ${isFactorySuccess ? "success" : ""}`}>
        <h2>Setup Your Factory</h2>
        <form onSubmit={handleSubmitFactory}>
          <div className="quick-setup-input">
          <label>Factory Name</label>
          <input type="text" name="factoryName" value={factoryDetails.factoryName} onChange={handleFactoryDetailsChange} placeholder="Factory Name" />
          </div>
          <div className="quick-setup-input">
          <label>Factory Address</label>
          <input type="text" name="factoryAddress" value={factoryDetails.factoryAddress} onChange={handleFactoryDetailsChange} placeholder="Factory Address" />
          </div>
          <button type="submit" className="qs-button" disabled={isCreatingFactory || isFactorySuccess}>
            {isCreatingFactory ? "Creating..." : "Create Factory"}
          </button>
        </form>
        {factorySuccessMessage && <p className="success-message">{factorySuccessMessage}</p>}
        {factoryErrorMessage && <p className="error-message">{factoryErrorMessage}</p>}
      </div>

      <div className={`card ${isDepartmentSuccess ? "success" : ""}`}>
        <h2>Select Departments</h2>
        <div className="quick-setup-input">
        <label>select departments</label>
        </div>
        <div className="department-selection">
          {preExistingDepartments.map((dept, index) => (
            <button key={index} onClick={() => handleSelectDepartment(dept)} className={`department-btn ${selectedDepartments.includes(dept) ? "selected" : ""}`}>
              {dept}
            </button>
          ))}
        </div>
        <div className="quick-setup-input">
        <label>selected departments</label>
        </div>
        <div className="selected-departments">
          {selectedDepartments.map(dept => (
            <div key={dept} className="selected-department">
              {dept} <button className="remove-btn" onClick={() => handleRemoveDepartment(dept)}>X</button>
            </div>
          ))}
        </div>
        <button onClick={handleSubmitDepartments} className="qs-button" disabled={isCreatingDepartment || isDepartmentSuccess}>
          {isCreatingDepartment ? "Creating..." : isDepartmentSuccess ? "Departments Created" : "Create Departments"}
        </button>
        {departmentErrorMessage && <p className="error-message">{departmentErrorMessage}</p>}
        {departmentSuccessMessage && <p className="success-message">{departmentSuccessMessage}</p>}
      </div>

      {showModal && (
        <Modal onClose={handleModalClose} />
      )}
    </div>
  );
};

export default QuickSetup;
