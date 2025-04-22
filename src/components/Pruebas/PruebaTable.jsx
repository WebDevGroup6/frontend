// filepath: Frontend/src/components/Pruebas/PruebaTable.jsx
import React from 'react';
import Table from '../UI/Table'; // Reusable Table component

const PruebaTable = ({
  pruebas,
  onEdit,
  onDelete,
  onRowClick, // For viewing details
  searchTerm,
  selectedTipo,
}) => {

  const columns = [
    { header: 'ID', accessor: 'id_prueba' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Tipo', accessor: 'tipo_nombre' }, // Access the joined type name
    { header: 'Estado', accessor: 'estado' },
    {
      header: 'Acciones',
      accessor: 'actions',
      render: (prueba) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(prueba.id_prueba); }}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Editar
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(prueba.id_prueba); }}
            className="text-red-600 hover:text-red-900"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const handleRowClick = (prueba) => {
    if (onRowClick) {
      onRowClick(prueba);
    }
  };

  // Empty state message based on filters
  const getEmptyMessage = () => {
    if (searchTerm || selectedTipo) {
      return "No se encontraron pruebas que coincidan con los filtros aplicados.";
    }
    return "No hay pruebas registradas.";
  };

  return (
    <Table
      columns={columns}
      data={pruebas}
      onRowClick={handleRowClick}
      emptyMessage={getEmptyMessage()}
    />
  );
};

export default PruebaTable;
