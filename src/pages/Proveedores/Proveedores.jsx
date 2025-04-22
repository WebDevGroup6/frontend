import React, { useState } from 'react';
import { useProveedores } from '../../hooks/useProveedores';
import { createProveedor, updateProveedor, deleteProveedor, generateProveedoresReport } from '../../services/proveedorService';
import ProveedorFilterBar from '../../components/Proveedores/ProveedorFilterBar';
import ProveedorTable from '../../components/Proveedores/ProveedorTable';
import ProveedorForm from '../../components/Proveedores/ProveedorForm';
import Modal from '../../components/UI/Modal';
import Pagination from '../../components/UI/Pagination';

// Define el ID principal para proveedores
const SUPPLIER_ID_KEY = 'id_proveedor';

export default function Proveedores() {
  const {
    proveedores,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addProveedor,
    updateProveedorState,
    removeProveedor,
    // fetchProveedores, // Removed as it's handled internally by the hook
    originalCount,
    findProveedorById
  } = useProveedores();

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'add', 'edit'
  const [selectedProveedorId, setSelectedProveedorId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Estado para otros componentes
  const [deleteError, setDeleteError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReportGenerating, setIsReportGenerating] = useState(false);
  
  // Funciones para manejo del modal
  const openModal = (mode, proveedorId = null) => {
    setModalMode(mode);
    setSelectedProveedorId(proveedorId);
    setModalError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProveedorId(null);
    setModalMode('view');
    setModalLoading(false);
    setModalError(null);
  };

  // Funciones CRUD
  const handleAdd = () => {
    openModal('add');
  };

  const handleEdit = (id) => {
    openModal('edit', id);
  };

  const handleViewDetails = (proveedor) => {
    openModal('view', proveedor[SUPPLIER_ID_KEY]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Está seguro que desea eliminar el proveedor con ID ${id}?`)) {
      return;
    }
    setDeleteError(null);
    try {
      await deleteProveedor(id);
      removeProveedor(id);
    } catch (err) {
      console.error('Error eliminando proveedor:', err);
      setDeleteError(`Error al eliminar proveedor con ID ${id}. ${err.message || ''}`);
    }
  };

  const handleFormSubmit = async (formData) => {
    setModalLoading(true);
    setModalError(null);
    try {
      if (modalMode === 'add') {
        const newProveedorData = await createProveedor(formData);
        addProveedor(newProveedorData);
      } else if (modalMode === 'edit' && selectedProveedorId) {
        const updatedProveedorData = await updateProveedor(selectedProveedorId, formData);
        updateProveedorState(updatedProveedorData);
      }
      closeModal();
    } catch (err) {
      console.error(`Error ${modalMode === 'add' ? 'creando' : 'actualizando'} proveedor:`, err);
      const errorMsg = err.response?.data?.message || err.message || `Error desconocido al ${modalMode === 'add' ? 'crear' : 'actualizar'}.`;
      if (err.response?.status === 409) {
        setModalError(errorMsg || 'Error: Conflicto de datos (ej. código o RNC duplicado).');
      } else {
        setModalError(errorMsg);
      }
    } finally {
      setModalLoading(false);
    }
  };

  // Función para generar reporte
  const handleGenerateReport = async () => {
    setIsReportGenerating(true);
    try {
      await generateProveedoresReport('pdf');
      // No es necesario actualizar el estado ya que la función maneja la descarga del archivo
    } catch (err) {
      console.error('Error generando reporte:', err);
      alert(`Error al generar reporte: ${err.message || 'Error desconocido'}`);
    } finally {
      setIsReportGenerating(false);
    }
  };

  // Manejo de paginación
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Implementar lógica de paginación si es necesario
  };

  // Obtener datos del proveedor seleccionado
  const selectedProveedorData = selectedProveedorId ? findProveedorById(selectedProveedorId) : null;

  // Renderizado condicional del contenido del modal
  const renderModalContent = () => {
    if (modalMode === 'view' && selectedProveedorData) {
      return (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detalles del Proveedor</h3>
          <p><strong>ID:</strong> {selectedProveedorData.id_proveedor}</p>
          <p><strong>Código:</strong> {selectedProveedorData.codigo}</p>
          <p><strong>RNC:</strong> {selectedProveedorData.rnc}</p>
          <p><strong>Nombre:</strong> {selectedProveedorData.nombre}</p>
          <p><strong>Dirección:</strong> {selectedProveedorData.direccion}</p>
          <p><strong>Contacto:</strong> {selectedProveedorData.contacto}</p>
          <p><strong>Municipio:</strong> {selectedProveedorData.municipio}</p>
          <p><strong>Estado:</strong> {selectedProveedorData.estado}</p>
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
            <button 
              onClick={closeModal} 
              type="button" 
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Cerrar
            </button>
          </div>
        </div>
      );
    } else if (modalMode === 'add' || (modalMode === 'edit' && selectedProveedorData)) {
      return (
        <>
          {modalError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{modalError}</span>
            </div>
          )}
          <ProveedorForm
            proveedor={selectedProveedorData}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            loading={modalLoading}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Proveedores</h1>

        <ProveedorFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdd={handleAdd}
          onGenerateReport={handleGenerateReport}
          isReportGenerating={isReportGenerating}
        />

        {deleteError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error al Eliminar: </strong>
            <span className="block sm:inline">{deleteError}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando proveedores...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error de Carga: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <ProveedorTable
              proveedores={proveedores}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={handleViewDetails}
              searchTerm={searchTerm}
            />
            {proveedores.length > 0 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
            {proveedores.length === 0 && originalCount > 0 && searchTerm && (
              <div className="mt-4 text-center text-gray-500">
                No se encontraron proveedores que coincidan con la búsqueda.
              </div>
            )}
            {proveedores.length === 0 && originalCount === 0 && !searchTerm && (
              <div className="mt-4 text-center text-gray-500">
                No hay proveedores para mostrar. Puede añadir uno nuevo.
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}