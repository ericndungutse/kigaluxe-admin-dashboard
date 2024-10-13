import React, { useState } from 'react';
import axios from 'axios';

const PropertyImageUpload = ({ propertyId }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    setError('');
    setSuccessMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    setUploading(true);

    try {
      const response = await axios.post(`/api/properties/${propertyId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Upload Property Images</h2>

      {error && <p className='text-red-600 mb-4'>{error}</p>}
      {successMessage && <p className='text-green-600 mb-4'>{successMessage}</p>}

      <form onSubmit={handleUpload}>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Select Images:</label>
          <input
            type='file'
            multiple
            onChange={handleFileChange}
            className='block w-full text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2'
          />
        </div>

        <button
          type='submit'
          className={`w-full px-4 py-2 text-white rounded-md bg-indigo-500 hover:bg-indigo-600 focus:outline-none ${
            uploading ? 'opacity-50' : ''
          }`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>
    </div>
  );
};

export default PropertyImageUpload;
