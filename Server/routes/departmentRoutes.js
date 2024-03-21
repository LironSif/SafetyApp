import express from 'express';
import {
  createMultipleDepartments,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getAllDepartmentsByFactoryId,
  updateDepartments
} from '../controllers/departmentController.js'; // Assuming factoryController2.js is meant for departments

const router = express.Router();

// Create a new department
router.post('/', createMultipleDepartments);

// Get a single department by ID
router.get('/:id', getDepartment);


router.get('/byFactory/:id', getAllDepartmentsByFactoryId );

// Get all departments
router.get('/', getAllDepartments);

// Update a department by ID
router.put('/:id', updateDepartment);

// Add this route to your department routes
router.put('/updateByFactory/:factoryId', updateDepartments); // Match the URL you used in the RTK Query mutation

// Delete a department by ID
router.delete('/:id', deleteDepartment);

export default router;
