import axios from 'axios';

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
