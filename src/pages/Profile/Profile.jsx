// filepath: c:\Users\obala\Desktop\Proyectos\Desarrollo web final\Frontend\src\pages\Profile\Profile.jsx
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/userService';
import ProfileForm from '../../components/Profile/ProfileForm';
import { useAuth } from '../../context/AuthContext'; // Importar useAuth

function Profile() {
  const { user, updateUserContext } = useAuth(); // Obtener usuario y función para actualizar contexto
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (err) {
        setError('Error al cargar el perfil. Intente de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (formData) => {
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    try {
      const result = await updateProfile(formData);
      setUpdateSuccess(true);
      // Actualizar el nombre de usuario en el estado local si cambió
      if (formData.nombre_usuario && profileData?.nombre_usuario !== formData.nombre_usuario) {
        setProfileData(prev => ({ ...prev, nombre_usuario: formData.nombre_usuario }));
        // Actualizar también en el contexto de autenticación
        updateUserContext({ ...user, nombre_usuario: formData.nombre_usuario });
      }
      // Opcional: Mostrar mensaje de éxito por unos segundos
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      // El error ya viene formateado desde el servicio
      setUpdateError(err.message || 'Error al actualizar el perfil.');
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Mi Perfil</h1>

        {loading && <p className="text-center text-gray-500">Cargando perfil...</p>}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {updateSuccess && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">Perfil actualizado correctamente.</span>
          </div>
        )}

        {profileData && (
          <ProfileForm
            initialUsername={profileData.nombre_usuario}
            onSubmit={handleProfileUpdate}
            loading={updateLoading}
            error={updateError} // Pasar el error de actualización al formulario
            // onCancel={() => { /* Lógica de cancelación si es necesaria */ }}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
