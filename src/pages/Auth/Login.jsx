import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import logoImage from '../../assets/logo.svg';
import labImage from '../../assets/lab.svg';
import { loginUser } from '../../services/authService'; // Re-enable API call
import LoginForm from '../../components/Forms/LoginForm';
import Footer from '../../components/Layout/Footer';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth(); // Get isAuthenticated from context

    // Redirect if already authenticated
    if (isAuthenticated) {
        console.log('User already authenticated, redirecting to dashboard...');
        return <Navigate to="/dashboard" replace />;
    }

    const handleLoginSubmit = async (formData) => {
        setError(null);
        setLoading(true);
        console.log('Attempting login with:', formData); // Log form data

        try {
            // Call the actual API service function
            const data = await loginUser(formData.username, formData.password);
            console.log('Login API response:', data);

            // Check if the response contains the token and user data
            if (data && data.token && data.user) {
                // Use the login function from context to store token and user data
                login(data.token, data.user); // Pass both token and user
                console.log('Login successful, navigating to dashboard...');
                navigate('/dashboard'); // Redirect on successful login
            } else {
                // Handle cases where token or user might be missing
                throw new Error(data.message || 'Respuesta de inicio de sesión incompleta desde la API (falta token o usuario).');
            }

        } catch (err) {
            console.error('Login failed:', err);
            // Use the error message from the API if available, otherwise a generic one
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex flex-grow w-full overflow-hidden">
                {/* Left Column */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full p-4 md:p-8">
                    {/* Logo */}
                    <div className="mb-6 md:mb-10 flex-shrink-0">
                        <img src={logoImage} alt="BioMuestra logo" className="w-auto h-32 md:h-56" />
                    </div>
                    {/* Login Form Component */}
                    <LoginForm
                        onSubmit={handleLoginSubmit}
                        loading={loading}
                        error={error}
                    />
                </div>
                {/* Right Column: Image */}
                <div className="hidden md:block md:w-1/2 h-full">
                    <img
                        src={labImage}
                        alt="Laboratory background"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
