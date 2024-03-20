import User from '../models/User.js'; // Ensure this import is correct
import Factory from '../models/Factory.js';

// Create a new factory
export const createFactory = async (req, res) => {
  const { userId, factoryName, factoryAddress, ...otherFactoryData } = req.body; // Extract userId, factoryName, and factoryAddress from the request

  // Check if userId is provided in the request body
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  console.log({ name: factoryName, address: factoryAddress, ...otherFactoryData });

  try {
    // Check if the user already has a factory associated
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (existingUser.factory) {
      return res.status(400).json({ message: "Only one factory can be created. You can edit factory details later from the setup page." });
    }

    // Correctly map the factory data to match the schema expectations
    const factoryDataCorrected = { name: factoryName, address: factoryAddress, ...otherFactoryData };
    const newFactory = new Factory(factoryDataCorrected);
    const savedFactory = await newFactory.save();

    // Update the user with the factory ID
    await User.findByIdAndUpdate(userId, { $set: { factory: savedFactory._id } });

    res.status(201).json(savedFactory);
  } catch (err) {
    console.error("Error creating factory:", err);
    if (err.code === 11000) {
      res.status(400).json({ message:  "You have already created a factory. You can edit it later."});
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};


// Get a single factory by ID
export const getFactory = async (req, res) => {
  try {
    const factory = await Factory.findById(req.params.id);
    if (!factory) return res.status(404).json({ message: 'Factory not found' });
    res.json(factory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all factories
export const getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.find();
    res.json(factories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a factory by ID
export const updateFactory = async (req, res) => {
  const { id, employees, ...updateData } = req.body; // Exclude 'employees' from updateData if it's numeric

  // Optional: Convert 'employees' to an array of ObjectId references if needed
  // This step depends on your application logic and how you manage employee references
  // For now, it's ignored assuming 'employees' as a number should not directly update the 'employees' array field

  try {
    const updatePayload = {
      ...updateData,
      // Directly set 'employeeCount' if provided, otherwise, it's not included in the update payload
      ...(typeof updateData.employeeCount === 'number' ? { employeeCount: updateData.employeeCount } : {}),
    };

    const factory = await Factory.findByIdAndUpdate(id, updatePayload, { new: true });
    if (!factory) {
      return res.status(404).json({ message: 'Factory not found' });
    }
    res.json({ message: 'Factory updated successfully', factory });
  } catch (err) {
    res.status(400).json({ message: `Error updating factory: ${err.message}` });
  }
};



// Delete a factory by ID
export const deleteFactory = async (req, res) => {
  try {
    const factory = await Factory.findByIdAndDelete(req.params.id);
    if (!factory) return res.status(404).json({ message: 'Factory not found' });
    res.json({ message: 'Factory deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
