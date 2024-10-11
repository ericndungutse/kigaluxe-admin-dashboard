import axios from 'axios';

export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/place?limit=100`);

    return response.data.data;
  } catch (error) {
    c;
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
