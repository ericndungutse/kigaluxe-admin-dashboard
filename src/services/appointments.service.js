import axios from 'axios';

export const deleteAppointmentApi = async (appointmentId, token) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllAppointmentsApi = async () => {
  try {
    const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/appointment`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.respons.data.error);
  }
};

export const upadteAppointmentApi = async (id, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/appointment/${id}?value=true`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
