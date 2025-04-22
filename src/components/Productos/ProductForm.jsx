import React, { useState, useEffect } from 'react';

// Helper to format date for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  } catch (error) {
    // console.error("Error formatting date:", dateString, error); // Keep error for debugging if needed
    return '';
  }
};

// Define the expected primary key for products
const PRODUCT_ID_KEY = 'id_producto'; // Or 'codigo', etc.

export default function ProductForm({ product, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    fabricante: '',
    codigo_digemaps: '',
    fecha_aprobacion: '',
    fecha_vencimiento: '',
    lote: '',
    estado: 'Activo', // Default estado
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        tipo: product.tipo || '',
        fabricante: product.fabricante || '',
        codigo_digemaps: product.codigo_digemaps || '',
        fecha_aprobacion: formatDateForInput(product.fecha_aprobacion) || '',
        fecha_vencimiento: formatDateForInput(product.fecha_vencimiento) || '',
        lote: product.lote || '',
        estado: product.estado || 'Activo', // Use estado
      });
    } else {
      // Reset form for adding
      setFormData({
        nombre: '',
        descripcion: '',
        tipo: '',
        fabricante: '',
        codigo_digemaps: '',
        fecha_aprobacion: '',
        fecha_vencimiento: '',
        lote: '',
        estado: 'Activo',
      });
    }
    setErrors({}); // Clear errors when product changes or form resets
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'Descripción es requerida';
    if (!formData.tipo.trim()) newErrors.tipo = 'Tipo es requerido';
    if (!formData.fabricante.trim()) newErrors.fabricante = 'Fabricante es requerido';
    if (!formData.lote.trim()) newErrors.lote = 'Lote es requerido';
    // Add more validations as needed for dates, status, risk level etc.
    if (formData.fecha_aprobacion && isNaN(new Date(formData.fecha_aprobacion).getTime())) {
        newErrors.fecha_aprobacion = 'Fecha de aprobación inválida';
    }
    if (formData.fecha_vencimiento && isNaN(new Date(formData.fecha_vencimiento).getTime())) {
        newErrors.fecha_vencimiento = 'Fecha de vencimiento inválida';
    }
    if (formData.fecha_aprobacion && formData.fecha_vencimiento && new Date(formData.fecha_vencimiento) < new Date(formData.fecha_aprobacion)) {
        newErrors.fecha_vencimiento = 'Fecha de vencimiento no puede ser anterior a la fecha de aprobación';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const dataToSubmit = {
            ...formData,
            // Ensure dates are sent correctly or null if empty
            fecha_aprobacion: formData.fecha_aprobacion || null,
            fecha_vencimiento: formData.fecha_vencimiento || null,
        };
        onSubmit(dataToSubmit);
    }
  };

  const formTitle = product ? 'Editar Producto' : 'Añadir Producto';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{formTitle}</h3>

      {/* Form Fields in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input
            type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange}
            className={`bg-gray-50 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Nombre del Producto"
          />
          {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>}
        </div>

        {/* Descripcion */}
        <div>
          <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
          <textarea
            name="descripcion" id="descripcion" value={formData.descripcion} onChange={handleChange} rows="3"
            className={`bg-gray-50 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Descripción detallada del producto"
          />
          {errors.descripcion && <p className="mt-1 text-xs text-red-600">{errors.descripcion}</p>}
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
          <input
            type="text" name="tipo" id="tipo" value={formData.tipo} onChange={handleChange}
            className={`bg-gray-50 border ${errors.tipo ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Alimento"
          />
          {errors.tipo && <p className="mt-1 text-xs text-red-600">{errors.tipo}</p>}
        </div>

        {/* Fabricante */}
        <div>
          <label htmlFor="fabricante" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fabricante</label>
          <input
            type="text" name="fabricante" id="fabricante" value={formData.fabricante} onChange={handleChange}
            className={`bg-gray-50 border ${errors.fabricante ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Fab Inc."
          />
          {errors.fabricante && <p className="mt-1 text-xs text-red-600">{errors.fabricante}</p>}
        </div>

        {/* Codigo Digemaps */}
        <div>
          <label htmlFor="codigo_digemaps" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código Digemaps</label>
          <input
            type="text" name="codigo_digemaps" id="codigo_digemaps" value={formData.codigo_digemaps} onChange={handleChange}
            className={`bg-gray-50 border ${errors.codigo_digemaps ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="D123"
          />
          {errors.codigo_digemaps && <p className="mt-1 text-xs text-red-600">{errors.codigo_digemaps}</p>}
        </div>

        {/* Lote */}
        <div>
          <label htmlFor="lote" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lote</label>
          <input
            type="text" name="lote" id="lote" value={formData.lote} onChange={handleChange}
            className={`bg-gray-50 border ${errors.lote ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Lote de producción"
          />
          {errors.lote && <p className="mt-1 text-xs text-red-600">{errors.lote}</p>}
        </div>

        {/* Fecha Aprobación */}
        <div>
          <label htmlFor="fecha_aprobacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Aprobación</label>
          <input
            type="date" name="fecha_aprobacion" id="fecha_aprobacion" value={formData.fecha_aprobacion} onChange={handleChange}
            className={`bg-gray-50 border ${errors.fecha_aprobacion ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.fecha_aprobacion && <p className="mt-1 text-xs text-red-600">{errors.fecha_aprobacion}</p>}
        </div>

        {/* Fecha Vencimiento */}
        <div>
          <label htmlFor="fecha_vencimiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Vencimiento</label>
          <input
            type="date" name="fecha_vencimiento" id="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange}
            className={`bg-gray-50 border ${errors.fecha_vencimiento ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.fecha_vencimiento && <p className="mt-1 text-xs text-red-600">{errors.fecha_vencimiento}</p>}
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
          <select
            name="estado" id="estado" value={formData.estado} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Pendiente">Pendiente</option>
            {/* Add other relevant estados */}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-3">
        <button
          type="button" onClick={onCancel} disabled={loading}
          // Standard secondary/cancel button style
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit" disabled={loading}
          // Standard primary action button style
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
}
