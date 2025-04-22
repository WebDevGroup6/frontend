import api from "./api"; // Assuming api.js setup for axios instance

const API_URL = "/laboratories"; // Adjust if your backend route is different

// Fetch all laboratories
export const getLaboratories = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching laboratories:", error);
    throw error; // Re-throw to be caught by the hook
  }
};

// Create a new laboratory
export const createLaboratory = async (laboratoryData) => {
  try {
    const response = await api.post(API_URL, laboratoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating laboratory:", error);
    throw error;
  }
};

// Update an existing laboratory
export const updateLaboratory = async (id, laboratoryData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, laboratoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating laboratory with ID ${id}:`, error);
    throw error;
  }
};

// Delete a laboratory
export const deleteLaboratory = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data; // Or handle success confirmation
  } catch (error) {
    console.error(`Error deleting laboratory with ID ${id}:`, error);
    throw error;
  }
};

// Fetch a single laboratory by ID (Optional, if needed)
export const getLaboratoryById = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching laboratory with ID ${id}:`, error);
    throw error;
  }
};
