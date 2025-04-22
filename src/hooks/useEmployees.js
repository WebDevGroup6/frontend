import { useState, useEffect, useMemo } from "react";
import { getEmployees } from "../services/employeeService";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCargo, setSelectedCargo] = useState("");
  const [uniqueCargos, setUniqueCargos] = useState([]);

  useEffect(() => {
    const fetchAndSetEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployees();
        if (Array.isArray(data)) {
          setEmployees(data);
          const cargos = [
            ...new Set(data.map((emp) => emp.cargo).filter(Boolean)),
          ];
          setUniqueCargos(["", ...cargos]); // Add "All" option
        } else {
          console.error("Received non-array data:", data);
          setEmployees([]);
          setUniqueCargos([""]);
          setError("Received invalid data format for employees.");
        }
      } catch (err) {
        setError("Failed to fetch employees. Please check the API connection.");
        console.error(err);
        setEmployees([]);
        setUniqueCargos([""]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearchTerm =
        employee.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.cargo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.cedula?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCargo =
        selectedCargo === "" || employee.cargo === selectedCargo;
      return matchesSearchTerm && matchesCargo;
    });
  }, [employees, searchTerm, selectedCargo]);

  // Function to remove employee from state after deletion
  const removeEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id_empleado !== id)
    );
  };

  // Function to add a new employee to the state
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [newEmployee, ...prevEmployees]);
    // Optionally update uniqueCargos if the new employee has a new cargo
    if (newEmployee.cargo && !uniqueCargos.includes(newEmployee.cargo)) {
      setUniqueCargos((prevCargos) => [...prevCargos, newEmployee.cargo]);
    }
  };

  // Function to update an existing employee in the state
  const updateEmployeeState = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id_empleado === updatedEmployee.id_empleado ? updatedEmployee : emp
      )
    );
    // Optionally update uniqueCargos if the cargo changed
    const cargos = [
      ...new Set(employees.map((emp) => emp.cargo).filter(Boolean)),
    ];
    if (!cargos.includes(updatedEmployee.cargo) && updatedEmployee.cargo) {
      cargos.push(updatedEmployee.cargo);
    }
    // Ensure the "All" option is present and update state
    setUniqueCargos(["", ...new Set(cargos)]);
  };

  return {
    employees: filteredEmployees, // Return the filtered list
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCargo,
    setSelectedCargo,
    uniqueCargos,
    removeEmployee, // Expose function to update state after delete
    addEmployee, // Expose function to add employee
    updateEmployeeState, // Expose function to update employee
    originalCount: employees.length, // Optional: useful for messages
    findEmployeeById: (id) => employees.find((emp) => emp.id_empleado === id), // Helper to find employee by ID
  };
}
