// Contenido eliminado según solicitud.
import React, { useState } from 'react';
import { createProduct, updateProduct, deleteProduct } from '../../services/productService'; // Import product services
import { useProducts } from '../../hooks/useProducts'; // Import the custom hook
import ProductFilterBar from '../../components/Productos/ProductFilterBar'; // Import FilterBar
import ProductTable from '../../components/Productos/ProductTable'; // Import Table
import Pagination from '../../components/UI/Pagination'; // Assuming Pagination component exists
import Modal from '../../components/UI/Modal'; // Import Modal
import ProductForm from '../../components/Productos/ProductForm'; // Import ProductForm

// Helper function for date formatting (can be moved to utils)
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

// Define the expected primary key for products
const PRODUCT_ID_KEY = 'id_producto'; // Or 'codigo', etc.

export default function Productos() {
  const {
    products,
    loading: loadingProducts, // Rename loading state
    error: fetchError,
    searchTerm,
    setSearchTerm,
    // Get filter states and setters if implemented in the hook
    // selectedTipo,
    // setSelectedTipo,
    // uniqueTipos,
    removeProduct,
    addProduct,
    updateProductState,
    originalCount,
    findProductById,
  } = useProducts();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'add', 'edit'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Other State
  const [deleteError, setDeleteError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // TODO: Calculate totalPages based on products.length and itemsPerPage

  // --- Modal Handling ---
  const openModal = (mode, productId = null) => {
    setModalMode(mode);
    setSelectedProductId(productId);
    setModalError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
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

  const handleViewDetails = (product) => {
    openModal('view', product[PRODUCT_ID_KEY]); // Use correct ID key
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Está seguro que desea eliminar el producto con ID ${id}?`)) {
      return;
    }
    setDeleteError(null);
    try {
      await deleteProduct(id);
      removeProduct(id); // Update state via hook
    } catch (err) {
      console.error('Error deleting product:', err);
      setDeleteError(`Error al eliminar producto con ID ${id}. ${err.message || ''}`);
    }
  };

  const handleFormSubmit = async (formData) => {
    setModalLoading(true);
    setModalError(null);
    try {
      if (modalMode === 'add') {
        // Ensure formData matches backend structure before sending
        const newProductData = await createProduct(formData);
        addProduct(newProductData); // Update state via hook
      } else if (modalMode === 'edit' && selectedProductId) {
        // Ensure formData matches backend structure before sending
        // The ID is handled by updateProduct service function using selectedProductId
        const updatedProductData = await updateProduct(selectedProductId, formData);
        updateProductState(updatedProductData); // Update state via hook
      }
      closeModal();
    } catch (err) {
      console.error(`Error ${modalMode === 'add' ? 'creating' : 'updating'} product:`, err);
      const errorMsg = err.response?.data?.message || err.message || `Error desconocido al ${modalMode === 'add' ? 'crear' : 'actualizar'}.`;
      // Specific error handling (e.g., for duplicate codes if applicable)
      // Assuming 409 might be for duplicate 'nombre' or 'lote' now? Adjust as needed.
      if (err.response?.status === 409) {
         setModalError(errorMsg || 'Error: Conflicto de datos (ej. nombre o lote duplicado).');
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
    // TODO: Implement pagination logic if needed (slicing data or fetching paginated data)
  };

  // --- Render Logic ---
  const selectedProductData = selectedProductId ? findProductById(selectedProductId) : null;

  const renderModalContent = () => {
    if (modalMode === 'view' && selectedProductData) {
      return (
        <div className="space-y-3">
           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detalles del Producto</h3>
           {/* Updated fields for view mode */}
           <p><strong>ID:</strong> {selectedProductData.id_producto}</p>
           <p><strong>Nombre:</strong> {selectedProductData.nombre}</p>
           <p><strong>Descripción:</strong> {selectedProductData.descripcion}</p>
           <p><strong>Tipo:</strong> {selectedProductData.tipo}</p>
           <p><strong>Fabricante:</strong> {selectedProductData.fabricante}</p>
           <p><strong>Lote:</strong> {selectedProductData.lote}</p>
           <p><strong>Código Digemaps:</strong> {selectedProductData.codigo_digemaps || 'N/A'}</p>
           <p><strong>Fecha Aprobación:</strong> {formatDate(selectedProductData.fecha_aprobacion)}</p>
           <p><strong>Fecha Vencimiento:</strong> {formatDate(selectedProductData.fecha_vencimiento)}</p>
           <p><strong>Estado:</strong> {selectedProductData.estado}</p>
           {/* Removed Nivel de Riesgo */}
           {/* Footer with close button */}
           <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                    Cerrar
                </button>
           </div>
        </div>
      );
    } else if (modalMode === 'add' || (modalMode === 'edit' && selectedProductData)) {
      return (
        <>
         {/* Display modal error inside the form area */}
         {modalError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{modalError}</span>
            </div>
         )}
          <ProductForm
            product={selectedProductData} // Pass null for 'add', data for 'edit'
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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Productos</h1>

        <ProductFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // Pass filter props if implemented
          // selectedTipo={selectedTipo}
          // setSelectedTipo={setSelectedTipo}
          // uniqueTipos={uniqueTipos}
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
        {loadingProducts ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error de Carga: </strong>
            <span className="block sm:inline">{fetchError}</span>
          </div>
        ) : (
          <>
            <ProductTable
              products={products} // Pass the filtered products from the hook
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={handleViewDetails}
              searchTerm={searchTerm}
              // Pass filter state if implemented
              // selectedTipo={selectedTipo}
            />
            {/* Only show pagination if there are products */}
            {products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                // totalPages={totalPages} // Pass total pages when calculated
                onPageChange={handlePageChange}
              />
            )}
            {/* Optional: Show message if filters result in no products */}
            {products.length === 0 && originalCount > 0 && searchTerm && (
                 <div className="mt-4 text-center text-gray-500">
                    No se encontraron productos que coincidan con la búsqueda.
                 </div>
            )}
             {products.length === 0 && originalCount === 0 && !searchTerm && (
                 <div className="mt-4 text-center text-gray-500">
                    No hay productos para mostrar. Puede añadir uno nuevo.
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
