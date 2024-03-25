import React, { useState, useEffect } from "react";
import {
  useUpdateFactoryMutation,
  useGetFactoryByIdQuery,
} from "../../services/factoryApi";
import Spinner3 from "../../components/Spinner/Spinner3";
import "./FactoryDetails.css";
import validateForm from "../../validations/validateForm";
import MessageWithTypingEffect from "../TypeEffect/TypeEffect.jsx";
import welcomeMessage from "../TypeEffect/Message.js";

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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (factory) {
      setFormState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formState);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await updateFactory({ ...formState, id: factoryId }).unwrap();
      } catch (err) {
        console.error("Update failed:", err);
      }
    }
  };

  const handleEditModeToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleClear = () => {
    setFormState({
      name: "",
      address: "",
      employeeCount: "",
    });
    setEditMode({
      name: false,
      address: false,
      employeeCount: false,
    });
    setFormErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="card-div">
      <div className="card-name">
        <h2>Factory Details</h2>
      </div>
      <div className="crad-msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>

      <div className="card-content">
        <div className="card-header">Factory Details</div>
        <section className="card-sec">

          <div className="section-name">Edit factory details:</div>
          
          <form className="form-div" onSubmit={handleUpdate}>
            {isUpdating || isFetchingFactory ? (
              <Spinner3 />
            ) : (
              Object.keys(formState).map((key) => (
                <div
                  key={key}
                  className={`input-rapper ${editMode[key] ? "editing" : ""}`}
                >
                  <label htmlFor={key} className="email-label">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("Count", " Count")}
                    :
                  </label>

                  {editMode[key] ? (
                    <input
                      id={key}
                      type="text"
                      name={key}
                      className="email-input"
                      value={formState[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="form-static-content">{formState[key]}</div>
                  )}
                  <div className="vng-btn">
                  <button
                    type="button"
                    onClick={() => handleEditModeToggle(key)}
                    className="change-button"
                  >
                    {editMode[key] ? "Done" : "Change"}
                  </button>
                  </div>
                </div>
              ))
            )}

            {isError && (
              <div className="error-message">
                {error?.data?.message || "An error occurred"}
              </div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </form>
          <div className="form-button-group">
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="update-button"
            >
              Update
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FactoryDetails;
