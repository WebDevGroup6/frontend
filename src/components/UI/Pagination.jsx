import React from 'react';

// Basic Pagination Component - Needs logic for page calculation and handling clicks
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Placeholder implementation - enhance with actual page numbers, disabling buttons, etc.
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    // Add check for totalPages if available
    // if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    // }
  };

  return (
    <div className="mt-4 flex justify-center">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          // disabled={currentPage === 1} // Example disabled state
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        {/* Placeholder for page numbers - requires more logic */}
        <span
          aria-current="page"
          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {currentPage}
        </span>
        {/* Example for next page number */}
        {/* <button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {currentPage + 1}
        </button> */}
        <button
          onClick={handleNext}
          // disabled={currentPage >= totalPages} // Example disabled state
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
