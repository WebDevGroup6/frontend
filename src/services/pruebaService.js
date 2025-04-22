// filepath: Frontend/src/services/pruebaService.js
import api from "./api";

// Fetch all tests (pruebas)
export const getPruebas = async () => {
  try {
    const response = await api.get("/pruebas");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pruebas:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error fetching tests");
  }
};

// Fetch a single test by ID
export const getPrueba = async (id) => {
  try {
    const response = await api.get(`/pruebas/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching prueba ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error fetching test");
  }
};

// Create a new test
export const createPrueba = async (pruebaData) => {
  try {
    const response = await api.post("/pruebas", pruebaData);
    return response.data; // Contains { message: '...', prueba: {...} }
  } catch (error) {
    console.error(
      "Error creating prueba:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error creating test");
  }
};

// Update an existing test
export const updatePrueba = async (id, pruebaData) => {
  try {
    const response = await api.put(`/pruebas/${id}`, pruebaData);
    return response.data; // Contains { message: '...', prueba: {...} }
  } catch (error) {
    console.error(
      `Error updating prueba ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error updating test");
  }
};

// Delete a test
export const deletePrueba = async (id) => {
  try {
    const response = await api.delete(`/pruebas/${id}`);
    return response.data; // Contains { message: '...' }
  } catch (error) {
    console.error(
      `Error deleting prueba ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error deleting test");
  }
};

// Fetch all test types (tipos de prueba)
export const getTiposPrueba = async () => {
  try {
    const response = await api.get("/pruebas/tipos/all");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tipos de prueba:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Error fetching test types");
  }
};
