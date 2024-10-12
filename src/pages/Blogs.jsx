import React from 'react';
import Heading from '../components/Heading';
import BlogsList from '../features/blogs/BlogsList';

function Blogs() {
  return (
    <div className='px-6 flex flex-col gap-4'>
      <Heading text='All blogs' variation='h2' />
      <BlogsList />
    </div>
  );
}

export default Blogs;
