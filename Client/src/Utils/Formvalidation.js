// Utility function for validating login form data
export const validateLoginForm = (formData) => {
  let errors = {};
  let isValid = true;

  // Validate email
  if (!formData.email) {
    isValid = false;
    errors["email"] = "Email cannot be empty";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    isValid = false;
    errors["email"] = "Email is not valid";
  }

  // Validate password with added regex for robust validation
  if (!formData.password) {
    isValid = false;
    errors["password"] = "Password cannot be empty";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.password)) {
    isValid = false;
    errors["password"] = "Password must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter.";
  }

  return { isValid, errors };
};

// Utility function for validating signup form data
export const validateSignupForm = (formData) => {
  let errors = {};
  let isValid = true;

  // Email and password validation reused from validateLoginForm
  const loginValidation = validateLoginForm(formData);
  isValid = loginValidation.isValid;
  errors = {...loginValidation.errors};

  // Validate name
  if (!formData.name) {
    isValid = false;
    errors["name"] = "Name cannot be empty";
  }

  // Validate terms acceptance
  if (!formData.termsAccepted) {
    isValid = false;
    errors["termsAccepted"] = "You must accept the terms and conditions";
  }

  // Validate recaptchaToken
  if (!formData.recaptchaToken) {
    isValid = false;
    errors["recaptchaToken"] = "Please verify you are not a robot";
  }

  return { isValid, errors };
};
