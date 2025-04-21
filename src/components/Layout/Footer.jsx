import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">BioMuestra™</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sistema de Gestión de Muestras de Alimentos - Solución integral para el seguimiento desde la recolección hasta los resultados.
            </p>
          </div>
          
          {/* Resources */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <Link to="/documentacion" className="hover:underline">Documentación</Link>
              </li>
              <li className="mb-2">
                <Link to="/ayuda" className="hover:underline">Centro de ayuda</Link>
              </li>
              <li className="mb-2">
                <Link to="/informes" className="hover:underline">Informes</Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Enlaces rápidos</h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <Link to="/muestras" className="hover:underline">Gestión de Muestras</Link>
              </li>
              <li className="mb-2">
                <Link to="/pruebas" className="hover:underline">Pruebas</Link>
              </li>
              <li className="mb-2">
                <Link to="/laboratorios" className="hover:underline">Laboratorios</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <Link to="/privacidad" className="hover:underline">Política de Privacidad</Link>
              </li>
              <li className="mb-2">
                <Link to="/terminos" className="hover:underline">Términos de Uso</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="hover:underline">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        
        {/* Copyright and Social Media */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} <span className="font-semibold">BioMuestra™</span>. Todos los derechos reservados.
          </span>
          <div className="flex mt-4 md:mt-0 space-x-6">
            {/* Social media icons - you can replace with actual icons */}
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
