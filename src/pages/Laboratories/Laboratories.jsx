import React, { useState } from 'react';

function Laboratories() {
  const [laboratories, setLaboratories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    contacto: '',
    capacidad: '',
    horario: '',
    status: 'Activo',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { nombre, direccion, contacto, capacidad, horario } = form;
    if (!nombre || !direccion || !contacto || !capacidad || !horario) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (editIndex !== null) {
      const updated = [...laboratories];
      updated[editIndex] = form;
      setLaboratories(updated);
    } else {
      setLaboratories([...laboratories, form]);
    }

    setForm({
      nombre: '',
      direccion: '',
      contacto: '',
      capacidad: '',
      horario: '',
      status: 'Activo',
    });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setForm(laboratories[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = laboratories.filter((_, i) => i !== index);
    setLaboratories(updated);
  };

  const filteredLabs = laboratories.filter((lab) =>
    lab.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Laboratorios</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar laboratorio..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Añadir
        </button>
      </div>

      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Dirección</th>
            <th className="p-2 border">Contacto</th>
            <th className="p-2 border">Capacidad</th>
            <th className="p-2 border">Horario</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredLabs.map((lab, index) => (
            <tr key={index}>
              <td className="p-2 border">{lab.nombre}</td>
              <td className="p-2 border">{lab.direccion}</td>
              <td className="p-2 border">{lab.contacto}</td>
              <td className="p-2 border">{lab.capacidad}</td>
              <td className="p-2 border">{lab.horario}</td>
              <td className="p-2 border">{lab.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
          {filteredLabs.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No hay laboratorios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {editIndex !== null ? 'Modificar Laboratorio' : 'Añadir Laboratorio'}
      </h2>
      <div className="grid gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="contacto"
          placeholder="Correo de contacto"
          value={form.contacto}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          value={form.capacidad}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="horario"
          placeholder="Horario"
          value={form.horario}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? 'Actualizar' : 'Guardar'}
        </button>
        <button
          onClick={() => {
            setShowModal(false);
            setEditIndex(null);
            setForm({
              nombre: '',
              direccion: '',
              contacto: '',
              capacidad: '',
              horario: '',
              status: 'Activo',
            });
          }}
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

export default Laboratories;
