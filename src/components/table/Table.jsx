import React from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function Table({ headers, data }) {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-collapse px-8 border rounded-lg'>
      <TableHeader headers={headers} />
      <tbody className='bg-white'>
        {data.map((datum) => (
          <TableRow data={datum} headers={headers} key={datum.id} />
        ))}
      </tbody>
    </table>
  );
}
