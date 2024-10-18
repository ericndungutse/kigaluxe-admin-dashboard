import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiFilter } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import Prompt from '../../components/Prompt';
import Table from '../../components/table/Table';
import { useFetchProperties, useUploadPropertyImages } from '../../hooks/properties.hooks';
import useCloseModal from '../../hooks/useCloseModal';
import { useUser } from '../../hooks/useUser';
import { deletePropertyApi } from '../../services/properties.service';
import PropertiesDetails from './PropertiesDetails';
import PropertyFilterForm from './PropertyFIlterForm';
import PropertyForm from './PropertyForm';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    label: 'Created on',
    key: 'createdAt',
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const closeModal = useCloseModal();
  const { isUploadingPropertyimages, uploadPropertyImages } = useUploadPropertyImages();
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

  const { properties, isLoadingProperties, isError, error } = useFetchProperties();

  const displayProperties = properties?.paginate.map((prop) => {
    return {
      ...prop,
      price: new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'RWF',
      }).format(prop.price),
      createdAt: new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(prop.createdAt)),
    };
  });

  return (
    <div className='flex flex-col gap-3 items-start'>
      <div className='flex justify-end w-full'>
        <Button
          size='sm'
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
          }}
          variant='tertiary'
          styles='flex gap-2'
        >
          <span>Filters</span>
          <FiFilter className='mr-2' />
        </Button>
      </div>
      {/* Filter Form */}
      {isFilterOpen && <PropertyFilterForm closeForm={() => setIsFilterOpen(false)} />}

      {isLoadingProperties ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>{error?.message}</div>
      ) : (
        <>
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
              <PropertyForm
                closeModal={closeModal}
                propertyId={searchParams.get('resource_id')}
                title='Edit Property'
              />
            </Modal>
          )}

          {searchParams.get('modal') === 'update-images' && (
            <Modal closeModal={closeModal}>
              <ImageUploader
                closeModal={closeModal}
                resourceId={searchParams.get('resource_id')}
                onSubmit={uploadPropertyImages}
                uploading={isUploadingPropertyimages}
              />
            </Modal>
          )}

          <Table headers={fields} data={displayProperties} dropdownOptions='details,edit,update image,delete' />
          <div className='flex justify-between w-full'>
            <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
              Add Property
            </Button>
            <Pagination
              currentPage={properties?.currentPage}
              totalPages={properties?.totalPages}
              next={properties?.next}
            />
          </div>

          {isOpen && (
            <Modal closeModal={() => setIsOpen(false)}>
              <PropertyForm closeModal={() => setIsOpen(false)} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
