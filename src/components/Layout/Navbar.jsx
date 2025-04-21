import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink for active styling

function Navbar() {
  // Placeholder for user role - replace with actual logic from context/auth state
  const isAdmin = true; // Example: Assume user is admin

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-700 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
      : "text-gray-700 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium";


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Replace with your actual logo */}
          <img src="/src/assets/react.svg" className="h-8" alt="BioMuestra Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BioMuestra</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* User Profile Dropdown Button - Add dropdown logic later */}
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
              <span className="sr-only">Open user menu</span>
              {/* Replace with user avatar or icon */}
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">?</div>
            </button>
            {/* Dropdown menu - Add content and visibility logic */}
            {/*
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">User Name</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">user@example.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a></li>
              </ul>
            </div>
            */}
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isAdmin && ( // Conditionally render Employees link
              <li>
                <NavLink to="/employees" className={navLinkClass}>Empleados</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/samples" className={navLinkClass}>Muestras</NavLink>
            </li>
            <li>
              <NavLink to="/laboratories" className={navLinkClass}>Laboratorios</NavLink>
            </li>
            <li>
              <NavLink to="/proveedores" className={navLinkClass}>Proveedores</NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={navLinkClass}>Productos</NavLink>
            </li>
            <li>
              <NavLink to="/pruebas" className={navLinkClass}>Pruebas</NavLink>
            </li>
             <li>
              <NavLink to="/resultados" className={navLinkClass}>Resultados</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
