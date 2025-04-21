import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("CRITICAL: VITE_API_BASE_URL is not defined in the .env file.");
  // Consider throwing an error or providing a default fallback if appropriate
  // throw new Error("API base URL is not configured.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
});

// --- Interceptor to add JWT token to requests ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// --- Optional: Interceptor to handle responses (e.g., for 401 Unauthorized) ---
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      console.error(
        "Unauthorized access - 401. Potentially redirecting to login."
      );
      // Clear stored token/user data
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      // Optionally trigger logout logic from AuthContext or redirect
      // This might require more complex state management or event bus
      // For simplicity, a hard redirect might be used:
      // window.location.href = '/login';
    }
    // Return the error so it can be caught by the calling function
    return Promise.reject(error);
  }
);

export default apiClient;
