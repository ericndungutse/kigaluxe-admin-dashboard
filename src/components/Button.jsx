import React from 'react';

export default function Button({ children, loading, size = 'md', onClick }) {
  const sizes = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-9 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick || null}
      disabled={loading}
      className={`${
        sizes[size]
      } font-medium text-white bg-primary rounded hover:bg-primary-light transition-all duration-500 ${
        loading && 'disabled:bg-primary-light disabled:cursor-wait'
      }`}
    >
      {loading ? 'Wait...' : children}
    </button>
  );
}
