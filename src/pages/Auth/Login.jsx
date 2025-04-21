import React, { useState } from 'react';
import logoImage from '../../assets/logo.svg';
import labImage from '../../assets/lab.svg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', formData);
    };

    return (
        <div className="flex w-screen h-screen bg-white overflow-hidden">
            {/* Left Column */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full p-4 md:p-8">
                {/* Logo */}
                <div className="mb-6 md:mb-10 flex-shrink-0">
                    <img src={logoImage} alt="BioMuestra logo" className="w-auto h-32 md:h-56" />
                </div>
                {/* Login Form Card */}
                <div className="w-full max-w-sm p-6 md:p-8 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col gap-6">
                    <h2 className="text-gray-900 text-xl font-semibold text-center">
                        Iniciar Sesión
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-gray-700 text-sm font-medium">
                                Usuario
                            </label>
                            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                <svg className="size-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3.5H17C17.9205 3.5 18.6667 4.2462 18.6667 5.16667V13.8333C18.6667 14.7538 17.9205 15.5 17 15.5H3C2.07953 15.5 1.33333 14.7538 1.33333 13.8333V5.16667C1.33333 4.2462 2.07953 3.5 3 3.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M2 4L10 10L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nombre@sga.com"
                                    className="flex-1 bg-transparent text-gray-900 text-sm focus:outline-none placeholder-gray-400"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                                Contraseña
                            </label>
                            <div className="flex items-center px-3.5 py-2.5 bg-gray-50 rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    className="flex-1 bg-transparent text-gray-900 text-sm focus:outline-none placeholder-gray-400"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={formData.remember}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="remember" className="text-gray-700 font-medium">
                                    Recordarme
                                </label>
                            </div>
                            <div>
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-5 py-2.5 bg-indigo-600 rounded-lg text-white text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
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
    );
};

export default Login;
