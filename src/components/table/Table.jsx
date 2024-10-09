import React from 'react';

import { useSearchParams } from 'react-router-dom';
import PropertyForm from '../../features/properties/PropertyForm';
import Modal from '../Modal';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function Table({ headers, data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };

  return (
    <div className='w-full'>
      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <PropertyForm closeModal={closeModal} propertyId={searchParams.get('resource_id')} />
        </Modal>
      )}
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-collapse px-8 border rounded-lg'>
        <TableHeader headers={headers} />
        <tbody className='bg-white'>
          {data.map((datum) => {
            return <TableRow data={datum} headers={headers} key={datum.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
