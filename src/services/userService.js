// filepath: c:\Users\obala\Desktop\Proyectos\Desarrollo web final\Frontend\src\services\userService.js
import api from "./api";

// Obtener el perfil del usuario actual
export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Actualizar el perfil del usuario actual
export const updateProfile = async (profileData) => {
  // profileData debe contener { nombre_usuario?, current_password?, new_password? }
  try {
    const response = await api.put("/user/profile", profileData);
    return response.data; // Generalmente un mensaje de éxito
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    // Lanza el error para que el componente pueda manejarlo (mostrar mensaje al usuario)
    throw (
      error.response?.data ||
      new Error(error.message || "Error desconocido al actualizar perfil")
    );
  }
};
