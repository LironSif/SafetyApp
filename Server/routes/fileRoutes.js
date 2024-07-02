import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  uploadFile,
  getFiles,
  downloadFile
} from '../controllers/fileController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload a file
router.post('/upload', upload.array('files'), uploadFile);

// Get files by type
router.get('/', getFiles);

// Download a file
router.get('/download/:fileName', downloadFile);

// Serve static files from the uploads directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default router;
