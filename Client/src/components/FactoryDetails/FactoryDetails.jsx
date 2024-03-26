import React, { useState, useEffect } from "react";
import { useUpdateFactoryMutation, useGetFactoryByIdQuery } from "../../services/factoryApi";
import Spinner3 from "../../components/Spinner/Spinner3";
import "./FactoryDetails.css";
import validateForm from "../../validations/validateForm";
import MessageWithTypingEffect from "../TypeEffect/TypeEffect.jsx";
import welcomeMessage from "../TypeEffect/Message.js";

const FactoryDetails = () => {
  const factoryId = localStorage.getItem("factoryId");
  const { data: factory, isLoading: fetchingFactory } = useGetFactoryByIdQuery(factoryId);
  const [updateFactory, { isLoading: updatingFactory, isSuccess, isError, error }] = useUpdateFactoryMutation();

  const initialDetails = { name: "", address: "", employeeCount: "" };
  const [factoryDetails, setFactoryDetails] = useState(initialDetails);
  const [editStates, setEditStates] = useState({ name: false, address: false, employeeCount: false });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (factory) {
      setFactoryDetails({
        name: factory.name || "",
        address: factory.address || "",
        employeeCount: factory.employeeCount?.toString() || "",
      });
    }
  }, [factory]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Update successful!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  }, [isSuccess]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFactoryDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const errors = validateForm(factoryDetails);
    if (!Object.keys(errors).length) {
      try {
        await updateFactory({ ...factoryDetails, id: factoryId }).unwrap();
        setSuccessMessage("All changes saved successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
      } catch (updateError) {
        console.error("Update failed:", updateError);
      }
    }
  };

  const handleClear = () => {
    setFactoryDetails(initialDetails);
  };

  const toggleEditMode = (field) => {
    setEditStates(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (fetchingFactory) return <Spinner3 />;

  return (
    <div className="card-div">
      <div className="card-name">
        <h2>Factory Details</h2>
      </div>
      <div className="card-msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>
      <div className="card-content">
        <div className="card-header">Factory Details</div>
        <section className="card-section">
          {Object.entries(factoryDetails).map(([key, value]) => (
            <div key={key} className="detail-item">
              <div className="section-name">{key.charAt(0).toUpperCase() + key.slice(1).replace("Count", " Count")}:</div>
              {editStates[key] ? (
                <input
                  type="text"
                  className="input"
                  value={value}
                  onChange={(e) => handleChange(e, key)}
                />
              ) : (
                <div onClick={() => toggleEditMode(key)} className="static-content">{value}</div>
              )}
            </div>
          ))}
                  <div className="button-main-div">
          <div className="form-button-group">
            <button onClick={handleClear} className="clear-button">Clear</button>
            <button onClick={handleSave} disabled={updatingFactory} className="update-button">Update</button>
          </div>
          </div>
          {isError && <div className="error-message">{error?.data?.message || "An error occurred"}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </section>
      </div>
    </div>
  );
};

export default FactoryDetails;
