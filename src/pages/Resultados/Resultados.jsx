import React, { useState } from 'react';

function Resultados() {
  const [resultados, setResultados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add | edit
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [form, setForm] = useState({
    codigoMuestra: '',
    prueba: '',
    laboratorio: '',
    responsable: '',
    fecha: '',
    descripcion: '',
    status: 'Pendiente',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { codigoMuestra, prueba, laboratorio, responsable, fecha, descripcion } = form;
    if (!codigoMuestra || !prueba || !laboratorio || !responsable || !fecha || !descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (modalMode === 'add') {
      setResultados([...resultados, form]);
    } else if (modalMode === 'edit' && selectedIndex !== null) {
      const updated = [...resultados];
      updated[selectedIndex] = form;
      setResultados(updated);
    }

    closeModal();
  };

  const handleDelete = (index) => {
    if (window.confirm('¿Seguro que deseas eliminar este resultado?')) {
      const updated = [...resultados];
      updated.splice(index, 1);
      setResultados(updated);
    }
  };

  const handleEdit = (index) => {
    setForm(resultados[index]);
    setSelectedIndex(index);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode('add');
    setForm({
      codigoMuestra: '',
      prueba: '',
      laboratorio: '',
      responsable: '',
      fecha: '',
      descripcion: '',
      status: 'Pendiente',
    });
    setSelectedIndex(null);
  };

  const filteredResultados = resultados.filter((res) =>
    Object.values(res).some((val) =>
      val.toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Resultados</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar resultado..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => {
            setShowModal(true);
            setModalMode('add');
          }}
        >
          Añadir
        </button>
      </div>

      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Código de Muestra</th>
            <th className="border px-2 py-1">Prueba</th>
            <th className="border px-2 py-1">Laboratorio</th>
            <th className="border px-2 py-1">Responsable</th>
            <th className="border px-2 py-1">Fecha</th>
            <th className="border px-2 py-1">Descripción</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredResultados.length > 0 ? (
            filteredResultados.map((res, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{res.codigoMuestra}</td>
                <td className="border px-2 py-1">{res.prueba}</td>
                <td className="border px-2 py-1">{res.laboratorio}</td>
                <td className="border px-2 py-1">{res.responsable}</td>
                <td className="border px-2 py-1">{res.fecha}</td>
                <td className="border px-2 py-1">{res.descripcion}</td>
                <td className="border px-2 py-1">{res.status}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button onClick={() => handleEdit(index)} className="text-yellow-600 hover:underline">Modificar</button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 hover:underline">Quitar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No se encontraron resultados
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
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resultados;

