import React, { useState } from 'react';
import { createLaboratory, updateLaboratory, deleteLaboratory } from '../../services/laboratoryService'; // Import laboratory services
import { useLaboratories } from '../../hooks/useLaboratories'; // Import the custom hook
import LaboratoryFilterBar from '../../components/Laboratories/LaboratoryFilterBar'; // Import FilterBar
import LaboratoryTable from '../../components/Laboratories/LaboratoryTable'; // Import Table
import Pagination from '../../components/UI/Pagination'; // Assuming Pagination component exists
import Modal from '../../components/UI/Modal'; // Import Modal
import LaboratoryForm from '../../components/Laboratories/LaboratoryForm'; // Import LaboratoryForm

// Helper function for date formatting if needed (e.g., for a creation/update date)
// const formatDate = (dateString) => { ... };

// Define the expected primary key for laboratories
const LABORATORY_ID_KEY = 'id_laboratorio'; // Adjust if the key is different (e.g., 'codigo')

export default function Laboratories() {
  const {
    laboratories,
    loading: loadingLaboratories, // Rename loading state
    error: fetchError,
    searchTerm,
    setSearchTerm,
    // Add any specific filters if implemented in the hook
    // selectedStatus,
    // setSelectedStatus,
    // uniqueStatuses,
    removeLaboratory,
    addLaboratory,
    updateLaboratoryState,
    originalCount,
    findLaboratoryById,
  } = useLaboratories();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'add', 'edit'
  const [selectedLaboratoryId, setSelectedLaboratoryId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Other State
  const [deleteError, setDeleteError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // TODO: Calculate totalPages based on laboratories.length and itemsPerPage

  // --- Modal Handling ---
  const openModal = (mode, laboratoryId = null) => {
    setModalMode(mode);
    setSelectedLaboratoryId(laboratoryId);
    setModalError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaboratoryId(null);
    setModalMode('view');
    setModalLoading(false);
    setModalError(null);
  };

  // --- CRUD Handlers ---
  const handleAdd = () => {
    openModal('add');
  };

  const handleEdit = (id) => {
    openModal('edit', id);
  };

  const handleViewDetails = (laboratory) => {
    openModal('view', laboratory[LABORATORY_ID_KEY]); // Use correct ID key
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Está seguro que desea eliminar el laboratorio con ID ${id}?`)) {
      return;
    }
    setDeleteError(null);
    try {
      await deleteLaboratory(id);
      removeLaboratory(id); // Update state via hook
    } catch (err) {
      console.error('Error deleting laboratory:', err);
      setDeleteError(`Error al eliminar laboratorio con ID ${id}. ${err.message || ''}`);
    }
  };

  const handleFormSubmit = async (formData) => {
    setModalLoading(true);
    setModalError(null);
    try {
      if (modalMode === 'add') {
        const newLaboratoryData = await createLaboratory(formData);
        addLaboratory(newLaboratoryData); // Update state via hook
      } else if (modalMode === 'edit' && selectedLaboratoryId) {
        const updatedLaboratoryData = await updateLaboratory(selectedLaboratoryId, formData);
        updateLaboratoryState(updatedLaboratoryData); // Update state via hook
      }
      closeModal();
    } catch (err) {
      console.error(`Error ${modalMode === 'add' ? 'creating' : 'updating'} laboratory:`, err);
      const errorMsg = err.response?.data?.message || err.message || `Error desconocido al ${modalMode === 'add' ? 'crear' : 'actualizar'}.`;
      // Specific error handling (e.g., for duplicate codes/names if applicable)
      if (err.response?.status === 409) {
         setModalError(errorMsg || 'Error: Conflicto de datos (ej. código o nombre duplicado).');
      } else {
         setModalError(errorMsg);
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
  const selectedLaboratoryData = selectedLaboratoryId ? findLaboratoryById(selectedLaboratoryId) : null;

  const renderModalContent = () => {
    if (modalMode === 'view' && selectedLaboratoryData) {
      return (
        <div className="space-y-3">
           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detalles del Laboratorio</h3>
           {/* Adjust fields based on your Laboratory model */}
           <p><strong>ID:</strong> {selectedLaboratoryData.id_laboratorio}</p>
           <p><strong>Código:</strong> {selectedLaboratoryData.codigo}</p>
           <p><strong>Nombre:</strong> {selectedLaboratoryData.nombre}</p> {/* Assuming 'nombre' exists */}
           <p><strong>Dirección:</strong> {selectedLaboratoryData.direccion}</p>
           <p><strong>Contacto:</strong> {selectedLaboratoryData.contacto}</p>
           <p><strong>Capacidad:</strong> {selectedLaboratoryData.capacidad}</p>
           <p><strong>Horario:</strong> {selectedLaboratoryData.horario}</p>
           <p><strong>Estado:</strong> {selectedLaboratoryData.estado}</p>
           {/* Add other relevant fields */}
           {/* Footer with close button */}
           <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                    Cerrar
                </button>
           </div>
        </div>
      );
    } else if (modalMode === 'add' || (modalMode === 'edit' && selectedLaboratoryData)) {
      return (
        <>
         {/* Display modal error inside the form area */}
         {modalError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{modalError}</span>
            </div>
         )}
          <LaboratoryForm
            laboratory={selectedLaboratoryData} // Pass null for 'add', data for 'edit'
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            loading={modalLoading}
          />
        </>
      );
    }
    return null; // Default message or loading indicator
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Laboratorios</h1>

        <LaboratoryFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // Pass filter props if implemented
          // selectedStatus={selectedStatus}
          // setSelectedStatus={setSelectedStatus}
          // uniqueStatuses={uniqueStatuses}
          onAdd={handleAdd}
        />

        {/* Display delete error */}
        {deleteError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error al Eliminar: </strong>
            <span className="block sm:inline">{deleteError}</span>
          </div>
        )}

        {/* Table section */}
        {loadingLaboratories ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando laboratorios...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error de Carga: </strong>
            <span className="block sm:inline">{fetchError}</span>
          </div>
        ) : (
          <>
            <LaboratoryTable
              laboratories={laboratories} // Pass the filtered laboratories from the hook
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={handleViewDetails}
              searchTerm={searchTerm}
              // Pass filter state if implemented
              // selectedStatus={selectedStatus}
            />
            {/* Only show pagination if there are laboratories */}
            {laboratories.length > 0 && (
              <Pagination
                currentPage={currentPage}
                // totalPages={totalPages} // Pass total pages when calculated
                onPageChange={handlePageChange}
              />
            )}
            {/* Optional: Show message if filters result in no laboratories */}
            {laboratories.length === 0 && originalCount > 0 && searchTerm && (
                 <div className="mt-4 text-center text-gray-500">
                    No se encontraron laboratorios que coincidan con la búsqueda.
                 </div>
            )}
             {laboratories.length === 0 && originalCount === 0 && !searchTerm && (
                 <div className="mt-4 text-center text-gray-500">
                    No hay laboratorios para mostrar. Puede añadir uno nuevo.
                 </div>
            )}
          </>
        )}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
