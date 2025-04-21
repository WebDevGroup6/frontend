import React from 'react';

// Basic Table Component - Enhance with features like sorting, pagination, selection later
function Table({ columns = [], data = [] }) {

  // Function to render action buttons (Edit, Delete, etc.)
  // You'll need to pass handlers for these actions from the parent page component
  const renderActions = (item) => {
    return (
      <td className="px-6 py-4">
         {/* Example Action Button - Customize as needed */}
         <button
            onClick={() => console.log('Edit item:', item)} // Replace with actual edit handler
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
         >
            Editar
         </button>
         <button
            onClick={() => console.log('Delete item:', item)} // Replace with actual delete handler
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
         >
            Eliminar
         </button>
         {/* Add other actions like View, Generate Report etc. */}
      </td>
    );
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Optional: Add search/filter/action bar here if not handled by parent */}
      {/* <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"> ... </div> */}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* Optional: Add checkbox column if needed */}
            {/* <th scope="col" class="p-4"> ... </th> */}
            {columns.map((colName) => (
              <th scope="col" className="px-6 py-3" key={colName}>
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {/* Optional: Checkbox cell */}
                {/* <td class="w-4 p-4"> ... </td> */}

                {columns.map((colName) => {
                  // Special handling for the 'Acciones' column
                  if (colName === 'Acciones') {
                    return renderActions(item);
                  }
                  // Render regular data cell
                  return (
                    <td className="px-6 py-4" key={`${colName}-${index}`}>
                      {/* Basic rendering, adjust if complex data structures or formatting needed */}
                      {typeof item[colName] === 'boolean' ? (item[colName] ? 'Sí' : 'No') : item[colName]}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
