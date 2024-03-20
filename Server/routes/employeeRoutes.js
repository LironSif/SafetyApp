import express from 'express';
import {
  createEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

// Create a new employee
router.post('/', createEmployee);

// Get a single employee by ID
router.get('/:id', getEmployee);

// Get all employees
router.get('/', getAllEmployees);

// Update an employee by ID
router.put('/:id', updateEmployee);

// Delete an employee by ID
router.delete('/:id', deleteEmployee);

export default router;
