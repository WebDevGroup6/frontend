import React from 'react';
import PropTypes from 'prop-types';

const AllProductsModal = ({ products, onClose }) => {
  // Función para formatear precios en DOP
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-6xl bg-white rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Encabezado del modal */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-2xl font-bold text-gray-800">Todos nuestros productos</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-700"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div key={index} className="flex p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 mr-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-contain w-24 h-24" 
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-1 mb-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  {product.categoryName || product.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="mt-1 text-xs text-gray-600 line-clamp-2">{product.description}</p>
                <p className="mt-2 font-bold text-blue-600">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Validación de props
AllProductsModal.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string,
      categoryName: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

export default AllProductsModal;