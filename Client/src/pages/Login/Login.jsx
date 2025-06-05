import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; 
import logo from "../../assets/logo/Logo.svg"; 
import { useLoginUserMutation } from "../../services/userApi.js";
import AuthOptions from "../../components/AuthButtons/AuthOptions.jsx"; 
import DynamicForm from "../../components/DynamicForm/DynamicForm.jsx"; 
import { validateLoginForm } from "../../Utils/Formvalidation.js"; 
import { loginFormConfig } from "../../Utils/FormConfig.js"; 

const LoginForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const handleFormSubmit = async (formData) => {

    const { isValid, errors } = validateLoginForm(formData);
    setFormErrors(errors); 

    if (!isValid) return;

    try {
      const response = await loginUser(formData).unwrap();
      if (response.user) navigate("/");
      else
        setFormErrors({ form: "Unexpected error occurred. Please try again." });
    } catch (err) {
      setFormErrors({
        form:
          err.data?.message ||
          "Login failed. Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="header">
        <img src={logo} alt="Logo" />
      </div>

      <div className="main">
        <div className="form">
          <div className="subform">
            <div className="headingdiv">
              <h2 className="heading">Log in</h2>
            </div>

            <DynamicForm
              formConfig={loginFormConfig}
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              isLoading={isLoading}
              formType="login"
              onSubmit={handleFormSubmit}
            />
            {isError && (
              <div className="error-message">
                {error?.data?.message || "Login failed"}
              </div>
            )}

            <div className="loginbuttons">
              <a className="passwordResetLink" href="/forgot-password">
                I forgot my password
              </a>
            </div>

            <AuthOptions />
          </div>
          <div className="actionSection">
            <span className="accountPrompt">Don't have an account?</span>
            <button
              className="actionButton"
              onClick={() => navigate("/signup")}
            >
              Sign up for free!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
