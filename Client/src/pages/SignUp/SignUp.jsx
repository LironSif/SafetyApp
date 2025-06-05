import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css"
import logo from "../../assets/logo/Logo.svg";
import AuthOptions from "../../components/AuthButtons/AuthOptions.jsx";
import DynamicForm from "../../components/DynamicForm/DynamicForm.jsx";
import { signupFormConfig } from "../../Utils/FormConfig.js";
import { useSignupUserMutation } from "../../services/userApi.js";
import { validateSignupForm } from "../../Utils/Formvalidation.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
    recaptchaToken: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [signupUser, { isLoading, isError, error }] = useSignupUserMutation();

  const handleCaptchaChange = (token) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      recaptchaToken: token,
    }));
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateSignupForm(formData);
    setFormErrors(errors);

    if (!isValid) return;

    try {
      await signupUser(formData).unwrap();
      navigate("/");
    } catch (signupError) {
      console.error(signupError);
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
              <h2 className="heading">Sign Up</h2>
            </div>
            <DynamicForm
              formConfig={signupFormConfig}
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              formType ={"signup"}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onCaptchaChange={handleCaptchaChange}
            />
            {isError && (
              <div className="error-message">
                {error?.data?.message || "Failed to sign up."}
              </div>
            )}
            <AuthOptions />
          </div>
          <div className="actionSection">
            <span className="accountPrompt">Already have an account?</span>
            <button
              className="actionButton"
              onClick={() => navigate("/login")}
            >
              Log in here!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
