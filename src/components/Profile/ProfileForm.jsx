// filepath: c:\Users\obala\Desktop\Proyectos\Desarrollo web final\Frontend\src\components\Profile\ProfileForm.jsx
import React, { useState, useEffect } from 'react';

function ProfileForm({ initialUsername, onSubmit, onCancel, loading, error }) {
  const [formData, setFormData] = useState({
    nombre_usuario: initialUsername || '',
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  useEffect(() => {
    // Actualiza el nombre de usuario si cambia el prop inicial
    setFormData(prev => ({ ...prev, nombre_usuario: initialUsername || '' }));
  }, [initialUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre_usuario, current_password, new_password, confirm_new_password } = formData;

    // Validaciones
    if (!nombre_usuario.trim()) {
      alert('El nombre de usuario no puede estar vacío.');
      return;
    }

    const updatePayload = { nombre_usuario: nombre_usuario.trim() };

    // Si se intenta cambiar la contraseña
    if (new_password) {
      if (!current_password) {
        alert('Por favor, ingrese su contraseña actual para cambiarla.');
        return;
      }
      if (new_password.length < 6) { // Ejemplo de validación de longitud
        alert('La nueva contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (new_password !== confirm_new_password) {
        alert('La nueva contraseña y la confirmación no coinciden.');
        return;
      }
      updatePayload.current_password = current_password;
      updatePayload.new_password = new_password;
    }

    onSubmit(updatePayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Editar Perfil
      </h3>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{typeof error === 'string' ? error : error.message || 'Ocurrió un error.'}</span>
        </div>
      )}
      <div>
        <label htmlFor="nombre_usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario *</label>
        <input
          type="text"
          name="nombre_usuario"
          id="nombre_usuario"
          value={formData.nombre_usuario}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">Cambiar Contraseña (Opcional)</h4>

      <div>
        <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña Actual</label>
        <input
          type="password"
          name="current_password"
          id="current_password"
          value={formData.current_password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Ingrese si desea cambiar la contraseña"
        />
      </div>

      <div>
        <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva Contraseña</label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Dejar en blanco si no desea cambiar"
        />
      </div>

      <div>
        <label htmlFor="confirm_new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          name="confirm_new_password"
          id="confirm_new_password"
          value={formData.confirm_new_password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Repita la nueva contraseña"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
