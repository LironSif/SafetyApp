import Factory from '../models/Factory.js';
import FactoryDepartment from '../models/Department.js'; // Ensure this path matches your actual file path

export const createMultipleDepartments = async (req, res) => {
  const { factoryId, departments } = req.body;

  if (!factoryId || !departments || departments.length === 0) {
    return res.status(400).json({ message: "Factory ID and at least one department name are required." });
  }

  try {
    // Check if the specified factory exists
    const factory = await Factory.findById(factoryId);
    if (!factory) {
      return res.status(404).json({ message: "Factory not found." });
    }

    // Filter out departments that already exist in this factory to avoid duplicates
    const existingDepartments = await FactoryDepartment.find({ 
      'name': { $in: departments }, 
      'factoryId': factoryId // Use factoryId to ensure uniqueness within the same factory
    });

    const existingDepartmentNames = existingDepartments.map(dep => dep.name);
    const newDepartmentNames = departments.filter(name => !existingDepartmentNames.includes(name));

    if (newDepartmentNames.length === 0) {
      return res.status(400).json({ message: "All department names already exist in the factory." });
    }

    // Create new departments including the factoryId for each department
    const newDepartments = newDepartmentNames.map(name => ({
      name,
      factoryId // Include the factoryId here
    }));
    const createdDepartments = await FactoryDepartment.insertMany(newDepartments);

    // Update the factory to include new departments
    const updatedFactory = await Factory.findByIdAndUpdate(
      factoryId, 
      { $push: { departments: { $each: createdDepartments.map(dep => dep._id) } } },
      { new: true }
    ).populate('departments');

    res.status(201).json({ factory: updatedFactory, newDepartments: createdDepartments });
  } catch (err) {
    console.error("Error creating departments:", err);
    res.status(400).json({ message: err.message });
  }
};


// Get a single department by ID
export const getDepartment = async (req, res) => {
  try {
    const department = await FactoryDepartment.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDepartmentsByFactoryId = async (req, res) => {
  try {
    const factoryId = req.params.id; // Extract factoryId from query parameters
    if (!factoryId) {
      return res.status(400).json({ message: "Factory ID is required" });
    }
    const departments = await FactoryDepartment.find({ factoryId });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await FactoryDepartment.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a department by ID
export const updateDepartment = async (req, res) => {
  try {
    const department = await FactoryDepartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a department by ID
export const deleteDepartment = async (req, res) => {
  try {
    const department = await FactoryDepartment.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
