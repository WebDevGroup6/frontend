import React, { useState } from 'react';
import Modal from '../../components/UI/Modal';

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([
    {
      Nombre: 'Proveedor Uno',
      RNC: '123456789',
      Dirección: 'Av. Principal 45',
      Municipio: 'Santo Domingo',
      Contacto: 'prov@test.com',
      Status: 'Activo',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(''); // 'add' | 'edit' | 'report'
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [form, setForm] = useState({
    Nombre: '',
    RNC: '',
    Dirección: '',
    Municipio: '',
    Contacto: '',
    Status: 'Activo',
  });

  // Filtrado en tiempo real
  const filtered = proveedores.filter((p) =>
    Object.values(p).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handlers
  const handleSearch = e => setSearchTerm(e.target.value);

  const openAdd = () => {
    setModalMode('add');
    setForm({
      Nombre: '',
      RNC: '',
      Dirección: '',
      Municipio: '',
      Contacto: '',
      Status: 'Activo',
    });
    setSelectedIndex(null);
    setShowModal(true);
  };

  const openEdit = idx => {
    setModalMode('edit');
    setSelectedIndex(idx);
    setForm(proveedores[idx]);
    setShowModal(true);
  };

  const openReport = () => {
    setModalMode('report');
    setShowModal(true);
  };

  const handleDelete = idx => {
    if (window.confirm('¿Eliminar este proveedor?')) {
      const copy = [...proveedores];
      copy.splice(idx, 1);
      setProveedores(copy);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { Nombre, RNC, Dirección, Municipio, Contacto, Status } = form;
    if (!Nombre || !RNC || !Dirección || !Municipio || !Contacto || !Status) {
      alert('Todos los campos son obligatorios');
      return;
    }
    let copy = [...proveedores];
    if (modalMode === 'add') {
      copy.push(form);
    } else {
      copy[selectedIndex] = form;
    }
    setProveedores(copy);
    setShowModal(false);
  };

  const closeModal = () => setShowModal(false);

  // Renderiza contenido según modalMode
  const renderModalContent = () => {
    if (modalMode === 'report') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generar Reporte de Proveedores</h2>
          <p>Selecciona el formato y el rango de fechas para tu reporte.</p>
          <div className="grid gap-2">
            <label>
              Desde:
              <input type="date" className="border p-1 rounded w-full" />
            </label>
            <label>
              Hasta:
              <input type="date" className="border p-1 rounded w-full" />
            </label>
            <label>
              Formato:
              <select className="border p-1 rounded w-full">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            <button
              onClick={() => {
                // Aquí podrías disparar la generación real
                alert('Reporte generado');
                closeModal();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Generar
            </button>
          </div>
        </div>
      );

    }

    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {modalMode === 'edit' ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </h2>
        <input
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        <input
          name="RNC"
          value={form.RNC}
          onChange={handleChange}
          placeholder="RNC"
          className="w-full p-2 border rounded"
        />
        <input
          name="Dirección"
          value={form.Dirección}
          onChange={handleChange}
          placeholder="Dirección"
          className="w-full p-2 border rounded"
        />
        <input
          name="Municipio"
          value={form.Municipio}
          onChange={handleChange}
          placeholder="Municipio"
          className="w-full p-2 border rounded"
        />
        <input
          name="Contacto"
          value={form.Contacto}
          onChange={handleChange}
          placeholder="Correo o Teléfono"
          className="w-full p-2 border rounded"
        />
        <select
          name="Status"
          value={form.Status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar proveedor..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
        <div>
          <button onClick={openAdd} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
            Añadir
          </button>
          <button onClick={openReport} className="bg-blue-500 text-white px-3 py-1 rounded">
            Generar Reporte
          </button>
        </div>
      </div>

      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {['Nombre', 'RNC', 'Dirección', 'Municipio', 'Contacto', 'Status', 'Acciones'].map(col => (
              <th key={col} className="border px-2 py-1 font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{p.Nombre}</td>
                <td className="border px-2 py-1">{p.RNC}</td>
                <td className="border px-2 py-1">{p.Dirección}</td>
                <td className="border px-2 py-1">{p.Municipio}</td>
                <td className="border px-2 py-1">{p.Contacto}</td>
                <td className="border px-2 py-1">{p.Status}</td>
                <td className="border px-2 py-1 flex space-x-2">
                  <button onClick={() => openEdit(i)} className="text-yellow-500 hover:underline">Modificar</button>
                  <button onClick={() => handleDelete(i)} className="text-red-500 hover:underline">Quitar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No se encontraron proveedores.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          {renderModalContent()}
        </Modal>
      )}

    </div>
  );
}