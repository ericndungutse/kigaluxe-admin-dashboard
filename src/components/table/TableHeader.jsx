import React from 'react';

export default function TableHeader({ headers }) {
  return (
    <thead className='text-base bg-[#f9fafb] text-primary border-t border rounded-md'>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            scope='col'
            className={`px-6 py-2 font-normal ${index === 0 && 'rounded-tl'} ${
              index === headers.length - 1 && 'rounded-tr'
            } `}
          >
            {header === 'index' ? '#' : header.label === 'action' ? '' : header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
