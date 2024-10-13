import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';

import Modal from '../../components/Modal';
import Prompt from '../../components/Prompt';
import { useFetchCategories } from '../../hooks/categories.hooks';
import { useUser } from '../../hooks/useUser';
import CategoryForm from './CategoryForm';
import { deleteCategoryApi } from '../../services/categories.service';
import toast from 'react-hot-toast';
import useCloseModal from '../../hooks/useCloseModal';
import Pagination from '../../components/Pagination';

const fields = [
  {
    label: 'Category Name',
    key: 'name',
  },
  {
    label: 'Details',
    key: 'details',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function CategoriesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const closeModal = useCloseModal();
  const queryClient = useQueryClient();
  const id = searchParams.get('resource_id');

  // Delete Category
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: () => deleteCategoryApi(id, user?.user?.token),
    onSuccess: () => {
      queryClient.invalidateQueries('categories'); // Invalidate 'categories' query after deletion
      toast.success('Category deleted successfully');
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

  // Load Categories
  const { isLoadingCategories, categories } = useFetchCategories();

  if (isLoadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this category?'
            headingText='Delete category'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={() => deleteCategory()}
            disabled={isDeleting}
          />
        </Modal>
      )}

      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <CategoryForm closeModal={closeModal} categoryId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <CategoryForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )}

      <Table headers={fields} data={categories.paginate} dropdownOptions='edit,delete' />
      <div className='flex justify-between w-full'>
        <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
          Add Category
        </Button>
        <Pagination currentPage={categories?.currentPage} totalPages={categories?.totalPages} next={categories?.next} />
      </div>
    </div>
  );
}
