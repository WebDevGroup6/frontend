import './index.css'
import { useState } from 'react'
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

// Placeholder for Auth Context/State - replace with actual implementation
const useAuth = () => {
  // In a real app, this would check a token, context, etc.
  // Forcing login first, setting initial state to false might be needed depending on auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false to force login view initially
  // NOTE: You'll need to implement the actual login logic to set this to true later.
  return { isAuthenticated };
};

// Wrapper for routes that require authentication
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


function App() {
  const { isAuthenticated } = useAuth(); // Check auth status
  const location = useLocation();

  // Determine if Navbar and Footer should be shown (not on login page)
  // Ensure layout doesn't show if not authenticated, even if somehow navigated away from /login
  const showLayout = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar />}
      {/* Remove container, mx-auto, px-4, py-8 from main. Keep flex-grow */}
      <main className="flex-grow"> 
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path="/samples" element={<ProtectedRoute><Samples /></ProtectedRoute>} />
          <Route path="/laboratories" element={<ProtectedRoute><Laboratories /></ProtectedRoute>} />
          <Route path="/proveedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
          <Route path="/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
          <Route path="/pruebas" element={<ProtectedRoute><Pruebas /></ProtectedRoute>} />
          <Route path="/resultados" element={<ProtectedRoute><Resultados /></ProtectedRoute>} />

          {/* Redirect root path */}
          {/* Always redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Optional: Add a 404 Not Found page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      {showLayout && <Footer />}
    </div>
  )
}

export default App
