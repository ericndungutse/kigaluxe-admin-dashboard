import React from 'react';

function HorizontalFormRow({ label, children }) {
  return (
    <div className='flex py-2'>
      <label htmlFor={label} className='text-sm font-semibold'>
        {label}:&nbsp;
      </label>
      <div className='h-5'>{children}</div>
    </div>
  );
}

export default HorizontalFormRow;
