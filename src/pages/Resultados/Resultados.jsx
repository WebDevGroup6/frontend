import React, { useState } from 'react';

function Laboratories() {
  const [laboratories, setLaboratories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    codigo: '',
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
    if (!form.codigo || !form.direccion || !form.contacto || !form.capacidad || !form.horario) {
      alert("Todos los campos son obligatorios");
      return;
    }
    setLaboratories([...laboratories, form]);
    setForm({
      codigo: '',
      direccion: '',
      contacto: '',
      capacidad: '',
      horario: '',
      status: 'Activo',
    });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Laboratorios</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar laboratorio..."
          className="p-2 border rounded w-1/3"
        />
        <div>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => setShowModal(true)}
          >
            Añadir
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">Quitar</button>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">Modificar</button>
        </div>
      </div>

      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Código</th>
            <th className="border px-2 py-1">Dirección</th>
            <th className="border px-2 py-1">Contacto</th>
            <th className="border px-2 py-1">Capacidad</th>
            <th className="border px-2 py-1">Horario</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {laboratories.map((lab, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{lab.codigo}</td>
              <td className="border px-2 py-1">{lab.direccion}</td>
              <td className="border px-2 py-1">{lab.contacto}</td>
              <td className="border px-2 py-1">{lab.capacidad}</td>
              <td className="border px-2 py-1">{lab.horario}</td>
              <td className="border px-2 py-1">{lab.status}</td>
            </tr>
          ))}
          {laboratories.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No hay laboratorios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Añadir Laboratorio</h2>
            <div className="grid gap-4">
              <input
                type="text"
                name="codigo"
                placeholder="Código"
                value={form.codigo}
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
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
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
