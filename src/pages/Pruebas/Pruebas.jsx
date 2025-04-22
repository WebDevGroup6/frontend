import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal';

export default function Pruebas() {
  // Cargar desde localStorage o inicializar
  const [pruebas, setPruebas] = useState(() => {
    const saved = localStorage.getItem('pruebas');
    return saved
      ? JSON.parse(saved)
      : [
          {
            Nombre: 'Test Microbiológico',
            Descripción: 'Análisis de bacterias',
            'Asignado A': 'Lab A',
            Laboratorios: 'L001',
            Status: 'En Progreso',
          },
        ];
  });

  // Persistir en localStorage cuando cambie pruebas
  useEffect(() => {
    localStorage.setItem('pruebas', JSON.stringify(pruebas));
  }, [pruebas]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [form, setForm] = useState({
    Nombre: '',
    Descripción: '',
    'Asignado A': '',
    Laboratorios: '',
    Status: 'Pendiente',
  });

  // Filtrar según searchTerm
  const filtered = pruebas.filter((p) =>
    Object.values(p)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // —— Handlers ——
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedIndex(null);
    setForm({
      Nombre: '',
      Descripción: '',
      'Asignado A': '',
      Laboratorios: '',
      Status: 'Pendiente',
    });
    setShowModal(true);
  };

  const openEditModal = (idx) => {
    setModalMode('edit');
    setSelectedIndex(idx);
    setForm(pruebas[idx]);
    setShowModal(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Deseas eliminar esta prueba?')) {
      const copy = [...pruebas];
      copy.splice(idx, 1);
      setPruebas(copy);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    const { Nombre, Descripción, 'Asignado A': asignado, Laboratorios, Status } = form;
    if (!Nombre || !Descripción || !asignado || !Laboratorios || !Status) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const copy = [...pruebas];
    if (modalMode === 'add') {
      copy.push(form);
    } else {
      copy[selectedIndex] = form;
    }
    setPruebas(copy);
    setShowModal(false);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pruebas</h1>

      {/* Barra de búsqueda y botón de añadir */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar prueba..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-1/3"
        />
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Añadir Prueba
        </button>
      </div>

      {/* Tabla inline */}
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {['Nombre', 'Descripción', 'Asignado A', 'Laboratorios', 'Status', 'Acciones'].map((col) => (
              <th key={col} className="border px-2 py-1 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{p.Nombre}</td>
                <td className="border px-2 py-1">{p.Descripción}</td>
                <td className="border px-2 py-1">{p['Asignado A']}</td>
                <td className="border px-2 py-1">{p.Laboratorios}</td>
                <td className="border px-2 py-1">{p.Status}</td>
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
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No se encontraron pruebas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de añadir/editar */}
      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {modalMode === 'edit' ? 'Editar Prueba' : 'Nueva Prueba'}
            </h2>

            <input
              name="Nombre"
              value={form.Nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2 border rounded"
            />
            <input
              name="Descripción"
              value={form.Descripción}
              onChange={handleChange}
              placeholder="Descripción"
              className="w-full p-2 border rounded"
            />
            <input
              name="Asignado A"
              value={form['Asignado A']}
              onChange={handleChange}
              placeholder="Asignado A"
              className="w-full p-2 border rounded"
            />
            <input
              name="Laboratorios"
              value={form.Laboratorios}
              onChange={handleChange}
              placeholder="Laboratorios"
              className="w-full p-2 border rounded"
            />
            <select
              name="Status"
              value={form.Status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
