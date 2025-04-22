import React from 'react';

export default function ProductFilterBar({
  searchTerm,
  setSearchTerm,
  // Add props for filters if needed (e.g., selectedTipo, setSelectedTipo, uniqueTipos)
  onAdd,
}) {
  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow">


      {/* Search Input and Action Buttons */}
      <div className="flex items-center flex-grow">
        <input
          type="text"
          placeholder="Buscar por Código, Tipo, Fabricante..." // Adjust placeholder
          className="border border-gray-300 rounded-l-lg p-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 p-2 rounded-r-lg text-white hover:bg-blue-700 focus:outline-none">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Add Button */}
      <div className="flex ml-4">
        <button onClick={onAdd} title="Añadir Producto" className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center">
          <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Añadir
        </button>
      </div>
    </div>
  );
}
