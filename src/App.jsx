import './index.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Page Components
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Samples from './pages/Samples/Samples';
import Laboratories from './pages/Laboratories/Laboratories';
import Proveedores from './pages/Proveedores/Proveedores';
import Productos from './pages/Productos/Productos';
import Pruebas from './pages/Pruebas/Pruebas';
import Resultados from './pages/Resultados/Resultados';

// Import AuthProvider and useAuth from the context file
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const location = useLocation();

  // Show Navbar and Footer on all pages except /login
  const showLayout = location.pathname !== '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar />}
      {/* Remove container, mx-auto, px-4, py-8 from main. Keep flex-grow */}
      <main className="flex-grow">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* All routes are now public */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/samples" element={<Samples />} />
          <Route path="/laboratories" element={<Laboratories />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/resultados" element={<Resultados />} />

          {/* Redirect root path to dashboard (or login if preferred) */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Optional: Add a 404 Not Found page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      {showLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    // Use the imported AuthProvider
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
