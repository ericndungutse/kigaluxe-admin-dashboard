import axios from 'axios';
export const getAllUsersApi = async (token) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
