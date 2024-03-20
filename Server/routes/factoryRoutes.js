import express from 'express';
import {
  createFactory,
  getFactory,
  getAllFactories,
  updateFactory,
  deleteFactory
} from '../controllers/factoryController.js';

const router = express.Router();

// Create a new factory
router.post('/', createFactory);

// Get a single factory by ID
router.get('/:id', getFactory);

// Get all factories
router.get('/', getAllFactories);

// Update a factory by ID
router.put('/update', updateFactory);

// Delete a factory by ID
router.delete('/:id', deleteFactory);

export default router;
