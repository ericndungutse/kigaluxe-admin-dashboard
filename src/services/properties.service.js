import axios from 'axios';

export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
