import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/UI/Table";
import Modal from "../../components/UI/Modal";

export default function Muestras() {
  // ------------- estados -------------
  const [muestras, setMuestras] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    id_muestra: "",
    id_proveedor: "",
    id_producto: "",
    id_empleado: "",
    id_prueba: "",
    fecha_muestra: "",
    observaciones: "",
  });

  // ------------ list & refresh -----------
  useEffect(() => {
    fetchMuestras();
  }, []);
  const fetchMuestras = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/muestras");
      setMuestras(data);
    } catch (err) {
      console.error("Error cargando muestras:", err);
    }
  };

  // ---------- form handlers -------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openNew = () => {
    setFormValues({
      id_muestra: "",
      id_proveedor: "",
      id_producto: "",
      id_empleado: "",
      id_prueba: "",
      fecha_muestra: "",
      observaciones: "",
    });
    setIsOpen(true);
  };

  const openEdit = (m) => {
    setFormValues({
      ...m,
      fecha_muestra: m.fecha_muestra.split("T")[0],
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (formValues.id_muestra) {
        // editar
        await axios.put(
          `http://localhost:3000/api/muestras/${formValues.id_muestra}`,
          formValues
        );
      } else {
        // crear
        await axios.post("http://localhost:3000/api/muestras", formValues);
      }
      setIsOpen(false);
      fetchMuestras();
    } catch (err) {
      console.error("Error guardando muestra:", err);
      alert("Error al guardar la muestra");
    }
  };

  // --------- columnas + filas ----------
  const columns = [
    "Código",
    "Producto",
    "Proveedor",
    "Responsable",
    "Fecha Muestra",
    "Observaciones",
    "Acciones",
  ];

  const data = muestras.map((m) => ({
    Código: m.id_muestra,
    Producto: m.producto_nombre || m.id_producto,
    Proveedor: m.proveedor_nombre || m.id_proveedor,
    Responsable: m.empleado_nombre || m.id_empleado,
    "Fecha Muestra": new Date(m.fecha_muestra).toLocaleDateString(),
    Observaciones: m.observaciones || "-",
    Acciones: (
      <>
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => openEdit(m)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={async () => {
            if (window.confirm("¿Eliminar esta muestra?")) {
              await axios.delete(
                `http://localhost:3000/api/muestras/${m.id_muestra}`
              );
              fetchMuestras();
            }
          }}
        >
          Eliminar
        </button>
      </>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Muestras</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={openNew}
      >
        + Añadir Muestra
      </button>

      <Table columns={columns} data={data} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={formValues.id_muestra ? "Editar Muestra" : "Nueva Muestra"}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { name: "id_proveedor", label: "ID Proveedor" },
            { name: "id_producto", label: "ID Producto" },
            { name: "id_empleado", label: "ID Empleado" },
            { name: "id_prueba", label: "ID Prueba" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type="number"
                name={name}
                value={formValues[name]}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          ))}
          <div>
            <label className="block font-medium">Fecha muestra</label>
            <input
              type="date"
              name="fecha_muestra"
              value={formValues.fecha_muestra}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Observaciones</label>
            <textarea
              name="observaciones"
              value={formValues.observaciones}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="mr-2 px-4 py-2 rounded border"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
}