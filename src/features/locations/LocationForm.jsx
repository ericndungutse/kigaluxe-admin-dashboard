import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';
import Button from '../../components/Button';
import VerticalFormRow from '../../components/VerticalFormRow';
import Input from '../../components/Input';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { addLocationApi, updateLocationApi } from '../../services/locations.service';
import useFetchLocations from '../../hooks/locations.hooks';

const LocationForm = ({ closeModal, locationId }) => {
  const navigate = useNavigate();
  const user = useUser();
  const queryClient = useQueryClient();

  let isEdit = Boolean(locationId);

  // Create Location
  const { isPending, mutate: addNewLocation } = useMutation({
    mutationFn: (data) => addLocationApi(data, user?.user?.token),

    onSuccess: () => {
      queryClient.invalidateQueries('locations');
      toast.success('Location added successfully');
      closeModal();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update Location
  const { isPending: isUpdating, mutate: updateLocation } = useMutation({
    mutationFn: (data) => updateLocationApi(data, locationId, user?.user?.token),
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
      toast.success('Location updated successfully');
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

  // Current locations
  const { locations } = useFetchLocations(isEdit);

  const currentLocationValues = locations?.paginate.find((location) => location.id === +locationId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          // Add default values for editing
        }
      : {},
  });

  const submitForm = (data) => {
    if (isEdit) {
      updateLocation(data, locationId);
    } else {
      addNewLocation(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[55rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>{isEdit ? 'Edit' : 'Create New'} Location</h2>

      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 absolute top-1 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      <div className='flex flex-col gap-4'>
        <VerticalFormRow label='Province' error={errors['province'] && errors['province'].message}>
          <Input
            isDisabled={isPending || isUpdating}
            type='text'
            id='province'
            placeholder='Enter province'
            value={currentLocationValues?.province || ''}
            register={register('province', { required: 'Province is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow label='District' error={errors['district'] && errors['district'].message}>
          <Input
            isDisabled={isPending || isUpdating}
            type='text'
            id='district'
            placeholder='Enter district'
            value={currentLocationValues?.district || ''}
            register={register('district', { required: 'District is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow label='Sector' error={errors['sector'] && errors['sector'].message}>
          <Input
            isDisabled={isPending || isUpdating}
            type='text'
            id='sector'
            placeholder='Enter sector'
            value={currentLocationValues?.sector || ''}
            register={register('sector', { required: 'Sector is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow label='Known Name' error={errors['knownName'] && errors['knownName'].message}>
          <Input
            isDisabled={isPending || isUpdating}
            type='text'
            id='knownName'
            placeholder='Enter known name'
            value={currentLocationValues?.knownName || ''}
            register={register('knownName', { required: 'Known name is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow label='Description' error={errors['description'] && errors['description'].message}>
          <textarea
            className='border rounded-md p-2'
            id='description'
            placeholder='Enter description'
            defaultValue={currentLocationValues?.description || ''}
            {...register('description', { required: 'Description is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow>
          <Button type='submit' loading={isPending || isUpdating}>
            {isEdit ? 'Update' : 'Add'} Location
          </Button>
        </VerticalFormRow>
      </div>
    </form>
  );
};

export default LocationForm;
