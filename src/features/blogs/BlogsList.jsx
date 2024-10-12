import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';

import { useUser } from '../../hooks/useUser';
import { useFetchblogs } from '../../hooks/blogs.hooks';
import { useFetchCategories } from '../../hooks/categories.hooks';

const fields = [
  {
    label: 'Title',
    key: 'title',
  },
  {
    label: 'Category',
    key: 'categoryId',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function BlogsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const id = searchParams.get('resource_id');

  //   // Delete Category
  //   const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
  //     mutationFn: () => deleteCategoryApi(id, user?.user?.token),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('categories'); // Invalidate 'categories' query after deletion
  //       toast.success('Category deleted successfully');
  //       closeModal();
  //     },
  //     onError: (error) => {
  //       if (error.message === 'Invalid or expired token' || error.message === 'Access token is missing or invalid') {
  //         toast.error('Please login to continue');
  //         navigate('/');
  //       } else {
  //         toast.error(error.message);
  //       }
  //     },
  //   });

  //   const closeModal = () => {
  //     const newParams = new URLSearchParams(searchParams);
  //     newParams.delete('modal');
  //     newParams.delete('resource_id');
  //     setSearchParams(newParams);
  //   };

  const { isLoadingCategories, categories } = useFetchCategories();
  const { isLoadingblogs, blogs } = useFetchblogs();

  if (isLoadingblogs || isLoadingCategories) {
    return <div>Loading...</div>;
  }

  const displayBlogs = blogs?.paginate?.map((blog) => {
    const category = categories?.paginate?.find((category) => category.id === blog.categoryId);
    return {
      ...blog,
      categoryId: category?.name,
    };
  });

  return (
    <div className='flex flex-col gap-3 items-start'>
      {/* {searchParams.get('modal') === 'delete' && (
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
      )} */}

      {/* {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <CategoryForm closeModal={closeModal} categoryId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <CategoryForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )} */}

      <Table headers={fields} data={displayBlogs} dropdownOptions='details,edit,delete' />

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Create Blog
      </Button>
    </div>
  );
}
