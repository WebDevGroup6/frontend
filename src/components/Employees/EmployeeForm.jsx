import React, { useState, useEffect } from 'react';

// Helper to format date for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    // console.error("Error formatting date:", dateString, error); // Keep error for debugging if needed
    return '';
  }
};


export default function EmployeeForm({ employee, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    cargo: '',
    contacto: '',
    estado: 'Activo',
    fecha_contratacion: '',
    salario: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      // If editing, populate form with employee data
      setFormData({
        cedula: employee.cedula || '',
        nombre: employee.nombre || '',
        cargo: employee.cargo || '',
        contacto: employee.contacto || '',
        estado: employee.estado || 'Activo',
        fecha_contratacion: formatDateForInput(employee.fecha_contratacion) || '',
        salario: employee.salario || '',
      });
    } else {
      // If adding, reset form
      setFormData({
        cedula: '',
        nombre: '',
        cargo: '',
        contacto: '',
        estado: 'Activo',
        fecha_contratacion: '',
        salario: '',
      });
    }
    setErrors({}); // Clear errors when employee changes or form resets
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cedula.trim()) newErrors.cedula = 'Cédula es requerida';
    // Basic regex for Dominican Cedula (XXX-XXXXXXX-X) - adjust if needed
    else if (!/^\d{3}-?\d{7}-?\d{1}$/.test(formData.cedula.trim())) newErrors.cedula = 'Formato de Cédula inválido (###-#######-#)';
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!formData.cargo.trim()) newErrors.cargo = 'Cargo es requerido';
    if (!formData.contacto.trim()) newErrors.contacto = 'Contacto es requerido';
    // Basic email or phone validation (example)
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contacto.trim()) && !/^\+?[\d\s-()]+$/.test(formData.contacto.trim())) newErrors.contacto = 'Contacto debe ser email o teléfono válido';

    if (formData.salario && isNaN(Number(formData.salario))) newErrors.salario = 'Salario debe ser un número';
    else if (formData.salario && Number(formData.salario) < 0) newErrors.salario = 'Salario no puede ser negativo';

    if (formData.fecha_contratacion && isNaN(new Date(formData.fecha_contratacion).getTime())) newErrors.fecha_contratacion = 'Fecha de contratación inválida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear specific error when user starts typing
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Prepare data, ensuring salario is a number or null
        const dataToSubmit = {
            ...formData,
            salario: formData.salario ? Number(formData.salario) : null,
            // Ensure fecha_contratacion is sent correctly or null if empty
            fecha_contratacion: formData.fecha_contratacion || null,
        };
        onSubmit(dataToSubmit);
    }
  };

  const formTitle = employee ? 'Editar Empleado' : 'Añadir Empleado';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{formTitle}</h3>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cedula */}
        <div>
          <label htmlFor="cedula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cédula</label>
          <input
            type="text"
            name="cedula"
            id="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.cedula ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="000-0000000-0"
          />
          {errors.cedula && <p className="mt-1 text-xs text-red-600">{errors.cedula}</p>}
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="Juan Pérez"
          />
          {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>}
        </div>

        {/* Cargo */}
        <div>
          <label htmlFor="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
          <input
            type="text"
            name="cargo"
            id="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.cargo ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="Analista de Calidad"
          />
          {errors.cargo && <p className="mt-1 text-xs text-red-600">{errors.cargo}</p>}
        </div>

        {/* Contacto */}
        <div>
          <label htmlFor="contacto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contacto (Email/Teléfono)</label>
          <input
            type="text"
            name="contacto"
            id="contacto"
            value={formData.contacto}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.contacto ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="ejemplo@correo.com / 809-123-4567"
          />
          {errors.contacto && <p className="mt-1 text-xs text-red-600">{errors.contacto}</p>}
        </div>

        {/* Fecha Contratacion */}
        <div>
          <label htmlFor="fecha_contratacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Contratación</label>
          <input
            type="date"
            name="fecha_contratacion"
            id="fecha_contratacion"
            value={formData.fecha_contratacion}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.fecha_contratacion ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
          />
           {errors.fecha_contratacion && <p className="mt-1 text-xs text-red-600">{errors.fecha_contratacion}</p>}
        </div>

        {/* Salario */}
        <div>
          <label htmlFor="salario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salario (Opcional)</label>
          <input
            type="number"
            name="salario"
            id="salario"
            step="0.01"
            value={formData.salario}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.salario ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="50000.00"
          />
          {errors.salario && <p className="mt-1 text-xs text-red-600">{errors.salario}</p>}
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
          <select
            name="estado"
            id="estado"
            value={formData.estado}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
            {loading ? 'Guardando...' : (employee ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
}
