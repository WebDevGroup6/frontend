import { useState, useEffect, useCallback, useMemo } from "react";
import { getProveedores } from "../services/proveedorService";

const SUPPLIER_ID_KEY = "id_proveedor";

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalCount, setOriginalCount] = useState(0);

  const fetchProveedores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProveedores();
      setProveedores(data);
      setOriginalCount(data.length);
    } catch (err) {
      setError(err.message || "Failed to fetch suppliers");
      setProveedores([]);
      setOriginalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProveedores();
  }, [fetchProveedores]);

  const addProveedor = useCallback((newProveedor) => {
    const processedProveedor = {
      ...newProveedor,
      id: newProveedor[SUPPLIER_ID_KEY] || newProveedor.id,
    };
    setProveedores((prev) => [processedProveedor, ...prev]);
    setOriginalCount((prev) => prev + 1);
  }, []);

  const updateProveedorState = useCallback((updatedProveedor) => {
    const processedProveedor = {
      ...updatedProveedor,
      id: updatedProveedor[SUPPLIER_ID_KEY] || updatedProveedor.id,
    };
    setProveedores((prev) =>
      prev.map((p) => (p.id === processedProveedor.id ? processedProveedor : p))
    );
  }, []);

  const removeProveedor = useCallback((id) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id));
    setOriginalCount((prev) => prev - 1);
  }, []);

  const filteredProveedores = useMemo(() => {
    return proveedores.filter((proveedor) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        proveedor.codigo?.toLowerCase().includes(searchTermLower) ||
        proveedor.rnc?.toLowerCase().includes(searchTermLower) ||
        proveedor.nombre?.toLowerCase().includes(searchTermLower) ||
        proveedor.direccion?.toLowerCase().includes(searchTermLower) ||
        proveedor.contacto?.toLowerCase().includes(searchTermLower) ||
        proveedor.municipio?.toLowerCase().includes(searchTermLower) ||
        proveedor.estado?.toLowerCase().includes(searchTermLower)
      );
    });
  }, [proveedores, searchTerm]);

  const findProveedorById = useCallback(
    (id) => {
      return proveedores.find((p) => p.id === id);
    },
    [proveedores]
  );

  return {
    proveedores: filteredProveedores,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addProveedor,
    updateProveedorState,
    removeProveedor,
    fetchProveedores,
    originalCount,
    findProveedorById,
  };
};
