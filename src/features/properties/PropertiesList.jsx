import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Table from '../../components/table/Table';
import { fetchProperties } from '../../services/properties.service';
import Button from '../../components/Button';

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
  const {
    data: properties,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching properties</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      <Table headers={fields} data={properties.paginate} />
      <Button size='sm'>Add Property</Button>
    </div>
  );
}
