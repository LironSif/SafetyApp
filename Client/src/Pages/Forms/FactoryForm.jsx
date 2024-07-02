import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetFilesQuery, useUploadFileMutation } from '../../services/fileApi';
import './Forms.css';

const FactoryForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: files = [], refetch } = useGetFilesQuery('factory');
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    fetchPreExistingFiles();
  }, []);

  const fetchPreExistingFiles = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const formData = new FormData();
    uploadedFiles.forEach(file => formData.append('files', file));
    formData.append('type', 'factory');
    await uploadFile(formData);
    refetch();
  };

  const handleFileDownload = (fileUrl) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileUrl.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="form-container">
      <h2>Factory Form</h2>
      <input type="file" accept=".pdf" multiple onChange={handleFileUpload} />
      <input
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="file-list">
        {filteredFiles.map((file, index) => (
          <div key={index} className="file-item">
            <span>{file.name}</span>
            <button onClick={() => handleFileDownload(file.url)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryForm;
