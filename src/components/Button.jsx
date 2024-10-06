import React from 'react';

export default function Button({ children, loading }) {
  return (
    <button
      disabled={loading}
      className={`px-9 py-2 text-base font-medium text-white bg-primary rounded hover:bg-primary-light transition-all duration-500 ${
        loading && 'disabled:bg-primary-light disabled:cursor-wait'
      }`}
    >
      {loading ? 'Wait...' : children}
    </button>
  );
}
