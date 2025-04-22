import React from 'react';
import ProductActions from './ProductActions'; // Import the actions component

// Helper function for date formatting (consider moving to utils)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString(); // Adjust format if needed
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return 'Invalid Date';
  }
};

// Define the expected primary key for products
const PRODUCT_ID_KEY = 'id_producto'; // Or 'codigo', etc.

// Define status colors (adjust as needed) - Renamed to getEstadoClass
const getEstadoClass = (estado) => {
    const lowerEstado = estado?.toLowerCase();
    switch (lowerEstado) {
        case 'activo':
        case 'aprobado':
            return 'bg-green-100 text-green-800';
        case 'inactivo':
            return 'bg-red-100 text-red-800';
        case 'pendiente':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function ProductTable({ products, onEdit, onDelete, onRowClick, searchTerm /*, selectedTipo */ }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Updated Headers */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabricante</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Digemaps</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Aprobación</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Vencimiento</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            {/* Removed Nivel de Riesgo */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length > 0 ? products.map((product) => (
            <tr
              key={product[PRODUCT_ID_KEY]} // Use the correct primary key
              onClick={() => onRowClick(product)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {/* Updated data mapping */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={product.descripcion}>{product.descripcion}</td> {/* Added truncate and title */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.fabricante}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.lote}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.codigo_digemaps || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(product.fecha_aprobacion)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(product.fecha_vencimiento)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoClass(product.estado)}`}> {/* Use estado */}
                  {product.estado || 'Desconocido'}
                </span>
              </td>
              {/* Removed Nivel de Riesgo cell */}
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                onClick={(e) => e.stopPropagation()} // Prevent row click on actions
              >
                <ProductActions
                  productId={product[PRODUCT_ID_KEY]} // Pass the correct ID
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          )) : (
            <tr>
              {/* Adjusted colSpan */}
              <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                No se encontraron productos { (searchTerm /* || selectedTipo */) && 'que coincidan con los filtros'}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
