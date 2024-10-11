import axios from 'axios';

export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/place`);

    return response.data.data;
  } catch (error) {
    c;
    throw error;
  }
};

export const addLocationApi = async (locationData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/place`, locationData);

    return response.data;
  } catch (error) {
    throw error;
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
