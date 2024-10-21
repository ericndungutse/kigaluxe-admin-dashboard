import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import HorizontalFormRow from '../../components/HorizontalFormRow';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { useFetchCategories } from '../../hooks/categories.hooks';
import useFetchLocations from '../../hooks/locations.hooks';
import { useFetchProperties } from '../../hooks/properties.hooks';
import { useUser } from '../../hooks/useUser';
import { addProperty, updatePropertyApi } from '../../services/properties.service';

const PropertyForm = ({ closeModal, propertyId, title = 'Create New Property' }) => {
  const navigate = useNavigate();
  const user = useUser();
  const { isLoadingLocations, locations } = useFetchLocations(1);

  let isEdit = Boolean(propertyId);
  const queryClient = useQueryClient();

  const { properties: currentProperties } = useFetchProperties();

  // Create Property
  const { isPending, mutate: addNewProperty } = useMutation({
    mutationFn: (data) => addProperty(data, user?.user?.token),

    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property added successfully');
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
  const { categories, isLoadingCategories } = useFetchCategories(1);

  // Select the current property values for the property being edited
  const currentPropertyValues = currentProperties?.paginate.find((property) => property.id === +propertyId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    if (isEdit) {
      updateProperty(
        {
          ...data,
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          location: data.location.value,
          imageIds: currentPropertyValues?.imageIds || [],
          appliances: data?.appliances?.split(','),
        },
        propertyId
      );
    } else {
      addNewProperty({
        ...data,
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        location: data.location.value,
        appliances: data.appliances.split(',').map((appliance) => appliance.trim()),
      });
    }
  };

  const options = [];
  if (locations) {
    options.push({ value: '', label: 'Select location' });
    locations?.paginate.forEach((location) => {
      options.push({
        value: location.id,
        label: `${location.district}, ${location.sector} - ${location.knownName}`,
      });
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative  mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[55rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>{title}</h2>

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
            <Controller
              name='location'
              control={control}
              defaultValue={currentPropertyValues?.locations || ''} // Default value
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    options={options}
                    styles={customStyles}
                    defaultInputValue={
                      isEdit
                        ? `${currentPropertyValues?.locations?.knownName} - ${currentPropertyValues?.locations?.district}`
                        : ''
                    }
                    placeholder='Select location'
                    isDisabled={isPending || isUpdating || isLoadingLocations}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    isClearable
                  />
                );
              }}
            />
          </VerticalFormRow>
        </div>

        {/* Details */}
        <VerticalFormRow label='Details' error={errors['details'] && errors['details'].message}>
          <Controller
            name='details'
            control={control}
            defaultValue={currentPropertyValues?.details || ''}
            rules={{ required: 'Details is required' }}
            render={({ field: { onChange, value } }) => <Editor onChange={onChange} value={value} />}
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
              {isLoadingCategories ? (
                <option value=''>Loading...</option>
              ) : isEdit ? (
                <option value={currentPropertyValues?.['property_type']}>
                  {currentPropertyValues?.['property-type']?.name}
                </option>
              ) : (
                <option value=''>Select category</option>
              )}

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

        <div className='flex justify-between gap-4'>
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

        <div className='flex justify-between gap-3'>
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

          {/* YouTube Video ID */}
          <VerticalFormRow
            label='YouTube Video ID'
            error={errors['youtubeVideoId'] && errors['youtubeVideoId'].message}
          >
            <Input
              isDisabled={isPending || isUpdating}
              id='youtubeVideoId'
              type='text'
              value={currentPropertyValues?.youtubeVideoId}
              placeholder='Enter YouTube video ID'
              register={register('YTUrl')}
            />
          </VerticalFormRow>
        </div>

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
          <Button type='submit' loading={isPending || isUpdating || isLoadingCategories || isLoadingLocations}>
            {isEdit ? 'Update' : 'Add'} Property
          </Button>
        </VerticalFormRow>
      </div>
    </form>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #d1d5db', // Tailwind's gray-300
    borderRadius: '0.375rem', // Tailwind's rounded-md
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Tailwind's shadow-sm
    backgroundColor: 'white', // Tailwind's bg-white
    width: '100%', // Full width
    opacity: state.isDisabled ? 0.4 : 1, // Disabled state
    '&:hover': {
      borderColor: state.isFocused ? '#b07c19' : '#d1d5db', // Change border color on hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '0.375rem', // Tailwind's rounded-md
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Tailwind's shadow-sm
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#b07c19' : 'white', // Tailwind's blue-600 on hover
    color: state.isFocused ? 'white' : 'black', // Text color change
    padding: '0.5rem', // Add padding
    cursor: 'pointer', // Change cursor to pointer
    '&:active': {
      backgroundColor: '#b07c19', // Tailwind's blue-500 for active state
    },
  }),
};

export default PropertyForm;
