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
import Pagination from '../../components/Pagination';
import useCloseModal from '../../hooks/useCloseModal';
import ImageUploader from '../../components/ImageUploader';

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
    label: 'Sold',
    key: 'isSold',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function PropertiesList() {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const closeModal = useCloseModal();

  const page = searchParams.get('page') || 1;
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
    queryKey: ['properties', page],
    queryFn: () => fetchProperties(page),
  });

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

      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <PropertyForm closeModal={closeModal} propertyId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {searchParams.get('modal') === 'update-images' && (
        <Modal closeModal={closeModal}>
          <ImageUploader closeModal={closeModal} resourceId={searchParams.get('resource_id')} />
        </Modal>
      )}

      <Table headers={fields} data={properties?.paginate} dropdownOptions='details,edit,update image,delete' />
      <div className='flex justify-between w-full'>
        <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
          Add Property
        </Button>
        <Pagination currentPage={properties?.currentPage} totalPages={properties?.totalPages} next={properties?.next} />
      </div>

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <PropertyForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
