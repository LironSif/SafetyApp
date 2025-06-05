import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFactoryMutation } from "../../services/factoryApi";
import { useCreateDepartmentMutation } from "../../services/departmentApi";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner3 from "../Spinner/Spinner3.jsx";
import Modal from "../modals/setupModal.jsx";
import "./QuickSetup.css";
import MessageWithTypingEffect from "../TypeEffect/TypeEffect.jsx";
import welcomeMessage from "../TypeEffect/Message2.js";
import { useFactorySetup } from "../../hooks/useFactorySetup";

const QuickSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [createFactory, { isLoading: isCreatingFactory, isSuccess: isFactorySuccess, data: factoryData, error: factoryError }] = useCreateFactoryMutation();
  const [createDepartment, { isLoading: isCreatingDepartment, isSuccess: isDepartmentSuccess, error: departmentError }] = useCreateDepartmentMutation();

  const {
    factoryDetails,
    setFactoryDetails,
    departments,
    setDepartments,
  } = useFactorySetup(user?._id);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
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
    setDepartments(prev => (prev.includes(dept) ? prev : [...prev, dept]));
  };

  const handleRemoveDepartment = (dept) => {
    setDepartments(prev => prev.filter(d => d !== dept));
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
    setFactoryErrorMessage("");
    setShowSpinner(true);
    if (!validateFactoryDetails()) {
      setShowSpinner(false);
      return;
    }
    try {
      await createFactory({ ...factoryDetails, userId: user._id });
    } finally {
      setShowSpinner(false);
    }
  };

  const handleSubmitDepartments = async () => {
    setDepartmentErrorMessage("");
    setShowSpinner(true);
    const factoryId = localStorage.getItem("factoryId");
    if (!factoryId || departments.length === 0) {
      setShowSpinner(false);
      setDepartmentErrorMessage("No departments selected or missing factory ID.");
      return;
    }
    try {
      await createDepartment({
        factoryId,
        userId: user._id,
        departments: departments,
      });
    } finally {
      setShowSpinner(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/getting-started/setup');
  };

  if (isCreatingFactory || isCreatingDepartment) {
    return <Spinner3 />;
  }

  return (
    <div className="quick-setup">
        <div className="card-msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>
      <div className={`border ${isFactorySuccess ? "border-success" : ""}`}>
        <div className={`step-indicator ${isFactorySuccess ? "success" : ""}`}>
          {isFactorySuccess ? <div className="step-complete">1</div> : <div className="step-pending">1</div>}
        </div>
  
        <div className={`card ${isFactorySuccess ? "success" : ""}`}>
          <h2>Setup Your Factory</h2>
          <form onSubmit={handleSubmitFactory}>
            <div className="quick-setup-input">
              <label>Factory Name</label>
              <input type="text" name="factoryName" value={factoryDetails.factoryName} onChange={handleFactoryDetailsChange} placeholder="Factory Name" disabled={isCreatingFactory || isFactorySuccess} />
            </div>
            <div className="quick-setup-input">
              <label>Factory Address</label>
              <input type="text" name="factoryAddress" value={factoryDetails.factoryAddress} onChange={handleFactoryDetailsChange} placeholder="Factory Address" disabled={isCreatingFactory || isFactorySuccess} />
            </div>
            <button type="submit" className="qs-button" disabled={isCreatingFactory || isFactorySuccess}>
              {isCreatingFactory ? "Creating..." : "Create Factory"}
            </button>
          </form>
          {factorySuccessMessage && <p className="success-message">{factorySuccessMessage}</p>}
          {factoryErrorMessage && <p className="error-message">{factoryErrorMessage}</p>}
        </div>
      </div>
  
      <div className={`border2 ${isDepartmentSuccess ? "border-success" : ""}`}>
        <div className={`step-indicator ${isDepartmentSuccess ? "success" : ""}`}>
          {isDepartmentSuccess ? <div className="step-complete">2</div> : <div className="step-pending">2</div>}
        </div>
        <div className={`card ${isDepartmentSuccess ? "success" : ""}`}>
          <h2>Select Departments</h2>
          <div className="department-selection">
            {preExistingDepartments.map((dept, index) => (
              <button key={index} onClick={() => handleSelectDepartment(dept)}
                      className={`department-btn ${departments.includes(dept) ? "selected" : ""}`}>
                {dept}
              </button>
            ))}
          </div>
          <label className="added-departments">Selected Departments</label>
          <div className="selected-departments">
            {departments.map(dept => (
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
      </div>
  
      {showModal && (
        <Modal onClose={handleModalClose} />
      )}
    </div>
  );
  
};

export default QuickSetup;
