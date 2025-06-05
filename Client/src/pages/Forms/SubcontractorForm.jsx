import React, { useState } from 'react';
import { useGetFilesQuery, useUploadFileMutation, useDownloadFileQuery } from '../../services/fileApi';
import './Forms.css';

const SubcontractorForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: files = [], refetch } = useGetFilesQuery('subcontractor');
  const [uploadFile] = useUploadFileMutation();
  const { data: downloadData, refetch: refetchDownload } = useDownloadFileQuery();

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const formData = new FormData();
    uploadedFiles.forEach(file => formData.append('files', file));
    formData.append('type', 'subcontractor');
    await uploadFile(formData);
    refetch();
  };

  const handleFileDownload = (fileName) => {
    refetchDownload(fileName);
    const url = URL.createObjectURL(new Blob([downloadData]));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="form-container">
      <h2>Subcontractor Form</h2>
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
            <button onClick={() => handleFileDownload(file.name)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcontractorForm;
