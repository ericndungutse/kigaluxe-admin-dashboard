import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/table/Table';
import { fetchProperties } from '../../services/properties.service';
import PropertyForm from './PropertyForm';
import { useSearchParams } from 'react-router-dom';
import PropertiesDetails from './PropertiesDetails';

const fields = [
  {
    label: 'Image',
    key: 'imageUrl',
  },
  {
    label: 'Title',
    key: 'title',
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'Available',
    key: 'isSold',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function PropertiesList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };

  const {
    data: properties,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching properties</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      {searchParams.get('modal') === 'details' && (
        <Modal closeModal={closeModal}>
          <PropertiesDetails closeModal={closeModal} />
        </Modal>
      )}
      <Table headers={fields} data={properties.paginate} />
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <PropertyForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )}

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Add Property
      </Button>
    </div>
  );
}
