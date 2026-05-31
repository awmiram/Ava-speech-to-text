import http from './httpService';

export const getRequestsList = async (page = 1) => {
  try {
    const response = await http.get(`/api/requests/?page=${page}&page_size=8&limit=8`);
    return response.data;
  } catch (error) {
    console.error("Error fetching archive list:", error);
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await http.delete(`/api/requests/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
};
