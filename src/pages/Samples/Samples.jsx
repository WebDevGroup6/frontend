import React, { useState, useEffect } from "react";
import Table from "../../components/UI/Table";
import Modal from "../../components/UI/Modal";

export default function Muestras() {
  // Inicializar desde localStorage
  const [muestras, setMuestras] = useState(() => {
    const saved = localStorage.getItem("muestras");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistir en localStorage cuando cambie muestras
  useEffect(() => {
    localStorage.setItem("muestras", JSON.stringify(muestras));
  }, [muestras]);

  // Estado UI
  const [searchTerm, setSearchTerm] = useState("");
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

  // Modal nuevo
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

  // Modal editar
  const openEdit = (m) => {
    setFormValues({
      ...m,
      fecha_muestra: m.fecha_muestra.includes("T")
        ? m.fecha_muestra.split("T")[0]
        : m.fecha_muestra,
    });
    setIsOpen(true);
  };

  // Guardar
  const handleSave = () => {
    const {
      id_muestra,
      id_proveedor,
      id_producto,
      id_empleado,
      id_prueba,
      fecha_muestra,
      observaciones,
    } = formValues;
    if (
      !id_proveedor ||
      !id_producto ||
      !id_empleado ||
      !id_prueba ||
      !fecha_muestra
    ) {
      alert(
        "Los campos Proveedor, Producto, Empleado, Prueba y Fecha son obligatorios"
      );
      return;
    }

    if (!id_muestra) {
      // Crear
      const newItem = {
        ...formValues,
        id_muestra: Date.now().toString(),
      };
      setMuestras((prev) => [...prev, newItem]);
    } else {
      // Editar
      setMuestras((prev) =>
        prev.map((x) =>
          x.id_muestra === id_muestra ? { ...formValues } : x
        )
      );
    }

    setIsOpen(false);
  };

  // Eliminar
  const handleDelete = (m) => {
    if (window.confirm("¿Eliminar esta muestra?")) {
      setMuestras((prev) =>
        prev.filter((x) => x.id_muestra !== m.id_muestra)
      );
    }
  };

  // Cambios formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Filtrar
  const filtered = muestras.filter((m) =>
    Object.values(m)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Columnas para Table
  const columns = [
    { header: "Código", accessor: "Código" },
    { header: "Producto", accessor: "Producto" },
    { header: "Proveedor", accessor: "Proveedor" },
    { header: "Responsable", accessor: "Responsable" },
    { header: "Fecha Muestra", accessor: "Fecha Muestra" },
    { header: "Observaciones", accessor: "Observaciones" },
    { header: "Acciones", accessor: "Acciones" },
  ];

  // Datos para Table
  const data = filtered.map((m) => ({
    Código: m.id_muestra,
    Producto: m.id_producto,
    Proveedor: m.id_proveedor,
    Responsable: m.id_empleado,
    "Fecha Muestra": m.fecha_muestra,
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
          onClick={() => handleDelete(m)}
        >
          Eliminar
        </button>
      </>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Muestras</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar muestra..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openNew}
        >
          + Añadir Muestra
        </button>
      </div>

      <Table columns={columns} data={data} itemIdKey="Código" />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          formValues.id_muestra ? "Editar Muestra" : "Nueva Muestra"
        }
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
                type="text"
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
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded border"
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
