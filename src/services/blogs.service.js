import axios from 'axios';

export const deleteBlogApi = async (blogId, token) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllBlogsApi = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};
