import axios from 'axios';

export const updateBlogApi = async (blogId, blogData, token) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const createBlogApi = async (blogData, token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blog`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

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

export const getAllBlogsApi = async (page) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs?page=${page}`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const uploadBlogImageApi = async (blogId, formData, token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blog/img/${blogId}`, formData, {
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

export const searchBlog = async (query, page) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/blog/search?entry=${query}&page=${page}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
