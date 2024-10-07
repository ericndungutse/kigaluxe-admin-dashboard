import axios from 'axios';

export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties`);

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const addProperty = async (
  propertyData,
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkZHU3b3h6ei5PUXRTLjluWmh1LlZmZW1wak5obE14b0V3M1RRcVlzZy51WG0vMHVJYm5WQ0siLCJpYXQiOjE3MjgzMzUxODR9.xKhruPdK-Rze7Yp4c-09jrQA84WrTJ1mdqQp0Ubyd-Y'
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/properties`,
      {
        ...propertyData,
        property_type: 1,
        location: 1,
      },
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
