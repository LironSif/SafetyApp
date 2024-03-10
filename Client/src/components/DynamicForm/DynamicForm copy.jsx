import React from "react";
import FormInput from "./FormInput";
import ReCAPTCHA from "react-google-recaptcha";
import "./DynamicForm.css";

const DynamicForm = ({
  formConfig,
  formData,
  setFormData,
  formErrors,
  onSubmit,
  isLoading,
  onCaptchaChange,
  formType,
}) => {
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Simplify buttonText determination
  let buttonText = "Sign up";
  if (isLoading) {
    buttonText = "Processing...";
  } else if (formType === "login") {
    buttonText = "Log in";
  }

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {formConfig.map((inputConfig) => {
        // Exclude specific types that are handled separately
        if (!["recaptcha", "checkbox"].includes(inputConfig.type)) {
          return (
            <FormInput
              key={inputConfig.id}
              {...inputConfig}
              value={formData[inputConfig.id]}
              error={formErrors[inputConfig.id]}
              onChange={(e) => handleChange(inputConfig.id, e.target.value)}
            />
          );
        }
        return null;
      })}

      {formType === "signup" && (
        <>
          <ReCAPTCHA
            sitekey={formConfig.find(config => config.type === "recaptcha")?.siteKey}
            onChange={onCaptchaChange}
            className="captchaX"
          />
          {formErrors["recaptchaToken"] && (
            <div className="error-message">{formErrors["recaptchaToken"]}</div>
          )}
          <div className="terms-checkboxX">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData["termsAccepted"]}
              onChange={(e) => handleChange("termsAccepted", e.target.checked)}
            />
            <label htmlFor="termsAccepted">
              I accept the <a href="/tos" className="terms-linkX">terms of service</a> and <a href="/privacy" className="privacy-linkX">privacy policy</a>
            </label>
            {formErrors["termsAccepted"] && (
              <div className="error-message">{formErrors["termsAccepted"]}</div>
            )}
          </div>
        </>
      )}

      <button className={`form-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
        {buttonText}
      </button>
    </form>
  );
};

export default DynamicForm;
