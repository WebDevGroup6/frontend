import React, { useState } from 'react';

const LoginForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        username: '',
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
        // Pass only username and password to the parent handler
        const { username, password } = formData;
        onSubmit({ username, password });
    };

    return (
        <div className="w-full max-w-sm p-6 md:p-8 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col gap-6">
            <h2 className="text-gray-900 text-xl font-semibold text-center">
                Iniciar Sesión
            </h2>
            {/* Mostrar mensaje de error si existe */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Username */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="username" className="text-gray-700 text-sm font-medium">
                        Nombre de Usuario
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                        <svg className="size-4 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="tu_nombre_de_usuario"
                            className="flex-1 bg-transparent text-gray-900 text-sm focus:outline-none placeholder-gray-400"
                            value={formData.username}
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
                    className="w-full px-5 py-2.5 bg-indigo-600 rounded-lg text-white text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
