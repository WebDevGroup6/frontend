import React from 'react';

export default function EmployeeActions({ employeeId, onEdit, onDelete }) {
  return (
    <>
      <button
        onClick={() => onEdit(employeeId)}
        className="text-indigo-600 hover:text-indigo-900 mr-3"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(employeeId)}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </>
  );
}
