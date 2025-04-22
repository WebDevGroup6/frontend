import React from 'react';

// Basic Modal Component - Needs state management (e.g., useState in parent) to control visibility
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      // Added backdrop-blur-sm for blur effect
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden  bg-opacity-50 backdrop-blur-sm dark:bg-opacity-80"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        // Added animation class: animate-zoom-in
        // Define this animation in your global CSS or Tailwind config:
        // @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        // .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
        // Or in tailwind.config.js:
        // theme: { extend: { animation: { 'zoom-in': 'zoom-in 0.3s ease-out forwards' }, keyframes: { 'zoom-in': { 'from': { opacity: '0', transform: 'scale(0.95)' }, 'to': { opacity: '1', transform: 'scale(1)' } } } } }
        className="relative p-4 w-full max-w-2xl max-h-full animate-zoom-in" // <-- Animation class added here
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title || 'Modal Title'}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            {children} {/* Content passed from parent will render here */}
          </div>
          {/* Modal footer (optional) - Add buttons like Save, Cancel here if needed */}
          {/*
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={onClose} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            <button onClick={onClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
          </div>
           */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
