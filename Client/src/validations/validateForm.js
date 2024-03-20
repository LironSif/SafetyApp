const validateForm = (formState) => {
  const errors = {};
  const regexForNumber = /^\d+$/; // Regular expression for validating numbers

  // Validate factory name is not empty
  if (!formState.name.trim()) {
    errors.name = "Factory name is required.";
  }

  // Basic validation for address (non-empty in this case)
  if (!formState.address.trim()) {
    errors.address = "Factory address is required.";
  }

  // Validate number of employees is a number
  // Make sure to check 'employeeCount' instead of 'employees'
  if (!regexForNumber.test(formState.employeeCount)) {
    errors.employeeCount = "Number of employees must be a number.";
  }

  return errors;
};

export default validateForm;
