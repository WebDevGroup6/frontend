import React from 'react';
import Table from '../UI/Table'; // Reusable Table component

// Define columns for the Laboratory table
const columns = [
  { header: 'Código', accessor: 'codigo' },
  { header: 'Nombre', accessor: 'nombre' }, // Added Nombre
  { header: 'Dirección', accessor: 'direccion' },
  { header: 'Contacto', accessor: 'contacto' },
  { header: 'Capacidad', accessor: 'capacidad' },
  { header: 'Horario', accessor: 'horario' },
  { header: 'Estado', accessor: 'estado' },
  // Add other relevant columns based on your model
];

export default function LaboratoryTable({ laboratories, onEdit, onDelete, onRowClick, searchTerm /* Add filter props if needed */ }) {

  // Message for empty table state
  const getEmptyMessage = () => {
    if (searchTerm /* || other filters active */) {
      return "No se encontraron laboratorios que coincidan con los filtros aplicados.";
    }
    return "No hay laboratorios registrados. Puede añadir uno nuevo.";
  };

  return (
    <Table
      columns={columns}
      data={laboratories}
      onEdit={onEdit}
      onDelete={onDelete}
      onRowClick={onRowClick} // Pass the row click handler
      itemIdKey="id_laboratorio" // Primary key of the laboratory model
      emptyMessage={getEmptyMessage()}
      // Pass additional props like loading state if needed
    />
  );
}
