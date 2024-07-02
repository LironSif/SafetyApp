import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to handle file uploads
export const uploadFile = (req, res) => {
  const files = req.files;
  const fileType = req.body.type;

  // Here, you can save file info (name, path, type) to your database
  res.status(200).json({ message: 'Files uploaded successfully', files });
};

// Controller to fetch files by type
export const getFiles = (req, res) => {
  const { type } = req.query;
  const directoryPath = path.join(__dirname, '../uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to scan files' });
    }

    const filteredFiles = files.map(file => ({ name: file, url: `/api/files/uploads/${file}` }));
    res.status(200).json(filteredFiles);
  });
};

// Controller to handle file download
export const downloadFile = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../uploads', fileName);

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error downloading file', error: err });
    }
  });
};
