import React, { useState, useEffect } from 'react';

export default function Resultados() {
  // Inicializar a partir de localStorage (o array vacío si no hay nada)
  const [resultados, setResultados] = useState(() => {
    const stored = localStorage.getItem('resultados');
    return stored ? JSON.parse(stored) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [form, setForm] = useState({
    codigoMuestra: '',
    prueba: '',
    laboratorio: '',
    responsable: '',
    fecha: '',
    descripcion: '',
    status: 'Pendiente',
  });

  // Guardar en localStorage cada vez que cambie "resultados"
  useEffect(() => {
    localStorage.setItem('resultados', JSON.stringify(resultados));
  }, [resultados]);

  // Filtrar según searchTerm
  const filtered = resultados.filter((res) =>
    Object.values(res)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedIndex(null);
    setForm({
      codigoMuestra: '',
      prueba: '',
      laboratorio: '',
      responsable: '',
      fecha: '',
      descripcion: '',
      status: 'Pendiente',
    });
    setShowModal(true);
  };

  const openEditModal = (idx) => {
    setModalMode('edit');
    setSelectedIndex(idx);
    setForm(resultados[idx]);
    setShowModal(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Seguro que deseas eliminar este resultado?')) {
      const copy = [...resultados];
      copy.splice(idx, 1);
      setResultados(copy);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    const { codigoMuestra, prueba, laboratorio, responsable, fecha, descripcion } = form;
    if (!codigoMuestra || !prueba || !laboratorio || !responsable || !fecha || !descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const copy = [...resultados];
    if (modalMode === 'add') {
      copy.push(form);
    } else {
      copy[selectedIndex] = form;
    }
    setResultados(copy);
    setShowModal(false);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Resultados</h1>

      {/* Barra de búsqueda y botón añadir */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar resultado..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-1/3"
        />
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Añadir
        </button>
      </div>

      {/* Tabla inline */}
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {[
              'Código de Muestra',
              'Prueba',
              'Laboratorio',
              'Responsable',
              'Fecha',
              'Descripción',
              'Status',
              'Acciones',
            ].map((col) => (
              <th key={col} className="border px-2 py-1 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((res, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{res.codigoMuestra}</td>
                <td className="border px-2 py-1">{res.prueba}</td>
                <td className="border px-2 py-1">{res.laboratorio}</td>
                <td className="border px-2 py-1">{res.responsable}</td>
                <td className="border px-2 py-1">{res.fecha}</td>
                <td className="border px-2 py-1">{res.descripcion}</td>
                <td className="border px-2 py-1">{res.status}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => openEditModal(idx)}
                    className="text-yellow-500 hover:underline"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 hover:underline"
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalMode === 'edit' ? 'Editar Resultado' : 'Añadir Resultado'}
            </h2>
            <div className="grid gap-4">
              <input
                type="text"
                name="codigoMuestra"
                placeholder="Código de Muestra"
                value={form.codigoMuestra}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="prueba"
                placeholder="Prueba Realizada"
                value={form.prueba}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="laboratorio"
                placeholder="Laboratorio"
                value={form.laboratorio}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="responsable"
                placeholder="Responsable"
                value={form.responsable}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
