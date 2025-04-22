import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getLaboratories, // Corrected import name
  // Import other service functions if needed directly here, though often handled in the page component
} from "../services/laboratoryService";

// Define the primary key for laboratories based on the backend/database
const LABORATORY_ID_KEY = "id_laboratorio";

export const useLaboratories = () => {
  const [laboratories, setLaboratories] = useState([]);
  const [originalLaboratories, setOriginalLaboratories] = useState([]); // Store the original full list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Add other filter states if needed (e.g., by state)
  // const [selectedEstado, setSelectedEstado] = useState('');

  const fetchLaboratories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLaboratories(); // Corrected function call
      setLaboratories(data || []);
      setOriginalLaboratories(data || []); // Set the original list
    } catch (err) {
      console.error("Failed to fetch laboratories:", err);
      setError(err.message || "Error al cargar los laboratorios");
      setLaboratories([]);
      setOriginalLaboratories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaboratories();
  }, [fetchLaboratories]);

  // --- Filtering Logic --- (Add more filters as needed)
  const filteredLaboratories = useMemo(() => {
    return laboratories.filter((lab) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        lab.nombre?.toLowerCase().includes(searchTermLower) ||
        lab.direccion?.toLowerCase().includes(searchTermLower) ||
        lab.contacto?.toLowerCase().includes(searchTermLower) ||
        lab.estado?.toLowerCase().includes(searchTermLower) ||
        lab.horario_atencion?.toLowerCase().includes(searchTermLower) ||
        lab.id_laboratorio?.toString().includes(searchTermLower);

      // Add state filter logic if selectedEstado exists
      // const matchesEstado = !selectedEstado || lab.estado === selectedEstado;

      return matchesSearch; // && matchesEstado;
    });
  }, [laboratories, searchTerm /*, selectedEstado */]);

  // --- State Update Functions --- (Called by the page component after successful API calls)
  const addLaboratory = useCallback((newLaboratory) => {
    // Add to the main list and the filtered list (if it matches current filters)
    setLaboratories((prev) => [...prev, newLaboratory]);
    setOriginalLaboratories((prev) => [...prev, newLaboratory]);
  }, []);

  const updateLaboratoryState = useCallback((updatedLaboratory) => {
    const updateList = (list) =>
      list.map((lab) =>
        lab[LABORATORY_ID_KEY] === updatedLaboratory[LABORATORY_ID_KEY]
          ? updatedLaboratory
          : lab
      );
    setLaboratories(updateList);
    setOriginalLaboratories(updateList);
  }, []);

  const removeLaboratory = useCallback((id) => {
    const filterList = (list) =>
      list.filter((lab) => lab[LABORATORY_ID_KEY] !== id);
    setLaboratories(filterList);
    setOriginalLaboratories(filterList);
  }, []);

  // --- Helper Functions ---
  const findLaboratoryById = useCallback(
    (id) => {
      // Search in the original list to ensure we find it even if filtered out
      return originalLaboratories.find((lab) => lab[LABORATORY_ID_KEY] === id);
    },
    [originalLaboratories]
  );

  // --- Unique values for filters (Example for 'estado') ---
  // const uniqueEstados = useMemo(() => {
  //   const estados = new Set(originalLaboratories.map(lab => lab.estado));
  //   return ['Todos', ...Array.from(estados)]; // Add 'Todos' option
  // }, [originalLaboratories]);

  return {
    laboratories: filteredLaboratories, // Return the filtered list for display
    loading,
    error,
    searchTerm,
    setSearchTerm,
    // Add filter state and setters here if created
    // selectedEstado,
    // setSelectedEstado,
    // uniqueEstados,
    fetchLaboratories, // Expose refetch function
    addLaboratory, // Function to add a lab to state
    updateLaboratoryState, // Function to update a lab in state
    removeLaboratory, // Function to remove a lab from state
    originalCount: originalLaboratories.length, // Count before filtering
    findLaboratoryById, // Helper to find a specific lab
  };
};
