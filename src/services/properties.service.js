import axios from 'axios';

export const fetchProperties = async (page) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties?page=${page}`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const addProperty = async (propertyData, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/properties`,
      {
        ...propertyData,
        imageIds: [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updatePropertyApi = async (propertyData, propertyId, token) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/properties/${propertyId}`, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deletePropertyApi = async (propertyId, token) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const uploadPropertyImageApi = async (propertyId, formData, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/properties/img/${propertyId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const filterProperty = async (query, page) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search?${query}&page=${page}&limit=2`);

    return response.data.data;
  } catch (error) {
    const message = error.response.data.error
      ? error.response.data.error
      : error.response.data.message
      ? error.response.data.message
      : 'An error has occured';

    throw new Error(message);
  }
};
