import apiClient from "./api"; // Import the configured Axios instance

const API_URL = "http://localhost:3000/api/employees/";

// Placeholder function: Implement this to retrieve your stored JWT
/* // Commenting out getToken function
const getToken = () => {
  // Example: return localStorage.getItem('authToken');
  return null; // Replace with your actual token retrieval logic
};
*/

// Helper function to create headers with Authorization token
/* // Commenting out createAuthHeaders function
const createAuthHeaders = () => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
*/

/**
 * Fetches all employees from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of employees.
 */
export const getEmployees = async () => {
  try {
    const response = await apiClient.get("/employees"); // Use apiClient
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error.response || error.message);
    throw error; // Re-throw the error to be handled by the component
  }
};

/**
 * Fetches a single employee by ID.
 * @param {string|number} id The ID of the employee to fetch.
 * @returns {Promise<Object>} A promise that resolves to the employee object.
 */
export const getEmployeeById = async (id) => {
  try {
    const response = await apiClient.get(`/employees/${id}`); // Use apiClient instead
    return response.data; // Return data directly from Axios response
  } catch (error) {
    console.error(
      `Error fetching employee with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};

/**
 * Creates a new employee.
 * @param {Object} employeeData The data for the new employee (cedula, nombre, cargo, contacto, estado, fecha_contratacion, salario).
 * @returns {Promise<Object>} A promise that resolves to the newly created employee object.
 */
export const createEmployee = async (employeeData) => {
  try {
    const response = await apiClient.post("/employees", employeeData); // Use apiClient
    return response.data.employee || response.data; // Return data from Axios response
  } catch (error) {
    console.error("Error creating employee:", error.response || error.message);
    throw error;
  }
};

/**
 * Updates an existing employee.
 * @param {string|number} id The ID of the employee to update.
 * @param {Object} employeeData The updated data for the employee.
 * @returns {Promise<Object>} A promise that resolves to the updated employee object.
 */
export const updateEmployee = async (id, employeeData) => {
  // Remove id_empleado field if it exists to prevent conflicts
  const { id_empleado, ...updateData } = employeeData;
  // Token logic moved to createAuthHeaders helper - Commented out

  try {
    const response = await apiClient.put(`/employees/${id}`, updateData); // Use apiClient
    return response.data.employee || response.data; // Return data from Axios response
  } catch (error) {
    console.error(
      `Error updating employee with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};

/**
 * Deletes an employee by ID.
 * @param {string|number} id The ID of the employee to delete.
 * @returns {Promise<Object>} A promise that resolves to the success message.
 */
export const deleteEmployee = async (id) => {
  try {
    const response = await apiClient.delete(`/employees/${id}`); // Use apiClient
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting employee with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};
