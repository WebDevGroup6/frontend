import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api'; // Import apiClient to set headers

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token in localStorage on initial load
        const token = localStorage.getItem('authToken'); // Use 'authToken'
        const storedUser = localStorage.getItem('authUser');
        if (token && storedUser) {
            // TODO: Add token validation logic here (e.g., check expiration)
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
                // Set the token in apiClient headers for subsequent requests
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (e) {
                console.error("Failed to parse stored user data", e);
                localStorage.removeItem('authUser');
                localStorage.removeItem('authToken'); // Clear invalid token too
            }
        }
        setLoading(false); // Finished initial check
    }, []);

    const login = (token, userData) => { // Accept token parameter
        localStorage.setItem('authToken', token); // Use 'authToken'
        localStorage.setItem('authUser', JSON.stringify(userData));
        // Set the token in apiClient headers immediately after login
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Use 'authToken'
        localStorage.removeItem('authUser');
        // Remove the token from apiClient headers on logout
        delete apiClient.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        setUser(null);
        // Optionally redirect to login page
        // window.location.href = '/login'; // Force reload/redirect if needed
    };

    // Don't render children until initial auth check is complete
    if (loading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
