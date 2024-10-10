import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deletePropertyApi } from '../../services/properties.service';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/table/Table';
import { fetchProperties } from '../../services/properties.service';
import PropertyForm from './PropertyForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropertiesDetails from './PropertiesDetails';
import Prompt from '../../components/Prompt';
import toast from 'react-hot-toast';
import { useUser } from '../../hooks/useUser';

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
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const id = searchParams.get('resource_id');

  // Update Property
  const { isPending: isDeleting, mutate: deleteProperty } = useMutation({
    mutationFn: () => deletePropertyApi(id, user?.user?.token),
    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property deleted successfully');
      closeModal();
    },

    onError: (error) => {
      if (error.message === 'Invalid or expired token') {
        toast.error('Please login to continue');
        navigate('/');
      } else {
        toast.error(error.message);
      }
    },
  });

  const {
    data: properties,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };
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

      {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this property?'
            headingText='Delete property'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={() => deleteProperty()}
            disabled={isDeleting}
          />
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
