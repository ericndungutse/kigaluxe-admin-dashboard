import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import HorizontalFormRow from '../../components/HorizontalFormRow';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { useFetchCategories } from '../../hooks/categories.hooks';
import useFetchLocations from '../../hooks/locations.hooks';
import { useUser } from '../../hooks/useUser';
import { addProperty, fetchProperties, updatePropertyApi } from '../../services/properties.service';

const PropertyForm = ({ closeModal, propertyId }) => {
  const navigate = useNavigate();
  const user = useUser();
  const { isLoadingLocations, locations } = useFetchLocations();

  let isEdit = Boolean(propertyId);
  const queryClient = useQueryClient();

  // Get current properties in the cache
  const { data: currentProperties } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    enabled: !isEdit,
  });

  // Create Property
  const { isPending, mutate: addNewProperty } = useMutation({
    mutationFn: (data) => addProperty(data, user?.user?.token),

    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property added successfully');
      closeModal();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update Property
  const { isPending: isUpdating, mutate: updateProperty } = useMutation({
    mutationFn: (data) => updatePropertyApi(data, propertyId, user?.user?.token),
    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property updated successfully');
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

  // Fetch Categories
  const { categories, isLoadingCategories } = useFetchCategories();

  // Select the current property values for the property being edited
  const currentPropertyValues = currentProperties?.paginate.find((property) => property.id === +propertyId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          isForRent: currentPropertyValues?.isForRent,
          isForSale: currentPropertyValues?.isForSale,
          isSold: currentPropertyValues?.isSold,
          isLand: currentPropertyValues?.isLand,
          hasPool: currentPropertyValues?.hasPool,
          AC: currentPropertyValues?.AC,
          hasParking: currentPropertyValues?.hasParking,
        }
      : {},
  });

  const submitForm = (data) => {
    if (isEdit) {
      updateProperty(
        { ...data, imageIds: currentPropertyValues?.imageIds || [], appliances: data?.appliances?.split(',') },
        propertyId
      );
    } else {
      addNewProperty({ ...data, appliances: data.appliances.split(',').map((appliance) => appliance.trim()) });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative  mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[55rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>Create New Property</h2>

      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-2 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3'>
          {/* Title */}
          <VerticalFormRow label='Title' error={errors['title'] && errors['title'].message}>
            <Input
              isDisabled={isPending || isUpdating}
              type='text'
              id='title'
              value={currentPropertyValues?.title}
              placeholder='Enter title'
              register={register('title', { required: 'Title is required' })}
            />
          </VerticalFormRow>

          {/* Property Location */}
          <VerticalFormRow label='Location' error={errors['location'] && errors['location'].message}>
            <select
              id='property_type'
              {...register('location', { required: 'Location is required' })}
              className='border rounded-md p-1.5'
            >
              {(isLoadingLocations && <option>Loading...</option>) || <option value=''>Select location</option>}

              {locations?.paginate.map((location) => {
                return (
                  <option key={location.id} value={location.id}>
                    {location.district}, {location.sector} - {location.knownName}
                  </option>
                );
              })}
            </select>
          </VerticalFormRow>
        </div>

        {/* Details */}
        <VerticalFormRow label='Details' error={errors['details'] && errors['details'].message}>
          <textarea
            className='border rounded-md p-2'
            id='details'
            value={currentPropertyValues?.details}
            placeholder='Enter details'
            {...register('details', { required: 'Details is required' })}
          />
        </VerticalFormRow>

        <div className='flex justify-between gap-3'>
          <VerticalFormRow label='Year built' error={errors['yearBuilt'] && errors['yearBuilt'].message}>
            <Input
              isDisabled={isPending || isUpdating}
              type='date'
              id='yearBuilt'
              value={currentPropertyValues && new Date(currentPropertyValues?.yearBuilt).toISOString().substring(0, 10)}
              placeholder='Enter year built'
              register={register('yearBuilt', { required: 'Year built is required ' })}
            />
          </VerticalFormRow>
          {/* Property Type */}
          <VerticalFormRow label='Property Type' error={errors['property_type'] && errors['property_type'].message}>
            <select
              id='property_type'
              {...register('property_type', { required: 'Property type is required' })}
              className='border rounded-md p-1.5'
            >
              {(isLoadingCategories && <option>Loading...</option>) || <option value=''>Select property type</option>}

              {categories?.paginate.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </VerticalFormRow>
        </div>

        <div className='flex justify-between gap-1'>
          {/* Property Size */}
          <VerticalFormRow
            label='Property Size (sqft)'
            error={errors['property_size'] && errors['property_size'].message}
          >
            <Input
              isDisabled={isPending || isUpdating}
              type='number'
              value={currentPropertyValues?.property_size}
              id='property_size'
              placeholder='Enter property size'
              register={register('property_size', { required: 'Property size is required' })}
            />
          </VerticalFormRow>

          {/* Bathrooms */}
          <VerticalFormRow label='Bathrooms' error={errors['bathrooms'] && errors['bathrooms'].message}>
            <Input
              isDisabled={isPending || isUpdating}
              type='number'
              id='bathrooms'
              value={currentPropertyValues?.bathrooms}
              placeholder='Enter number of bathrooms'
              register={register('bathrooms')}
            />
          </VerticalFormRow>

          {/* Price */}
          <VerticalFormRow label='Price' error={errors['price'] && errors['price'].message}>
            <Input
              isDisabled={isPending || isUpdating}
              type='number'
              id='price'
              placeholder='Enter price'
              value={currentPropertyValues?.price}
              register={register('price', { required: 'Price is required' })}
            />
          </VerticalFormRow>

          {/* Bedrooms */}
          <VerticalFormRow label='Bedrooms' error={errors['bedrooms'] && errors['bedrooms'].message}>
            <Input
              isDisabled={isPending || isUpdating}
              type='number'
              id='bedrooms'
              placeholder='Enter number of bedrooms'
              value={currentPropertyValues?.bedrooms}
              register={register('bedrooms')}
            />
          </VerticalFormRow>
        </div>

        {/* Appliances */}
        <VerticalFormRow label='Appliances'>
          <Input
            isDisabled={isPending || isUpdating}
            id='appliances'
            type='text'
            value={currentPropertyValues?.appliances}
            placeholder='Enter comma separated list of appliances like fridge, stove, etc'
            register={register('appliances')}
          />
        </VerticalFormRow>

        <div className='flex items-center justify-between gap-4'>
          {/* Has Parking */}
          <HorizontalFormRow label='Has Parking'>
            <Input
              isDisabled={isPending || isUpdating}
              type='checkbox'
              id='hasParking'
              register={register('hasParking')}
            />
          </HorizontalFormRow>

          <HorizontalFormRow label='Has AC'>
            <Input isDisabled={isPending || isUpdating} type='checkbox' id='AC' register={register('AC')} />
          </HorizontalFormRow>

          {/* Is For Sale */}
          <HorizontalFormRow label='For Sale'>
            <Input
              isDisabled={isPending || isUpdating}
              type='checkbox'
              id='isForSale'
              register={register('isForSale')}
            />
          </HorizontalFormRow>

          {/* Is For Rent */}
          <HorizontalFormRow label='For Rent'>
            <Input
              isDisabled={isPending || isUpdating}
              type='checkbox'
              id='isForRent'
              register={register('isForRent')}
            />
          </HorizontalFormRow>

          {/* Has Pool */}
          <HorizontalFormRow label='Has pool'>
            <Input isDisabled={isPending || isUpdating} type='checkbox' id='isForRent' register={register('hasPool')} />
          </HorizontalFormRow>

          {/* Sold */}
          {/* TODO DEPENDS ON IS FOR SALE */}
          <HorizontalFormRow label='Sold'>
            <Input isDisabled={isPending || isUpdating} type='checkbox' id='isSold' register={register('isSold')} />
          </HorizontalFormRow>

          {/* Lans */}
          {/* TODO DEPENDS ON IS FOR SALE */}
          <HorizontalFormRow label='Land'>
            <Input isDisabled={isPending || isUpdating} type='checkbox' id='isLand' register={register('isLand')} />
          </HorizontalFormRow>
        </div>

        {/* Submit button */}
        <VerticalFormRow>
          <Button type='submit' loading={isPending || isUpdating}>
            {isEdit ? 'Update' : 'Add'} Property
          </Button>
        </VerticalFormRow>
      </div>
    </form>
  );
};

export default PropertyForm;
