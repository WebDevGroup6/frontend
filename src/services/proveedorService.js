import api from "./api";

// Define the expected primary key for suppliers
const SUPPLIER_ID_KEY = "id_proveedor"; // Adjust if your backend uses a different key

// Fetch all suppliers (potentially with filters/pagination in the future)
export const getProveedores = async () => {
  try {
    const response = await api.get("/proveedores");
    // Ensure each supplier has the consistent ID key
    return response.data.map((supplier) => ({
      ...supplier,
      id: supplier[SUPPLIER_ID_KEY], // Add a consistent 'id' field if needed by components
    }));
  } catch (error) {
    console.error(
      "Error fetching suppliers:",
      error.response?.data || error.message
    );
    throw error; // Re-throw to be caught by the hook/component
  }
};

// Fetch a single supplier by ID
export const getProveedorById = async (id) => {
  try {
    const response = await api.get(`/proveedores/${id}`);
    return { ...response.data, id: response.data[SUPPLIER_ID_KEY] };
  } catch (error) {
    console.error(
      `Error fetching supplier with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new supplier
export const createProveedor = async (proveedorData) => {
  try {
    const response = await api.post("/proveedores", proveedorData);
    return { ...response.data, id: response.data[SUPPLIER_ID_KEY] };
  } catch (error) {
    console.error(
      "Error creating supplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing supplier
export const updateProveedor = async (id, proveedorData) => {
  try {
    const response = await api.put(`/proveedores/${id}`, proveedorData);
    return { ...response.data, id: response.data[SUPPLIER_ID_KEY] };
  } catch (error) {
    console.error(
      `Error updating supplier with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a supplier
export const deleteProveedor = async (id) => {
  try {
    const response = await api.delete(`/proveedores/${id}`);
    return response.data; // Usually a success message
  } catch (error) {
    console.error(
      `Error deleting supplier with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Add function for generating reports (implementation depends on backend)
export const generateProveedoresReport = async (format = "pdf") => {
  try {
    // Example: Endpoint might accept a format query parameter
    const response = await api.get(`/proveedores/report?format=${format}`, {
      responseType: "blob", // Important for handling file downloads
    });
    // Handle the blob response (e.g., trigger download)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    const contentDisposition = response.headers["content-disposition"];
    let filename = `reporte_proveedores.${format}`; // Default filename
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      if (filenameMatch && filenameMatch.length === 2)
        filename = filenameMatch[1];
    }
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, filename };
  } catch (error) {
    console.error(
      "Error generating suppliers report:",
      error.response?.data || error.message
    );
    // Try to parse error message if the response was JSON (e.g., backend error)
    if (
      error.response &&
      error.response.data instanceof Blob &&
      error.response.data.type.includes("json")
    ) {
      const errJson = await error.response.data.text();
      try {
        const parsedError = JSON.parse(errJson);
        throw new Error(parsedError.message || `Error generating report.`);
      } catch (parseError) {
        // Fallback if parsing fails
        throw new Error(
          `Error generating report. Status: ${error.response.status}`
        );
      }
    }
    throw error; // Re-throw original error if not handled above
  }
};
