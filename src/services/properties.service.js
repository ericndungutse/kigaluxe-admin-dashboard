import axios from 'axios';

export const fetchProperties = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/properties');

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
