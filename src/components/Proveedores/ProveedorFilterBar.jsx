import React from 'react';

function ProveedorFilterBar({ searchTerm, setSearchTerm, onAdd, onGenerateReport, isReportGenerating }) {
  return (
    <div className="mb-4 p-4 bg-white shadow rounded-lg flex flex-wrap justify-between items-center gap-4">
      <div className="flex-grow" style={{ minWidth: '250px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Buscar por código, RNC, nombre, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition duration-150 ease-in-out flex items-center gap-1"
        >
          Añadir Proveedor
        </button>
        <button
          onClick={onGenerateReport}
          disabled={isReportGenerating}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition duration-150 ease-in-out flex items-center gap-1 ${isReportGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isReportGenerating ? 'Generando...' : 'Generar Reporte (PDF)'}
        </button>
      </div>
    </div>
  );
}

export default ProveedorFilterBar;
