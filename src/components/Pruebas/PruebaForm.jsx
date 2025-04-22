// filepath: Frontend/src/components/Pruebas/PruebaForm.jsx
import React, { useState, useEffect } from 'react';

const PruebaForm = ({
  onSubmit,
  initialData = { id_tipo: '', descripcion: '', estado: 'Pendiente' },
  tiposPrueba = [], // Array of { id_tipo, nombre }
  mode = 'add', // 'add' or 'edit'
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(initialData);

  // Update form data if initialData changes (e.g., when editing)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.id_tipo || !formData.descripcion) {
        alert('Por favor, seleccione un tipo y añada una descripción.');
        return;
    }
    onSubmit(formData);
  };

  const title = mode === 'add' ? 'Añadir Nueva Prueba' : 'Editar Prueba';
  const buttonText = mode === 'add' ? 'Crear Prueba' : 'Guardar Cambios';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Test Type Dropdown */}
      <div>
        <label htmlFor="id_tipo" className="block text-sm font-medium text-gray-700">
          Tipo de Prueba <span className="text-red-500">*</span>
        </label>
        <select
          id="id_tipo"
          name="id_tipo"
          value={formData.id_tipo}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>Seleccione un tipo</option>
          {tiposPrueba.map((tipo) => (
            <option key={tipo.id_tipo} value={tipo.id_tipo}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="3"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Detalles de la prueba"
        ></textarea>
      </div>

      {/* Status Dropdown */}
      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Completada">Completada</option>
          {/* Add other statuses if needed based on your schema/logic */}
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isLoading ? 'Guardando...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default PruebaForm;
