import apiClient from "./api"; // Import the configured Axios instance

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("Error: VITE_API_BASE_URL no está definida en el archivo .env");
  // Podrías lanzar un error aquí o manejarlo de otra forma si es crítico para la app
}

/**
 * Realiza la petición de inicio de sesión a la API.
 * @param {string} username - El nombre de usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} - Promesa que resuelve con los datos del usuario y el token si el login es exitoso.
 * @throws {Error} - Lanza un error si la petición falla o las credenciales son incorrectas.
 */
export const loginUser = async (username, password) => {
  try {
    // Use apiClient instead of axios directly
    // Send payload with 'nombre_usuario' and 'passwrd'
    const response = await apiClient.post("/auth/login", {
      nombre_usuario: username, // Use correct field name
      passwrd: password, // Use correct field name
    });

    // Expect { message: '...', token: '...', user: {...} }
    if (response.data && response.data.token && response.data.user) {
      // Check for token and user
      return response.data; // Return the whole data object (message, token, user)
    } else {
      throw new Error(
        response.data?.message ||
          "Respuesta de login inválida o faltan datos (token/usuario)"
      );
    }
  } catch (error) {
    console.error("Login API error:", error.response || error.message);
    // Throw a more specific error message if available from the API response
    throw new Error(
      error.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales."
    );
  }
};

// Add other auth-related API calls here using apiClient if needed
// e.g., register, forgot password, etc.
