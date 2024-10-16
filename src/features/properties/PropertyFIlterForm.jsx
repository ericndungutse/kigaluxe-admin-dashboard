import React from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button'; // Assuming you have this component
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { useFetchCategories } from '../../hooks/categories.hooks';

export default function PropertyFilterForm({ closeForm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { categories, isLoadingCategories } = useFetchCategories(1);

  const onSubmit = (data) => {
    const searcQueryObj = {
      ...data,
      ...(data.maxPrice && data.minPrice && { price: [data.minPrice, data.maxPrice] }),
      ...(data.minSize && data.maxSize && { property_size: [data.minSize, data.maxSize] }),
    };

    delete searcQueryObj.maxPrice;
    delete searcQueryObj.minPrice;
    delete searcQueryObj.minSize;
    delete searcQueryObj.maxSize;

    const newParams = new URLSearchParams(searchParams);
    Object.keys(searcQueryObj).forEach((key) => {
      if (searcQueryObj[key]) {
        newParams.set(key, searcQueryObj[key]);
      } else {
        newParams.delete(key);
      }
    });

    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    reset();
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(Object.fromEntries(newSearchParams)).forEach((key) => {
      newSearchParams.delete(key);
    });
    setSearchParams(newSearchParams);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full shadow-md border bg-white p-4 rounded-md mt-4'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between gap-3'>
          <VerticalFormRow label='Location' error={errors['location'] && errors['location'].message}>
            <Input type='text' id='location' placeholder='Enter location' register={register('location')} />
          </VerticalFormRow>

          <VerticalFormRow label='Property Type' error={errors['property_type'] && errors['property_type'].message}>
            <select id='property_type' {...register('property_type')} className='border rounded-md p-1.5'>
              {(isLoadingCategories && <option value=''>Loading...</option>) || (
                <option value=''>Select property type</option>
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

        <div className='flex gap-3 items-end justify-between'>
          {/* Price Range Filter */}
          <div>
            <VerticalFormRow label='Min price' error={errors['priceMin'] && errors['priceMin'].message}>
              <Input
                // isDisabled={isPending || isUpdating}
                type='number'
                id='price'
                value={0}
                placeholder='Enter minimum price'
                register={register('minPrice')}
              />
            </VerticalFormRow>
          </div>
          {/* Price Range Filter */}
          <div>
            <VerticalFormRow label='Max price' error={errors['priceMin'] && errors['priceMin'].message}>
              <Input type='number' id='price' placeholder='Enter maximum price' register={register('maxPrice')} />
            </VerticalFormRow>
          </div>

          <VerticalFormRow label='Min size'>
            <Input
              // isDisabled={isPending || isUpdating}
              type='number'
              id='minSize'
              placeholder='Enter minimum size in sqm'
              register={register('minSize')}
            />
          </VerticalFormRow>
          <VerticalFormRow label='Max size'>
            <Input
              // isDisabled={isPending || isUpdating}
              type='number'
              id='maxSize'
              placeholder='Enter maximum size sqm'
              register={register('maxSize')}
            />
          </VerticalFormRow>
        </div>
        <div className='flex gap-5 justify-between'>
          {/* Checkboxes (Horizontal Alignment) */}
          <div className='flex gap-2'>
            <div className='flex items-center'>
              <input {...register('isForSale')} type='checkbox' id='isForSale' />
              <label htmlFor='isForSale' className='ml-2'>
                For Sale
              </label>
            </div>

            <div className='flex items-center'>
              <input {...register('isForRent')} type='checkbox' id='isForRent' />
              <label htmlFor='isForRent' className='ml-2'>
                For Rent
              </label>
            </div>
          </div>
          <div className='flex gap-3'>
            <Button type='submit' size='sm' className='mt-4' variant='secondary' loading={isLoadingCategories}>
              Apply Filters
            </Button>
            <Button type='reset' size='sm' className='mt-4' variant='tertiary' onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
