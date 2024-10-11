import axios from 'axios';

export const addCategoryApi = async (category) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, category);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};

export const updateCategoryApi = async (category, id) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`, category);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`);
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};
