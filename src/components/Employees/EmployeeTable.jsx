import React from 'react';
import EmployeeActions from './EmployeeActions'; // Import the actions component

// Helper function (consider moving to a utils file later)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return 'Invalid Date';
  }
};

export default function EmployeeTable({ employees, onEdit, onDelete, onRowClick, searchTerm, selectedCargo }) { // Add onRowClick prop
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Empleado</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Contratación</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.length > 0 ? employees.map((employee) => (
            <tr
              key={employee.id_empleado}
              onClick={() => onRowClick(employee)} // Add onClick handler to the row
              className="hover:bg-gray-50 cursor-pointer" // Add hover effect and cursor
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id_empleado}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.nombre)}&background=random`} alt={`${employee.nombre} avatar`} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.nombre}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.cedula}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contacto}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.cargo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(employee.fecha_contratacion)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.salario ? `$${Number(employee.salario).toLocaleString()}` : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employee.estado?.toLowerCase() === 'activo' ? 'bg-green-100 text-green-800' :
                  employee.estado?.toLowerCase() === 'inactivo' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {employee.estado || 'Desconocido'}
                </span>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking actions
              >
                <EmployeeActions
                  employeeId={employee.id_empleado}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                No se encontraron empleados { (searchTerm || selectedCargo) && 'que coincidan con los filtros'}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
