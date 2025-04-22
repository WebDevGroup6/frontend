import React from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const SUPPLIER_ID_KEY = 'id_proveedor';

function ProveedorTable({ proveedores, onEdit, onDelete, onRowClick, searchTerm }) {
  const columns = [
    { header: 'Código', accessor: 'codigo', id: 'codigo' },
    { header: 'RNC', accessor: 'rnc', id: 'rnc' },
    { header: 'Nombre', accessor: 'nombre', id: 'nombre' },
    { header: 'Dirección', accessor: 'direccion', id: 'direccion' },
    { header: 'Contacto', accessor: 'contacto', id: 'contacto' },
    { header: 'Municipio', accessor: 'municipio', id: 'municipio' },
    { header: 'Estado', accessor: 'estado', id: 'estado' },
    { header: 'Acciones', accessor: 'actions', id: 'actions', isAction: true },
  ];

  const renderCell = (proveedor, column) => {
    const value = proveedor[column.accessor];
    if (column.isAction) {
      const id = proveedor[SUPPLIER_ID_KEY];
      if (id === undefined || id === null) {
        return <div className="text-red-500 text-xs">ID Missing</div>;
      }
      return (
        <div className="flex space-x-2 justify-center">
          <button onClick={e => { e.stopPropagation(); onRowClick(proveedor); }} className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200" title="Ver Detalles"><FaEye /></button>
          <button onClick={e => { e.stopPropagation(); onEdit(id); }} className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-100" title="Editar"><FaEdit /></button>
          <button onClick={e => { e.stopPropagation(); onDelete(id); }} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100" title="Eliminar"><FaTrashAlt /></button>
        </div>
      );
    }
    if (column.accessor === 'estado') {
      const statusClass = value === 'Activo' ? 'bg-green-100 text-green-800' : value === 'Inactivo' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
      return <span className={`px-2 py-1 inline-block rounded-full text-xs font-medium ${statusClass}`}>{value || 'N/A'}</span>;
    }
    return <span className="text-sm text-gray-700">{value !== null && value !== undefined ? String(value) : 'N/A'}</span>;
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.id} scope="col" className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${col.isAction ? 'text-center' : 'text-left'}`}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {proveedores.length > 0 ? (
            proveedores.map((proveedor, index) => {
              const rowId = proveedor[SUPPLIER_ID_KEY];
              if (rowId === undefined || rowId === null) {
                return (
                  <tr key={`missing-id-${index}`}>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-red-500 text-sm">Error: Falta ID para esta fila.</td>
                  </tr>
                );
              }
              return (
                <tr key={rowId} onClick={() => onRowClick(proveedor)} className="hover:bg-gray-50 cursor-pointer transition duration-150">
                  {columns.map(col => (
                    <td key={`${rowId}-${col.id}`} className={`px-6 py-4 whitespace-nowrap ${col.isAction ? 'text-center' : ''}`}>{renderCell(proveedor, col)}</td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                {searchTerm ? 'No se encontraron proveedores que coincidan con los filtros.' : 'No hay proveedores registrados.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProveedorTable;
