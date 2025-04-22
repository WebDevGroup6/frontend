import React, { useState, useEffect } from 'react';

// Define initialFormData outside the component
const initialFormData = {
  codigo: '',
  rnc: '',
  nombre: '',
  direccion: '',
  contacto: '',
  municipio: '',
  estado: 'Activo',
};

function ProveedorForm({ proveedor, onSubmit, onCancel, loading, error }) {
  const isEditMode = !!proveedor;

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && proveedor) {
      setFormData({
        codigo: proveedor.codigo || '',
        rnc: proveedor.rnc || '',
        nombre: proveedor.nombre || '',
        direccion: proveedor.direccion || '',
        contacto: proveedor.contacto || '',
        municipio: proveedor.municipio || '',
        estado: proveedor.estado || 'Activo',
      });
    } else {
      // Reset form only if not in edit mode or proveedor becomes null
      if (!isEditMode) {
        setFormData(initialFormData);
      }
    }
  }, [proveedor, isEditMode]); // Removed initialFormData from dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.codigo || !formData.rnc || !formData.nombre || !formData.direccion || !formData.contacto || !formData.municipio) {
      alert('Por favor, complete todos los campos marcados con *.');
      return;
    }
    if (formData.rnc && !/^[0-9]{9,11}$/.test(formData.rnc)) {
      alert('El RNC debe ser numérico y tener entre 9 y 11 dígitos.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {isEditMode ? 'Editar Proveedor' : 'Añadir Nuevo Proveedor'}
      </h3>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código *</label>
          <input
            type="text"
            name="codigo"
            id="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            disabled={isEditMode}
            aria-describedby="codigo-help"
          />
          {isEditMode && <p id="codigo-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">El código no se puede modificar.</p>}
        </div>
        <div>
          <label htmlFor="rnc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RNC *</label>
          <input
            type="text"
            name="rnc"
            id="rnc"
            value={formData.rnc}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            pattern="^[0-9]{9,11}$"
            title="Debe ser numérico, 9 u 11 dígitos"
          />
        </div>
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección *</label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="contacto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto (Email/Tel) *</label>
          <input
            type="text"
            name="contacto"
            id="contacto"
            value={formData.contacto}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="municipio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipio *</label>
          <input
            type="text"
            name="municipio"
            id="municipio"
            value={formData.municipio}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
          <select
            name="estado"
            id="estado"
            value={formData.estado}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          // Standard secondary/cancel button style
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          // Standard primary action button style
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Proveedor' : 'Añadir Proveedor')}
        </button>
      </div>
    </form>
  );
}

export default ProveedorForm;
