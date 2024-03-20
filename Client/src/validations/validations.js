export const validateFactoryInputs = (name, address) => {
    const regex = /^[a-zA-Z0-9\s]+$/; // Allows letters, numbers, and spaces
    if (!name || !address) {
      return "Both factory name and address are required.";
    } else if (!regex.test(name) || !regex.test(address)) {
      return "Only letters and numbers are allowed in inputs.";
    }
    return "";
  };
  
  export const validateDepartmentSelection = (departmentsArray) => {
    if (departmentsArray.length === 0) {
      return "At least one department must be selected.";
    }
    return "";
  };
  