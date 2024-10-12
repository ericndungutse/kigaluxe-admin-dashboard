import axios from 'axios';

export const getAllBlogsApi = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};
