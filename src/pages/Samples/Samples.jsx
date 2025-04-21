import React from 'react';
import Table from '../../components/UI/Table'; // Assuming Table component path

function Samples() {
  // Placeholder data
  const columns = ['Código', 'Producto', 'Proveedor', 'Responsable', 'Fecha Muestra', 'Status', 'Acciones'];
  const data = [
     { Código: 'S001', Producto: 'Tomate', Proveedor: 'Prov A', Responsable: 'Ana', 'Fecha Muestra': '2024-04-20', Status: 'Pendiente', Acciones: '' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Muestras</h1>
       <div className="mb-4 flex justify-between items-center">
         <input type="text" placeholder="Buscar muestra..." className="p-2 border rounded"/>
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

export default Samples;
