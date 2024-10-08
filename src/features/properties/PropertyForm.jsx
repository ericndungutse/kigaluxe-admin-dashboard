import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import HorizontalFormRow from '../../components/HorizontalFormRow';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { getAllCategories } from '../../services/categories.service';
import { getAllLocations } from '../../services/locations.service';
import { addProperty } from '../../services/properties.service';
import toast from 'react-hot-toast';
import Button from '../../components/Button';

const PropertyForm = ({ onSubmit, closeModal }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate: addNewProperty } = useMutation({
    mutationFn: (data) => addProperty(data),

    onSuccess: () => {
      queryClient.invalidateQueries('properties');
      toast.success('Property added successfully');
      closeModal();
    },
  });

  // Fetch Categories
  const { data: categories, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  // FEtch Locations
  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    addNewProperty({ ...data, appliances: data.appliances.split(',').map((appliance) => appliance.trim()) });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative  mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[55rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>Create New Property</h2>

      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 absolute top-1 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3'>
          {/* Title */}
          <VerticalFormRow label='Title' error={errors['title'] && errors['title'].message}>
            <Input
              isDisabled={isPending}
              type='text'
              id='title'
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
              <option value=''>Select location</option>
              {locations?.paginate.map((location) => {
                return (
                  <option key={location.id} value={location.id}>
                    {location.knownName}, {location.district} district - {location.province}
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
            placeholder='Enter details'
            {...register('details', { required: 'Details is required' })}
          />
        </VerticalFormRow>

        <div className='flex justify-between gap-3'>
          <VerticalFormRow label='Year built' error={errors['yearBuilt'] && errors['yearBuilt'].message}>
            <Input
              isDisabled={isPending}
              type='date'
              id='yearBuilt'
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
              <option value=''>Select property type</option>
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
              isDisabled={isPending}
              type='number'
              id='property_size'
              placeholder='Enter property size'
              register={register('property_size')}
            />
          </VerticalFormRow>

          {/* Bathrooms */}
          <VerticalFormRow label='Bathrooms' error={errors['bathrooms'] && errors['bathrooms'].message}>
            <Input
              isDisabled={isPending}
              type='number'
              id='bathrooms'
              placeholder='Enter number of bathrooms'
              register={register('bathrooms')}
            />
          </VerticalFormRow>

          {/* Price */}
          <VerticalFormRow label='Price' error={errors['price'] && errors['price'].message}>
            <Input
              isDisabled={isPending}
              type='number'
              id='price'
              placeholder='Enter price'
              register={register('price', { required: 'Price is required' })}
            />
          </VerticalFormRow>

          {/* Bedrooms */}
          <VerticalFormRow label='Bedrooms' error={errors['bedrooms'] && errors['bedrooms'].message}>
            <Input
              isDisabled={isPending}
              type='number'
              id='bedrooms'
              placeholder='Enter number of bedrooms'
              register={register('bedrooms')}
            />
          </VerticalFormRow>
        </div>

        {/* Appliances */}
        <VerticalFormRow label='Appliances'>
          <Input
            isDisabled={isPending}
            id='appliances'
            placeholder='Enter comma separated list of appliances like fridge, stove, etc'
            register={register('appliances')}
          />
        </VerticalFormRow>

        <div className='flex items-center justify-between gap-4'>
          {/* Has Parking */}
          <HorizontalFormRow label='Has Parking'>
            <Input isDisabled={isPending} type='checkbox' id='hasParking' register={register('hasParking')} />
          </HorizontalFormRow>

          <HorizontalFormRow label='Has AC'>
            <Input isDisabled={isPending} type='checkbox' id='AC' register={register('AC')} />
          </HorizontalFormRow>

          {/* Is For Sale */}
          <HorizontalFormRow label='For Sale'>
            <Input isDisabled={isPending} type='checkbox' id='isForSale' register={register('isForSale')} />
          </HorizontalFormRow>

          {/* Is For Rent */}
          <HorizontalFormRow label='For Rent'>
            <Input isDisabled={isPending} type='checkbox' id='isForRent' register={register('isForRent')} />
          </HorizontalFormRow>

          {/* Has Pool */}
          <HorizontalFormRow label='Has pool'>
            <Input isDisabled={isPending} type='checkbox' id='isForRent' register={register('hasPool')} />
          </HorizontalFormRow>

          {/* Sold */}
          {/* TODO DEPENDS ON IS FOR SALE */}
          <HorizontalFormRow label='Sold'>
            <Input isDisabled={isPending} type='checkbox' id='isSold' register={register('isSold')} />
          </HorizontalFormRow>

          {/* Lans */}
          {/* TODO DEPENDS ON IS FOR SALE */}
          <HorizontalFormRow label='Land'>
            <Input isDisabled={isPending} type='checkbox' id='isLand' register={register('isLand')} />
          </HorizontalFormRow>
        </div>

        {/* Submit button */}
        <VerticalFormRow>
          <Button type='submit' loading={isPending}>
            Submit
          </Button>
        </VerticalFormRow>
      </div>
    </form>
  );
};

export default PropertyForm;
