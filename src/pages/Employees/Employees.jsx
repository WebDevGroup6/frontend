import React, { useState } from 'react';
import { createEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService'; // Import create/update
import { useEmployees } from '../../hooks/useEmployees';
import EmployeeFilterBar from '../../components/Employees/EmployeeFilterBar';
import EmployeeTable from '../../components/Employees/EmployeeTable';
import Pagination from '../../components/UI/Pagination';
import Modal from '../../components/UI/Modal'; // Import Modal
import EmployeeForm from '../../components/Employees/EmployeeForm'; // Import EmployeeForm

// Helper function (can be moved to utils)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return 'Invalid Date';
  }
};


export default function Employees() {
  const {
    employees,
    loading: loadingEmployees, // Rename to avoid conflict
    error: fetchError,
    searchTerm,
    setSearchTerm,
    selectedCargo,
    setSelectedCargo,
    uniqueCargos,
    removeEmployee,
    addEmployee, // Get add function from hook
    updateEmployeeState, // Get update function from hook
    originalCount,
    findEmployeeById // Get helper function
  } = useEmployees();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'add', 'edit', 'delete'
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false); // Loading state for modal operations
  const [modalError, setModalError] = useState(null); // Error state for modal operations

  // Other State
  const [deleteError, setDeleteError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Modal Handling ---
  const openModal = (mode, employeeId = null) => {
    setModalMode(mode);
    setSelectedEmployeeId(employeeId);
    setModalError(null); // Clear previous modal errors
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
    setModalMode('view'); // Reset mode
    setModalLoading(false); // Reset loading state
    setModalError(null); // Clear errors
  };

  // --- CRUD Handlers ---
  const handleAdd = () => {
    openModal('add');
  };

  const handleEdit = (id) => {
    openModal('edit', id);
  };

   const handleViewDetails = (employee) => {
     openModal('view', employee.id_empleado);
   };

  const handleDelete = async (id) => {
    // Consider using a simpler confirmation dialog instead of a full modal for delete
    if (!window.confirm(`¿Está seguro que desea eliminar al empleado con ID ${id}?`)) {
      return;
    }
    setDeleteError(null);
    try {
      await deleteEmployee(id);
      removeEmployee(id);
    } catch (err) {
      console.error('Error deleting employee:', err);
      setDeleteError(`Error al eliminar empleado con ID ${id}. ${err.message || ''}`);
    }
  };

  const handleFormSubmit = async (formData) => {
    setModalLoading(true);
    setModalError(null);
    try {
      if (modalMode === 'add') {
        const newEmployeeData = await createEmployee(formData);
        addEmployee(newEmployeeData); // Update state using hook function
      } else if (modalMode === 'edit' && selectedEmployeeId) {
        const updatedEmployeeData = await updateEmployee(selectedEmployeeId, formData);
        updateEmployeeState(updatedEmployeeData); // Update state using hook function
      }
      closeModal();
    } catch (err) {
      console.error(`Error ${modalMode === 'add' ? 'creating' : 'updating'} employee:`, err);
      // Check if the error is an Axios error and has a response
      if (err.response) {
        // Check for 409 Conflict specifically
        if (err.response.status === 409) {
           // Use the message from the backend if available, otherwise a default 409 message
           const backendMessage = err.response.data?.message;
           setModalError(backendMessage || 'Error: La Cédula ingresada ya existe. Por favor, verifique.');
        } else {
          // Handle other HTTP errors
          const backendMessage = err.response.data?.message || err.message;
          setModalError(`Error al ${modalMode === 'add' ? 'crear' : 'actualizar'} empleado: ${backendMessage}`);
        }
      } else {
         // Handle network errors or other non-HTTP errors
         setModalError(`Error de red o desconocido al ${modalMode === 'add' ? 'crear' : 'actualizar'} empleado. ${err.message || ''}`);
      }
      // Keep modal open on error
    } finally {
      setModalLoading(false);
    }
  };


  // --- Pagination ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // TODO: Implement pagination logic if needed
  };

  // --- Render Logic ---
  const selectedEmployeeData = selectedEmployeeId ? findEmployeeById(selectedEmployeeId) : null;

  const renderModalContent = () => {
    if (modalMode === 'view' && selectedEmployeeData) {
      return (
        <div className="space-y-3">
           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detalles del Empleado</h3>
           <p><strong>ID:</strong> {selectedEmployeeData.id_empleado}</p>
           <p><strong>Nombre:</strong> {selectedEmployeeData.nombre}</p>
           <p><strong>Cédula:</strong> {selectedEmployeeData.cedula}</p>
           <p><strong>Cargo:</strong> {selectedEmployeeData.cargo}</p>
           <p><strong>Contacto:</strong> {selectedEmployeeData.contacto}</p>
           <p><strong>Estado:</strong> {selectedEmployeeData.estado}</p>
           <p><strong>Fecha Contratación:</strong> {formatDate(selectedEmployeeData.fecha_contratacion)}</p>
           <p><strong>Salario:</strong> {selectedEmployeeData.salario ? `$${Number(selectedEmployeeData.salario).toLocaleString()}` : 'N/A'}</p>
           {/* Add footer with close button */}
           <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Cerrar
                </button>
           </div>
        </div>
      );
    } else if (modalMode === 'add' || (modalMode === 'edit' && selectedEmployeeData)) {
      return (
        <> {/* Wrap form and error in fragment */}
         {/* Display modal error inside the form area */}
         {modalError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{modalError}</span>
            </div>
         )}
          <EmployeeForm
            employee={selectedEmployeeData} // Pass null for 'add', data for 'edit'
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            loading={modalLoading}
          />
        </>
      );
    }
    // Add 'delete' confirmation view if needed
    return null; // Or a default message
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-7xl mx-auto">


      <EmployeeFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCargo={selectedCargo}
        setSelectedCargo={setSelectedCargo}
        uniqueCargos={uniqueCargos}
        onAdd={handleAdd} // Use the updated handler
      />

        {/* Display delete error */}
        {deleteError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Delete Error: </strong>
            <span className="block sm:inline">{deleteError}</span>
          </div>
        )}


      {/* Table section */}
        {loadingEmployees ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando empleados...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{fetchError}</span>
          </div>
        ) : (
          <>
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit} // Use the updated handler
              onDelete={handleDelete}
              onRowClick={handleViewDetails} // Pass the view handler
              searchTerm={searchTerm} // Pass for empty state message context
              selectedCargo={selectedCargo} // Pass for empty state message context
            />
            {/* Only show pagination if there are employees and no loading/error */}
            {employees.length > 0 && (
              <Pagination
                currentPage={currentPage}
                // totalPages={totalPages} // Pass total pages when calculated
                onPageChange={handlePageChange}
              />
            )}
            {/* Optional: Show message if filters result in no employees but there were originally employees */}
            {employees.length === 0 && originalCount > 0 && (searchTerm || selectedCargo) && (
                 <div className="mt-4 text-center text-gray-500">
                    No se encontraron empleados que coincidan con los filtros aplicados.
                 </div>
            )}
          </>
        )}
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        // Title is now handled within EmployeeForm or the view details section
        // title={modalMode === 'add' ? 'Añadir Empleado' : (modalMode === 'edit' ? 'Editar Empleado' : 'Detalles del Empleado')}
      >
         {/* Display modal error */}
         {modalError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{modalError}</span>
            </div>
         )}
        {renderModalContent()}
      </Modal>
    </div>
  );
}
