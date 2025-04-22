// Contenido eliminado según solicitud.
import React from 'react';
import Table from '../../components/UI/Table'; // Assuming Table component path

function Pruebas() {
  // Placeholder data
  const columns = ['Nombre', 'Descripción', 'Asignado A', 'Laboratorios', 'Status', 'Acciones'];
  const data = [
     { Nombre: 'Test Microbiológico', Descripción: 'Análisis de bacterias', 'Asignado A': 'Lab A', Laboratorios: 'L001', Status: 'En Progreso', Acciones: '' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Pruebas</h1>
       <div className="mb-4 flex justify-between items-center">
         <input type="text" placeholder="Buscar prueba..." className="p-2 border rounded"/>
         <div>
             <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Añadir</button>
             <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">Quitar</button>
             <button className="bg-yellow-500 text-white px-3 py-1 rounded">Modificar</button>
         </div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Pruebas;
