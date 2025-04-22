import React, { useState } from 'react';
import {
    createProveedor,
    updateProveedor,
    deleteProveedor,
    generateProveedoresReport
} from '../../services/proveedorService';
import { useProveedores } from '../../hooks/useProveedores';
import ProveedorFilterBar from '../../components/Proveedores/ProveedorFilterBar';
import ProveedorTable from '../../components/Proveedores/ProveedorTable';
import Pagination from '../../components/UI/Pagination';
import Modal from '../../components/UI/Modal';
import ProveedorForm from '../../components/Proveedores/ProveedorForm';

const SUPPLIER_ID_KEY = 'id_proveedor';

export default function Proveedores() {
    const {
        proveedores,
        loading: loadingProveedores,
        error: fetchError,
        searchTerm,
        setSearchTerm,
        removeProveedor,
        addProveedor,
        updateProveedorState,
        originalCount,
        findProveedorById,
    } = useProveedores();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view');
    const [selectedProveedorId, setSelectedProveedorId] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [reportError, setReportError] = useState(null);
    const [isReportGenerating, setIsReportGenerating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = (mode, proveedorId = null) => {
        setModalMode(mode);
        setSelectedProveedorId(proveedorId);
        setModalError(null);
        setModalLoading(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProveedorId(null);
        setModalMode('view');
        setModalLoading(false);
        setModalError(null);
    };

    const handleAdd = () => {
        openModal('add');
    };

    const handleEdit = (id) => {
        openModal('edit', id);
    };

    const handleViewDetails = (proveedor) => {
        const idToView = proveedor.id ?? proveedor[SUPPLIER_ID_KEY];
        if (idToView !== undefined && idToView !== null) {
            openModal('view', idToView);
        } else {
            setDeleteError("No se pueden ver los detalles: falta el ID del proveedor.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`¿Está seguro que desea eliminar el proveedor con ID ${id}? Esta acción no se puede deshacer.`)) {
            return;
        }
        setDeleteError(null);
        try {
            await deleteProveedor(id);
            removeProveedor(id);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Error desconocido al eliminar.';
            setDeleteError(`Error al eliminar proveedor con ID ${id}. ${errorMsg}`);
        }
    };

    const handleFormSubmit = async (formData) => {
        setModalLoading(true);
        setModalError(null);
        try {
            let resultData;
            if (modalMode === 'add') {
                resultData = await createProveedor(formData);
                addProveedor(resultData);
            } else if (modalMode === 'edit' && selectedProveedorId) {
                const { [SUPPLIER_ID_KEY]: idToRemove, id, ...updateData } = formData;
                resultData = await updateProveedor(selectedProveedorId, updateData);
                updateProveedorState(resultData);
            }
            closeModal();
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || `Error desconocido al ${modalMode === 'add' ? 'crear' : 'actualizar'}.`;
            if (err.response?.status === 409) {
                setModalError(errorMsg || 'Error: Conflicto de datos (ej. código o RNC duplicado). Verifique los campos.');
            } else {
                setModalError(errorMsg);
            }
        } finally {
            setModalLoading(false);
        }
    };

    const handleGenerateReport = async () => {
        setReportError(null);
        setIsReportGenerating(true);
        try {
            const result = await generateProveedoresReport('pdf');
            alert(`Reporte "${result.filename}" generado y descargado.`);
        } catch (err) {
            setReportError(`Error al generar el reporte: ${err.message}`);
        } finally {
            setIsReportGenerating(false);
        }
    };

    const totalItems = proveedores.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedProveedores = proveedores.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const selectedProveedorData = selectedProveedorId ? findProveedorById(selectedProveedorId) : null;

    const renderModalContent = () => {
        if (modalLoading && modalMode !== 'view') {
            return <div className="text-center p-4">Cargando...</div>;
        }
        if (modalMode === 'view' && selectedProveedorData) {
            return (
                <div className="space-y-3 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detalles del Proveedor</h3>
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Proveedor</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.id_proveedor ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Código</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.codigo ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">RNC</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.rnc ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.nombre ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Dirección</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.direccion ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contacto</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.contacto ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Municipio</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.municipio ?? 'N/A'}</dd>
                        </div>
                        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{selectedProveedorData.estado ?? 'N/A'}</dd>
                        </div>
                    </dl>
                    <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                        <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Cerrar
                        </button>
                    </div>
                </div>
            );
        } else if (modalMode === 'add' || (modalMode === 'edit' && selectedProveedorData)) {
            return (
                <ProveedorForm
                    proveedor={selectedProveedorData}
                    onSubmit={handleFormSubmit}
                    onCancel={closeModal}
                    loading={modalLoading}
                    error={modalError}
                />
            );
        } else if (modalMode === 'edit' && !selectedProveedorData) {
            return <div className="text-center p-4 text-red-500">Error: No se pudieron cargar los datos del proveedor para editar.</div>;
        }
        return null;
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Gestión de Proveedores</h1>
                <ProveedorFilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onAdd={handleAdd}
                    onGenerateReport={handleGenerateReport}
                    isReportGenerating={isReportGenerating}
                />
                {deleteError && (
                    <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error al Eliminar: </strong>
                        <span className="block sm:inline">{deleteError}</span>
                        <button onClick={() => setDeleteError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <span className="text-xl">×</span>
                        </button>
                    </div>
                )}
                {reportError && (
                    <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error de Reporte: </strong>
                        <span className="block sm:inline">{reportError}</span>
                        <button onClick={() => setReportError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <span className="text-xl">×</span>
                        </button>
                    </div>
                )}
                {loadingProveedores ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500 dark:text-gray-400">Cargando proveedores...</p>
                    </div>
                ) : fetchError ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error de Carga: </strong>
                        <span className="block sm:inline">{fetchError}</span>
                    </div>
                ) : (
                    <>
                        <ProveedorTable
                            proveedores={paginatedProveedores}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onRowClick={handleViewDetails}
                            searchTerm={searchTerm}
                        />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        {totalItems === 0 && originalCount > 0 && searchTerm && (
                            <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                                No se encontraron proveedores que coincidan con "{searchTerm}".
                            </div>
                        )}
                        {totalItems === 0 && originalCount === 0 && !searchTerm && (
                            <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                                No hay proveedores registrados. Haga clic en "Añadir Proveedor" para empezar.
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
