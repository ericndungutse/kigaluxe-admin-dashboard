import axios from 'axios';

export const deleteLocationApi = async (locationId, token) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/place/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllLocations = async (page) => {
  const url = page
    ? `${import.meta.env.VITE_BACKEND_URL}/api/place?page=${page}`
    : `${import.meta.env.VITE_BACKEND_URL}/api/place`;

  try {
    const response = await axios.get(url);

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addLocationApi = async (locationData, token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/place`, locationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateLocationApi = async (locationData, locationId, token) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/place/${locationId}`, locationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const uploadLocationImageApi = async (locationId, formData, token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/place/img/${locationId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const searchLocation = async (query, page) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/place/search?location=${query}&page=${page}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
