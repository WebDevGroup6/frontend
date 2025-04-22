import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/UI/Table";

function Muestras() {
  const [muestras, setMuestras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    codigo: "",
    id_producto: "",
    id_proveedor: "",
    id_empleado: "",
    fechamuestra: "",
    observaciones: "",
    id_prueba: "",
  });

  const columns = [
    "Código",
    "Producto",
    "Proveedor",
    "Responsable",
    "Fecha Muestra",
    "Status",
    "Acciones",
  ];

  useEffect(() => {
    fetchMuestras();
  }, []);

  const fetchMuestras = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/muestras");
      const data = res.data.map((m) => ({
        Código: `S${String(m.id_muestra).padStart(3, '0')}`,
        Producto: m.id_producto,
        Proveedor: m.id_proveedor,
        Responsable: m.id_empleado,
        "Fecha Muestra": m.fechamuestra,
        Status: m.estado || 'Pendiente',
        Acciones: m.id_muestra,
      }));
      setMuestras(data);
    } catch (error) {
      console.error("Error cargando muestras:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/muestras", formValues);
      setFormValues({ codigo: "", id_producto: "", id_proveedor: "", id_empleado: "", fechamuestra: "", observaciones: "", id_prueba: "" });
      setShowModal(false);
      fetchMuestras();
    } catch (error) {
      console.error("Error creando muestra:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Eliminar muestra ${id}?`)) return;
    try {
      await axios.delete(`http://localhost:3000/api/muestras/${id}`);
      fetchMuestras();
    } catch (error) {
      console.error("Error eliminando muestra:", error);
    }
  };

  const renderData = muestras.map((row) => ({
    ...row,
    Acciones: (
      <>
        <button onClick={() => setShowModal(true)} className="text-blue-600 mr-2">Editar</button>
        <button onClick={() => handleDelete(row.Acciones)} className="text-red-600">Eliminar</button>
      </>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Muestras</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          ➕ Añadir Muestra
        </button>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Nueva Muestra</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="codigo"
                placeholder="Código"
                value={formValues.codigo}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                name="id_producto"
                placeholder="ID Producto"
                value={formValues.id_producto}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                name="id_proveedor"
                placeholder="ID Proveedor"
                value={formValues.id_proveedor}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                name="id_empleado"
                placeholder="ID Responsable"
                value={formValues.id_empleado}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <input
                type="date"
                name="fechamuestra"
                value={formValues.fechamuestra}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                name="observaciones"
                placeholder="Observaciones"
                value={formValues.observaciones}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                name="id_prueba"
                placeholder="ID Prueba"
                value={formValues.id_prueba}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Table columns={columns} data={renderData} />
    </div>
  );
}

export default Muestras;
