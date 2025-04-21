import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg'; // Import the logo
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Example using Heroicons

function Navbar() {
  // Placeholder for user role - replace with actual logic from context/auth state
  const isAdmin = true;
  // Placeholder for logout function - replace with actual logic
  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here (e.g., clear auth state, redirect to login)
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-700 text-base font-medium font-['Inter'] leading-normal"
      : "text-gray-900 text-base font-medium font-['Inter'] leading-normal hover:text-blue-700";

  return (
    <div className="w-full h-32 relative">
      <nav className="w-full h-32 py-6 bg-indigo-600/5 flex justify-center items-center">
        <div className="w-[1280px] flex justify-between items-center gap-8"> {/* Changed justify-start to justify-between */}
          {/* Logo and Brand */}
          <Link to="/dashboard" className="flex justify-start items-center gap-3">
            <img src={logoSvg} className="w-36 h-16" alt="BioMuestra Logo" />
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-start items-center gap-8"> {/* Removed flex-1 */}
            {isAdmin && (
              <NavLink to="/employees" className={navLinkClass}>
                <div className="inline-flex flex-col justify-center items-start">
                  <span>Empleados</span>
                </div>
              </NavLink>
            )}
            <NavLink to="/samples" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Muestras</span>
              </div>
            </NavLink>
            <NavLink to="/laboratories" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Laboratorios</span>
              </div>
            </NavLink>
            <NavLink to="/proveedores" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Proveedores</span>
              </div>
            </NavLink>
            <NavLink to="/productos" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Productos</span>
              </div>
            </NavLink>
            <NavLink to="/pruebas" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Pruebas</span>
              </div>
            </NavLink>
            <NavLink to="/resultados" className={navLinkClass}>
              <div className="inline-flex flex-col justify-center items-start">
                <span>Resultados</span>
              </div>
            </NavLink>
          </div>

          {/* Profile/Logout Icon */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Cerrar sesión"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
