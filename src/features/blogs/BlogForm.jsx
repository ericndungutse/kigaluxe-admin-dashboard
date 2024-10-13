import React from 'react';
import { useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import Button from '../../components/Button';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
// import { updateBlogApi } from '../../services/blogs.service';
import { useCreateBlogApi, useEditBlog, useFetchblogs } from '../../hooks/blogs.hooks';
import { useFetchCategories } from '../../hooks/categories.hooks';
import { useUser } from '../../hooks/useUser';

const BlogForm = ({ closeModal, blogId }) => {
  const user = useUser();
  const isEdit = Boolean(blogId);

  // Fetch categories for selection
  const { categories, isLoadingCategories } = useFetchCategories();
  const { isEditingBlog, editBlog } = useEditBlog();
  const { isCreatingBlog, createBlog } = useCreateBlogApi();
  const { blogs } = useFetchblogs();
  const currentBlog = blogs?.paginate?.find((blog) => blog.id === +blogId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    if (isEdit) {
      editBlog({ id: blogId, data, token: user?.user?.token });
    } else {
      createBlog(
        { data, token: user?.user?.token },
        {
          onSettled: closeModal,
        }
      );
    }
  };

  const blogCategory = categories?.paginate?.find((category) => category.id === currentBlog?.categoryId);

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='relative mx-auto p-4 space-y-6 bg-white shadow-md rounded-lg w-[40rem]'
    >
      <h2 className='text-2xl font-semibold text-gray-700'>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h2>

      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-2 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      {/* Blog Title */}
      <VerticalFormRow label='Title' error={errors['title'] && errors['title'].message}>
        <Input
          isDisabled={isEditingBlog || isCreatingBlog}
          type='text'
          id='title'
          placeholder='Enter blog title'
          value={currentBlog?.title}
          register={register('title', { required: 'Title is required' })}
        />
      </VerticalFormRow>

      {/* Blog Category */}
      <VerticalFormRow label='Category' error={errors['categoryId'] && errors['categoryId'].message}>
        <select
          id='category'
          {...register('categoryId', { required: 'Category is required' })}
          className='border rounded-md p-1.5'
          defaultChecked={currentBlog?.categoryId}
        >
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : blogCategory ? (
            <option value={blogCategory?.id}>{blogCategory?.name}</option>
          ) : (
            <option value=''>Select category</option>
          )}

          {categories?.paginate.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </VerticalFormRow>

      {/* Blog Content */}
      <VerticalFormRow label='Content' error={errors['content'] && errors['content'].message}>
        <textarea
          className='border rounded-md p-2'
          id='content'
          defaultValue={currentBlog?.content}
          placeholder='Enter blog content'
          {...register('content', { required: 'Content is required' })}
        />
      </VerticalFormRow>

      {/* Submit Button */}
      <VerticalFormRow>
        <Button type='submit' loading={(isEdit && isEditingBlog) || isCreatingBlog}>
          {isEdit ? 'Update Blog' : 'Add Blog'}
        </Button>
      </VerticalFormRow>
    </form>
  );
};

export default BlogForm;
