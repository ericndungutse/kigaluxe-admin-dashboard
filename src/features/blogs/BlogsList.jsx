import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Prompt from '../../components/Prompt';
import Table from '../../components/table/Table';
import { useDeleteBlog, useFetchblogs, useUploadBlogImage } from '../../hooks/blogs.hooks';
import { useFetchCategories } from '../../hooks/categories.hooks';
import useCloseModal from '../../hooks/useCloseModal';
import { useUser } from '../../hooks/useUser';
import BlogDetails from './BlogDetails';
import BlogForm from './BlogForm';
import Pagination from '../../components/Pagination';
import ImageUploader from '../../components/ImageUploader';
import Search from '../../components/Search';
import LoadingSpinner from '../../components/LoadingSpinner';

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
  const closeModal = useCloseModal();
  const { isUploadingBlogimages, uploadBlogImage } = useUploadBlogImage();
  const id = searchParams.get('resource_id');

  const { categories } = useFetchCategories(1);
  const { isLoadingblogs, blogs, loadingBlogsError } = useFetchblogs();
  const { isDeletingBlog, deleteBlog } = useDeleteBlog();

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
      <div className='flex justify-end w-full'>
        <Search resource='blog' />
      </div>

      {isLoadingblogs ? (
        <LoadingSpinner />
      ) : loadingBlogsError ? (
        <div className='text-red-500 bg-red-200 text-center capitalize p-2 rounded'>{loadingBlogsError.message}</div>
      ) : (
        <>
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

          {searchParams.get('modal') === 'update-images' && (
            <Modal closeModal={closeModal}>
              <ImageUploader
                closeModal={closeModal}
                resourceId={searchParams.get('resource_id')}
                onSubmit={uploadBlogImage}
                uploading={isUploadingBlogimages}
                multiple={false}
              />
            </Modal>
          )}

          <Table headers={fields} data={displayBlogs} dropdownOptions='details,edit,update image,delete' />
          <div className='flex justify-between w-full'>
            <Button size='md' onClick={() => setIsOpen(true)} variant='secondary'>
              Create Blog
            </Button>
            <Pagination currentPage={blogs?.currentPage} totalPages={blogs?.totalPages} next={blogs?.next} />
          </div>
        </>
      )}
    </div>
  );
}
