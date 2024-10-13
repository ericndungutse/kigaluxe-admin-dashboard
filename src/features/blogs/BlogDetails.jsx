import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import TextExtender from '../../components/TextExtender';
import { useFetchCategories } from '../../hooks/categories.hooks';
import { useFetchblogs } from '../../hooks/blogs.hooks';

export default function BlogDetails({ closeModal }) {
  const [searchParams] = useSearchParams();
  const { blogs } = useFetchblogs();
  const { categories } = useFetchCategories();

  const blog_id = searchParams.get('resource_id');
  const blogDetails = blogs?.paginate?.find((blog) => blog.id === +blog_id);

  const blog = {
    ...blogDetails,
    categoryId: categories?.paginate?.find((category) => category.id === blogDetails?.categoryId)?.name,
  };

  if (!blogDetails) {
    return <div className='p-14 bg-white'>Blog not found</div>;
  }

  return (
    <div className='max-w-4xl relative mx-auto p-6 bg-white rounded-lg shadow-md'>
      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-6 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>

      {/* Author and Date Created */}
      <div className='mb-4 text-secondary'>
        <p>
          <strong>Author:</strong> {blog.author ? blog.author.name : 'Unknown'}
        </p>
        <p>
          <strong>Date Created:</strong> {new Date(blogDetails.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Blog Featured Image */}
      {blog.featuredImg && (
        <div className='mb-6'>
          <img className='w-full h-auto rounded-lg' src={blog.url} alt='Blog Featured' />
        </div>
      )}

      {/* Blog Title */}
      <h2 className='text-3xl font-bold text-primary mb-6'>{blog.title}</h2>

      {/* Blog Content with TextExtender */}
      {/* <div className='mb-6'>
        <TextExtender text={blog.content} maxLength={150} />
      </div> */}

      <div
        className='mb-6'
        dangerouslySetInnerHTML={{ __html: blog.content }} // Renders HTML content
      />

      {/* Blog Details */}
      <div className='mb-6'>
        <p className='text-secondary'>
          <strong>Category:</strong> {blog.categoryId ? `Category ${blog.categoryId}` : 'Uncategorized'}
        </p>
      </div>

      {/* Blog Comments */}
      {/* <div className='mb-6'>
        <h3 className='text-xl font-semibold text-primary-light mb-4'>Comments {blog.commentCount}</h3>
        <ul className='list-none'>
          {dummyComments.map((comment) => (
            <li key={comment.id}>
              <p className='text-secondary'>
                <strong>{comment.authorName}</strong> ({new Date(comment.createdAt).toLocaleDateString()}):{' '}
                {comment.text}
              </p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
