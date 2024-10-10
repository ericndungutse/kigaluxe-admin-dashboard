import React from 'react';

export default function Button({ children, loading, size = 'md', variant = 'primary', onClick }) {
  const sizes = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-9 py-3 text-lg',
  };

  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white',
    cancel: 'bg-gray-100 hover:bg-gray-200 text-gray-400',
  };

  return (
    <button
      onClick={onClick || null}
      disabled={loading}
      className={`${sizes[size]} font-medium rounded transition-all duration-500 ${variants[variant]} ${
        loading && 'disabled:bg-primary-light disabled:cursor-wait'
      }`}
    >
      {loading ? 'Wait...' : children}
    </button>
  );
}
