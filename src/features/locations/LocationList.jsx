import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';
import useFetchLocations, { useUploadLocationImage } from '../../hooks/locations.hooks';
import LocationForm from './LocationForm';
import Modal from '../../components/Modal';
import { deleteLocationApi } from '../../services/locations.service';
import Prompt from '../../components/Prompt';
import toast from 'react-hot-toast';
import LocationDetails from './LocationDetails';
import Pagination from '../../components/Pagination';
import useCloseModal from '../../hooks/useCloseModal';
import ImageUploader from '../../components/ImageUploader';
import { useUser } from '../../hooks/useUser';
import Search from '../../components/Search'; // Import the Search component
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';

const fields = [
  { label: 'Image', key: 'url' },
  { label: 'Known name', key: 'knownName' },
  { label: 'Sector', key: 'sector' },
  { label: 'District', key: 'district' },
  { label: 'Province', key: 'province' },
  { label: 'Known name', key: 'knownName' },
  { label: 'Action', key: 'action' },
];

export default function LocationsList() {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const closeModal = useCloseModal();
  const { isUploadingLocationimages, uploadLocationImage } = useUploadLocationImage();

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

  return (
    <div className='flex flex-col gap-3 items-start'>
      <div className='flex justify-end w-full'>
        <Search resource='locations' />
      </div>

      {isLoadingLocations ? (
        <LoadingSpinner />
      ) : loadingLocationsError ? (
        <div className='text-red-500 bg-red-200 text-center capitalize p-2 rounded'>
          {loadingLocationsError.message}
        </div>
      ) : (
        <>
          <Table headers={fields} data={locations.paginate} dropdownOptions='details,edit,update image,delete' />
          {searchParams.get('modal') === 'details' && (
            <Modal closeModal={closeModal}>
              <LocationDetails closeModal={closeModal} />
            </Modal>
          )}

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

          {searchParams.get('modal') === 'update-images' && (
            <Modal closeModal={closeModal}>
              <ImageUploader
                closeModal={closeModal}
                resourceId={searchParams.get('resource_id')}
                onSubmit={uploadLocationImage}
                uploading={isUploadingLocationimages}
                multiple={false}
              />
            </Modal>
          )}

          <div className='flex justify-between w-full'>
            <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
              Add Location
            </Button>
            <Pagination
              currentPage={locations?.currentPage}
              totalPages={locations?.totalPages}
              next={locations?.next}
            />
          </div>
        </>
      )}
    </div>
  );
}
