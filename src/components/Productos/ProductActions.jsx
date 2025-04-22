import React from 'react';

export default function ProductActions({ productId, onEdit, onDelete }) {
  return (
    <>
      <button
        onClick={() => onEdit(productId)}
        className="text-indigo-600 hover:text-indigo-900 mr-3"
        aria-label={`Edit product ${productId}`}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(productId)}
        className="text-red-600 hover:text-red-900"
        aria-label={`Delete product ${productId}`}
      >
        Delete
      </button>
    </>
  );
}
