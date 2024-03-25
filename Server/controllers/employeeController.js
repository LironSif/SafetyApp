import FactoryEmployee from '../models/Employee.js'; // Adjust the path as per your directory structure
import Factory from '../models/Factory.js'; // Adjust the path as per your directory structure

export const createEmployee = async (req, res) => {
  let { emails, factoryId } = req.body; // 'emails' can be a string or an array

  // If 'emails' is a string, convert it to an array with a single element
  if (typeof emails === 'string') {
    emails = [emails];
  }

  // Validation for 'emails' and 'factoryId'
  if (!emails || !emails.length || !factoryId) {
    return res.status(400).json({ message: 'Missing emails or factoryId' });
  }

  try {
    let existingEmails = [];
    let newEmployeeIds = [];

    // Check each email for existence before creating a new employee
    for (const email of emails) {
      const employeeExists = await FactoryEmployee.findOne({ email });
      if (employeeExists) {
        existingEmails.push(email);
      } else {
        const newEmployee = new FactoryEmployee({ email, factory: factoryId }); // Include factory reference
        const savedEmployee = await newEmployee.save();
        newEmployeeIds.push(savedEmployee._id);
      }
    }

    if (existingEmails.length) {
      // If there are existing emails, send a message back indicating which emails already exist
      return res.status(400).json({ 
        message: 'Some emails already exist and were not added.', 
        existingEmails 
      });
    }

    // Update the factory to include these new employees
    if (newEmployeeIds.length) {
      await Factory.findByIdAndUpdate(
        factoryId,
        { $push: { employees: { $each: newEmployeeIds } } }, // Use $each to push multiple values
        { new: true }
      );
    }

    res.status(201).json({ message: 'Employees created successfully', employeeIds: newEmployeeIds });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get a single employee by ID
export const getEmployee = async (req, res) => {
  try {
    const employee = await FactoryEmployee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await FactoryEmployee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
  try {
    const employee = await FactoryEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await FactoryEmployee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
