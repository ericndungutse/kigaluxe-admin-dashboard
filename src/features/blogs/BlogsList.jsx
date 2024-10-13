import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Prompt from '../../components/Prompt';
import Table from '../../components/table/Table';
import { useDeleteBlog, useFetchblogs } from '../../hooks/blogs.hooks';
import { useFetchCategories } from '../../hooks/categories.hooks';
import useCloseModal from '../../hooks/useCloseModal';
import { useUser } from '../../hooks/useUser';
import BlogDetails from './BlogDetails';
import BlogForm from './BlogForm';
import Pagination from '../../components/Pagination';

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
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const id = searchParams.get('resource_id');
  const closeModal = useCloseModal();

  const { isLoadingCategories, categories } = useFetchCategories();
  const { isLoadingblogs, blogs } = useFetchblogs();
  const { isDeletingBlog, deleteBlog } = useDeleteBlog();

  if (isLoadingblogs || isLoadingCategories) {
    return <div>Loading...</div>;
  }

  const handleDeleteBlog = async () => {
    deleteBlog(
      { id, token: user?.user?.token },
      {
        onSettled: closeModal,
      }
    );
  };

  const displayBlogs = blogs?.paginate?.map((blog) => {
    const category = categories?.paginate?.find((category) => category.id === blog.categoryId);
    return {
      ...blog,
      categoryId: category?.name,
    };
  });

  return (
    <div className='flex flex-col gap-3 items-start'>
      {searchParams.get('modal') === 'details' && (
        <Modal closeModal={closeModal}>
          <BlogDetails closeModal={closeModal} />
        </Modal>
      )}
      {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this blog?'
            headingText='Delete blog'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={handleDeleteBlog}
            disabled={isDeletingBlog}
          />
        </Modal>
      )}
      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <BlogForm closeModal={closeModal} blogId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <BlogForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )}
      <Table headers={fields} data={displayBlogs} dropdownOptions='details,edit,delete' />
      <div className='flex justify-between w-full'>
        <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
          Create Blog
        </Button>
        <Pagination currentPage={blogs?.currentPage} totalPages={blogs?.totalPages} next={blogs?.next} />
      </div>
    </div>
  );
}
