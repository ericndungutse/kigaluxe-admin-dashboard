import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';
import useFetchLocations from '../../hooks/locations.hooks';
import { useUser } from '../../hooks/useUser';

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

  // Update Location
  // const { isPending: isDeleting, mutate: deleteProperty } = useMutation({
  //   mutationFn: () => deletePropertyApi(id, user?.user?.token),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('properties');
  //     toast.success('Property deleted successfully');
  //     closeModal();
  //   },

  //   onError: (error) => {
  //     if (error.message === 'Invalid or expired token') {
  //       toast.error('Please login to continue');
  //       navigate('/');
  //     } else {
  //       toast.error(error.message);
  //     }
  //   },
  // });

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

  console.log(locations.paginate);

  return (
    <div className='flex flex-col gap-3 items-start'>
      {/* {searchParams.get('modal') === 'details' && (
        <Modal closeModal={closeModal}>
          <PropertiesDetails closeModal={closeModal} />
        </Modal>
      )} */}

      {/* {searchParams.get('modal') === 'delete' && (
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
      )} */}
      <Table headers={fields} data={locations.paginate} />
      {/* {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <PropertyForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )} */}

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Add Location
      </Button>
    </div>
  );
}
