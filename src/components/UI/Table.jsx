import React from 'react';

// Basic Table Component - Enhance with features like sorting, pagination, selection later
// Updated to accept columns as an array of objects: { header: 'Display Name', accessor: 'dataKey' }
function Table({ columns = [], data = [], itemIdKey, onRowClick, onEdit, onDelete, emptyMessage = "No hay datos disponibles." }) {

  // Function to render action buttons
  const renderActions = (item) => {
    const itemId = item[itemIdKey]; // Get the ID using the provided key
    if (!itemId) {
      console.warn("Item ID key not found or item has no ID:", itemIdKey, item);
      return <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Invalid ID</td>;
    }
    return (
      <td
        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
        onClick={(e) => e.stopPropagation()} // Prevent row click when clicking actions
      >
        {onEdit && (
          <button
            onClick={() => onEdit(itemId)}
            className="text-indigo-600 hover:text-indigo-900 mr-3"
            aria-label={`Edit item ${itemId}`}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(itemId)}
            className="text-red-600 hover:text-red-900"
            aria-label={`Delete item ${itemId}`}
          >
            Eliminar
          </button>
        )}
        {/* Add other potential actions here if needed */}
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
            {columns.map((col) => ( // Use 'col' instead of 'colName'
              // Use col.accessor or col.header as key, ensure it's unique
              <th scope="col" className="px-6 py-3" key={col.accessor || col.header}>
                {col.header} {/* Render the header text */}
              </th>
            ))}
             {/* Add Actions header if edit/delete handlers are provided */}
             {(onEdit || onDelete) && (
                <th scope="col" className="px-6 py-3">
                    Acciones
                </th>
             )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => { // Removed index, use itemIdKey for unique row key
                const rowKey = item[itemIdKey];
                if (rowKey === undefined || rowKey === null) {
                    console.warn("Missing unique key for row:", item, `using key: ${itemIdKey}`);
                    // Fallback key, might not be ideal
                    // rowKey = JSON.stringify(item);
                }
                return (
                    <tr
                        key={rowKey} // Use the unique ID from data as the key
                        onClick={() => onRowClick && onRowClick(item)} // Conditionally add onClick
                        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${onRowClick ? 'hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer' : ''}`}
                    >
                        {/* Optional: Checkbox cell */}
                        {/* <td class="w-4 p-4"> ... </td> */}

                        {columns.map((col) => { // Iterate through column objects
                            // Render regular data cell using the accessor
                            const cellValue = item[col.accessor];
                            return (
                                <td className="px-6 py-4" key={col.accessor}> {/* Use accessor for cell key */}
                                {/* Basic rendering, adjust if complex data structures or formatting needed */}
                                {typeof cellValue === 'boolean' ? (cellValue ? 'Sí' : 'No') : (cellValue ?? 'N/A')} {/* Handle null/undefined */}
                                </td>
                            );
                        })}
                        {/* Render actions cell if handlers provided */}
                        {(onEdit || onDelete) && renderActions(item)}
                    </tr>
                );
            })
          ) : (
            <tr>
              {/* Adjust colspan to include Actions column if present */}
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-4 text-center">
                {emptyMessage} {/* Use the passed empty message */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
