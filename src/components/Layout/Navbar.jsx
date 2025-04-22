import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import logoSvg from '../../assets/logo.svg'; // Import the logo
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Example using Heroicons
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout from context
  // Determine isAdmin based on user role (adjust 'rol' and 'Admin' as needed)
  const isAdmin = user?.rol === 'Admin'; // Example: Check if user role is Admin
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const navigate = useNavigate(); // Initialize useNavigate

  // Use the logout function from context
  const handleLogout = () => {
    logout(); // Call the context's logout function
    setIsDropdownOpen(false); // Close dropdown
    navigate('/login'); // Redirect to login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


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

          {/* Profile/Logout Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}> {/* Added relative positioning and ref */}
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Abrir menú de usuario"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              {/* Display user initial or icon */}
              {user ? (
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white">
                  {user.nombre_usuario ? user.nombre_usuario.charAt(0).toUpperCase() : <UserCircleIcon className="h-6 w-6" />}
                </span>
              ) : (
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                <Link
                  to="/profile" // Adjust the path as needed
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
