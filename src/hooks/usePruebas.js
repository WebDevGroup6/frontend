// filepath: Frontend/src/hooks/usePruebas.js
import { useState, useEffect, useMemo, useCallback } from "react";
import { getPruebas, getTiposPrueba } from "../services/pruebaService";

export const usePruebas = () => {
  const [pruebas, setPruebas] = useState([]);
  const [tiposPrueba, setTiposPrueba] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState(""); // Filter by test type ID
  const [originalCount, setOriginalCount] = useState(0);

  const fetchPruebasAndTipos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pruebasData, tiposData] = await Promise.all([
        getPruebas(),
        getTiposPrueba(),
      ]);
      setPruebas(pruebasData || []);
      setTiposPrueba(tiposData || []);
      setOriginalCount(pruebasData?.length || 0);
    } catch (err) {
      console.error("Error fetching pruebas or tipos:", err);
      setError(err.message || "Failed to fetch data");
      setPruebas([]);
      setTiposPrueba([]);
      setOriginalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPruebasAndTipos();
  }, [fetchPruebasAndTipos]);

  // Memoized filtered data
  const filteredPruebas = useMemo(() => {
    return pruebas.filter((prueba) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm =
        prueba.descripcion?.toLowerCase().includes(searchTermLower) ||
        prueba.tipo_nombre?.toLowerCase().includes(searchTermLower) || // Search in type name
        prueba.estado?.toLowerCase().includes(searchTermLower);
      const matchesTipo = selectedTipo
        ? prueba.id_tipo === parseInt(selectedTipo, 10)
        : true;
      return matchesSearchTerm && matchesTipo;
    });
  }, [pruebas, searchTerm, selectedTipo]);

  // Function to add a prueba to the state
  const addPrueba = useCallback((newPrueba) => {
    setPruebas((prevPruebas) => [newPrueba, ...prevPruebas]);
    setOriginalCount((prevCount) => prevCount + 1);
  }, []);

  // Function to update a prueba in the state
  const updatePruebaState = useCallback((updatedPrueba) => {
    setPruebas((prevPruebas) =>
      prevPruebas.map((p) =>
        p.id_prueba === updatedPrueba.id_prueba ? updatedPrueba : p
      )
    );
  }, []);

  // Function to remove a prueba from the state
  const removePrueba = useCallback((id) => {
    setPruebas((prevPruebas) => prevPruebas.filter((p) => p.id_prueba !== id));
    setOriginalCount((prevCount) => prevCount - 1);
  }, []);

  // Helper to find a prueba by ID (useful for editing/viewing)
  const findPruebaById = useCallback(
    (id) => {
      return pruebas.find((p) => p.id_prueba === id);
    },
    [pruebas]
  );

  return {
    pruebas: filteredPruebas, // Return filtered data
    tiposPrueba,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedTipo,
    setSelectedTipo,
    originalCount,
    addPrueba,
    updatePruebaState,
    removePrueba,
    findPruebaById,
    refetch: fetchPruebasAndTipos, // Expose refetch function
  };
};
