import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';
import useFetchLocations from '../../hooks/locations.hooks';
import { useUser } from '../../hooks/useUser';
import LocationForm from './LocationForm';
import Modal from '../../components/Modal';
import { deleteLocationApi } from '../../services/locations.service';
import Prompt from '../../components/Prompt';
import toast from 'react-hot-toast';

const fields = [
  {
    label: 'Image',
    key: 'url',
  },

  {
    label: 'Known name',
    key: 'knownName',
  },

  {
    label: 'Sector',
    key: 'sector',
  },
  {
    label: 'District',
    key: 'district',
  },
  {
    label: 'Province',
    key: 'province',
  },

  {
    label: 'Known name',
    key: 'knownName',
  },

  {
    label: 'Action',
    key: 'action',
  },
];

export default function LocationsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const id = searchParams.get('resource_id');

  // Delete Location
  const { isPending: isDeleting, mutate: deleteLocation } = useMutation({
    mutationFn: () => deleteLocationApi(id, user?.user?.token),
    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property deleted successfully');
      closeModal();
    },

    onError: (error) => {
      if (error.message === 'Invalid or expired token' || error.message === 'Access token is missing or invalid') {
        toast.error('Please login to continue');
        navigate('/');
      } else {
        toast.error(error.message);
      }
    },
  });

  // Load Locations
  const { isLoadingLocations, locations, loadingLocationsError } = useFetchLocations();

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };

  if (isLoadingLocations) {
    return <div>Loading...</div>;
  }

  if (loadingLocationsError) {
    return <div>Error fetching locations</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      {/* {searchParams.get('modal') === 'details' && (
        <Modal closeModal={closeModal}>
          <PropertiesDetails closeModal={closeModal} />
        </Modal>
      )} */}

      {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this location?'
            headingText='Delete property'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={() => deleteLocation()}
            disabled={isDeleting}
          />
        </Modal>
      )}

      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <LocationForm closeModal={closeModal} locationId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <LocationForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )}
      <Table headers={fields} data={locations.paginate} />

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Add Location
      </Button>
    </div>
  );
}
