import apiClient from "./api"; // Import the configured Axios instance

/**
 * Fetches all products from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    console.log("Response from API (Products):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response || error.message);
    throw error;
  }
};

/**
 * Fetches a single product by ID.
 * @param {string|number} id The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching product with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};

/**
 * Creates a new product.
 * @param {Object} productData The data for the new product.
 * @returns {Promise<Object>} A promise that resolves to the newly created product object.
 */
export const createProduct = async (productData) => {
  try {
    // Adjust endpoint and data structure as needed by your backend
    const response = await apiClient.post("/products", productData);
    // Assuming backend returns the created product within a 'product' key or directly
    return response.data.product || response.data;
  } catch (error) {
    console.error("Error creating product:", error.response || error.message);
    throw error;
  }
};

/**
 * Updates an existing product.
 * @param {string|number} id The ID of the product to update.
 * @param {Object} productData The updated data for the product.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 */
export const updateProduct = async (id, productData) => {
  try {
    // Adjust endpoint as needed
    const response = await apiClient.put(`/products/${id}`, productData);
    // Assuming backend returns the updated product within a 'product' key or directly
    return response.data.product || response.data;
  } catch (error) {
    console.error(
      `Error updating product with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};

/**
 * Deletes a product by ID.
 * @param {string|number} id The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
export const deleteProduct = async (id) => {
  try {
    // Adjust endpoint as needed
    await apiClient.delete(`/products/${id}`);
  } catch (error) {
    console.error(
      `Error deleting product with ID ${id}:`,
      error.response || error.message
    );
    throw error;
  }
};
