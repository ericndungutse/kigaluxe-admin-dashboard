import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { useUser } from '../../hooks/useUser';
import { useFetchCategories } from '../../hooks/categories.hooks';
import { addCategoryApi, updateCategoryApi } from '../../services/categories.service';
import toast from 'react-hot-toast';

const CategoryForm = ({ closeModal, categoryId }) => {
  const navigate = useNavigate();
  const user = useUser();
  const queryClient = useQueryClient();
  // Current categories
  const { categories } = useFetchCategories(1);
  let isEdit = Boolean(categoryId);

  // Create Category
  const { isPending, mutate: addNewCategory } = useMutation({
    mutationFn: (data) => addCategoryApi(data, user?.user?.token),

    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      toast.success('Category added successfully');
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

  // Update Category
  const { isPending: isUpdating, mutate: updateCategory } = useMutation({
    mutationFn: (data) => updateCategoryApi(data, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      toast.success('Category updated successfully');
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

  const currentCategoryValues = categories?.paginate.find((category) => category.id === +categoryId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    if (isEdit) {
      updateCategory(data, categoryId);
    } else {
      addNewCategory(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[30rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>{isEdit ? 'Edit' : 'Create New'} Category</h2>

      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-2 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      <div className='flex flex-col gap-4'>
        <VerticalFormRow label='Category Name' error={errors['name'] && errors['name'].message}>
          <Input
            isDisabled={isPending || isUpdating}
            type='text'
            id='name'
            placeholder='Enter category name'
            value={currentCategoryValues?.name || ''}
            register={register('name', { required: 'Category name is required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow label='Details' error={errors['details'] && errors['details'].message}>
          <textarea
            className='border rounded-md p-2'
            id='details'
            maxLength={500}
            placeholder='Enter details'
            defaultValue={currentCategoryValues?.details || ''}
            {...register('details', { required: 'Details are required' })}
          />
        </VerticalFormRow>

        <VerticalFormRow>
          <Button type='submit' loading={isPending || isUpdating}>
            {isEdit ? 'Update' : 'Add'} Category
          </Button>
        </VerticalFormRow>
      </div>
    </form>
  );
};

export default CategoryForm;
