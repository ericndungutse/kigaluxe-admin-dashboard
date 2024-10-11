import React from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function Table({ headers, data, dropdownOptions = 'details,edit,delete' }) {
  return (
    <div className='w-full'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-collapse px-8 border rounded-lg'>
        <TableHeader headers={headers} />
        <tbody className='bg-white'>
          {data.map((datum) => {
            return <TableRow data={datum} headers={headers} key={datum.id} dropdownOptions={dropdownOptions} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
