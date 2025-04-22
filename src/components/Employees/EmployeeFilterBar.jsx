import React from 'react';

export default function EmployeeFilterBar({
  searchTerm,
  setSearchTerm,
  selectedCargo,
  setSelectedCargo,
  uniqueCargos,
  onAdd, // Placeholder for Add action
  onEdit // Placeholder for Edit action (if needed at this level)
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Cargo Dropdown Filter */}
      <div className="flex items-center">
        <select
          value={selectedCargo}
          onChange={(e) => setSelectedCargo(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Filtrar por Cargo"
        >
          <option value="">Todos los Cargos</option>
          {uniqueCargos.slice(1).map((cargo) => (
            <option key={cargo} value={cargo}>
              {cargo}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input and Action Buttons */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar por Nombre, Cargo, Cédula"
          className="border border-gray-300 rounded-l-lg p-2 w-64 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Search button can be removed if search is instant */}
        <button className="bg-blue-600 p-2 rounded-r-lg text-white hover:bg-blue-700">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Placeholder Action Buttons */}
        <div className="flex ml-4">
          <button onClick={onAdd} title="Add" className="p-2 bg-white rounded-lg border border-gray-300 mx-1 hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          {/* Edit button might be less common here, often per-row */}
          {/* <button onClick={onEdit} title="Edit" className="p-2 bg-white rounded-lg border border-gray-300 mx-1 hover:bg-gray-50">...</button> */}
        </div>
      </div>
    </div>
  );
}
