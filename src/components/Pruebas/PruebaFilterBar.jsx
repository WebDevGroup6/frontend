// filepath: Frontend/src/components/Pruebas/PruebaFilterBar.jsx
import React from 'react';

const PruebaFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedTipo,
  setSelectedTipo,
  tiposPrueba, // Array of { id_tipo, nombre }
  onAdd,
}) => {
  return (
    <div className="mb-4 p-4 bg-white shadow rounded-lg flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Buscar por descripción, tipo, estado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-input px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
      />

      {/* Type Filter Dropdown */}
      <select
        value={selectedTipo}
        onChange={(e) => setSelectedTipo(e.target.value)}
        className="form-select px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="">Todos los Tipos</option>
        {tiposPrueba.map((tipo) => (
          <option key={tipo.id_tipo} value={tipo.id_tipo}>
            {tipo.nombre}
          </option>
        ))}
      </select>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
      >
        Añadir Prueba
      </button>
    </div>
  );
};

export default PruebaFilterBar;
