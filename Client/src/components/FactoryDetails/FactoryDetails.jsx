import React, { useState, useEffect } from "react";
import {
  useUpdateFactoryMutation,
  useGetFactoryByIdQuery,
} from "../../services/factoryApi";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./FactoryDetails.css";
import validateForm from "../../validations/validateForm";

const FactoryDetails = () => {
  const factoryId = localStorage.getItem("factoryId");
  const { data: factory, isLoading: isFetchingFactory } =
    useGetFactoryByIdQuery(factoryId);
  const [updateFactory, { isLoading: isUpdating, isSuccess, isError, error }] =
    useUpdateFactoryMutation();

  const [formState, setFormState] = useState({
    name: "",
    address: "",
    employeeCount: "",
  });
  const [editMode, setEditMode] = useState({
    name: false,
    address: false,
    employeeCount: false,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (factory) {
      setFormState({
        name: factory.name || "",
        address: factory.address || "",
        employeeCount: factory.employeeCount?.toString() || "",
      });
    }
  }, [factory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleUpdate = async () => {
    const validationErrors = validateForm(formState);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatePayload = {
        ...formState,
        employeeCount: parseInt(formState.employeeCount, 10),
        id: factoryId,
      };

      try {
        await updateFactory(updatePayload).unwrap();
        alert("Update successful"); // Or any other success indication
      } catch (updateError) {
        console.error("Update failed:", updateError);
      }
    }
  };

  const handleEditModeToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (isFetchingFactory) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="setup-div">
      <h3 className="setup-name">Factory Details</h3>

      <div className="factory-details-form">
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(formState).map((key) => (
            <div key={key} className="form-field">
              <span>
                <strong>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace("Count", " Count")}
                  :{" "}
                </strong>
                {editMode[key] ? (
                  <input
                    type="text"
                    name={key}
                    value={formState[key]}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{formState[key]}</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => handleEditModeToggle(key)}
                className="change-button"
              >
                {editMode[key] ? "Done" : "Change"}
              </button>
            </div>
          ))}
          <div className="error-message">
            {Object.values(formErrors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>

          {isError && (
            <div className="error-message">
              {error?.data?.message || "An error occurred"}
            </div>
          )}
        </form>
      </div>
      <div className="button-main-div">
        <div className="form-button-group">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating || isSuccess}
            className={`update-button ${isSuccess ? "success" : ""}`}
          >
            {isUpdating ? <Spinner /> : isSuccess ? "Updated" : "Update"}
          </button>
          <button
            type="button"
            className="clear-button"
            onClick={() => window.location.reload()}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactoryDetails;
