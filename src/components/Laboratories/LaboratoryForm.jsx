import React, { useState, useEffect } from 'react';

export default function LaboratoryForm({ laboratory, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '', // Added nombre field
    direccion: '',
    contacto: '',
    capacidad: '', // Assuming capacity is a number, handle validation if needed
    horario: '', // e.g., "L-V 8:00-17:00"
    estado: 'Activo', // Default state
    // Add other fields from your model as needed
  });

  const isEditMode = Boolean(laboratory);

  useEffect(() => {
    if (isEditMode && laboratory) {
      // Pre-fill form if in edit mode
      setFormData({
        codigo: laboratory.codigo || '',
        nombre: laboratory.nombre || '', // Added nombre
        direccion: laboratory.direccion || '',
        contacto: laboratory.contacto || '',
        capacidad: laboratory.capacidad || '',
        horario: laboratory.horario || '',
        estado: laboratory.estado || 'Activo',
        // Set other fields
      });
    }
  }, [laboratory, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example (add more as needed)
    if (!formData.codigo || !formData.nombre || !formData.direccion) {
      alert('Por favor, complete los campos obligatorios: Código, Nombre, Dirección.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {isEditMode ? 'Editar Laboratorio' : 'Añadir Nuevo Laboratorio'}
      </h3>
      <div className="grid gap-4 mb-4 grid-cols-2">
        {/* Código */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código *</label>
          <input
            type="text"
            name="codigo"
            id="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Ej: LAB001"
            required
            disabled={isEditMode} // Disable code editing if needed
          />
        </div>
        {/* Nombre */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Nombre del Laboratorio"
            required
          />
        </div>
        {/* Dirección */}
        <div className="col-span-2">
          <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección *</label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Dirección completa"
            required
          />
        </div>
        {/* Contacto */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="contacto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto</label>
          <input
            type="text"
            name="contacto"
            id="contacto"
            value={formData.contacto}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Nombre o teléfono de contacto"
          />
        </div>
        {/* Capacidad */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="capacidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacidad</label>
          <input
            type="number" // Use number type
            name="capacidad"
            id="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Número de puestos"
            min="0" // Optional: set minimum value
          />
        </div>
        {/* Horario */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="horario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario</label>
          <input
            type="text"
            name="horario"
            id="horario"
            value={formData.horario}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Ej: L-V 8am-5pm"
          />
        </div>
        {/* Estado */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            {/* Add other relevant statuses */}
          </select>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-end items-center pt-4 border-t border-gray-200 dark:border-gray-600 space-x-3"> {/* Added space-x-3 */}
        <button
          type="button"
          onClick={onCancel}
          // Standard secondary/cancel button style
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          // Standard primary action button style
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Laboratorio' : 'Añadir Laboratorio')}
        </button>
      </div>
    </form>
  );
}
