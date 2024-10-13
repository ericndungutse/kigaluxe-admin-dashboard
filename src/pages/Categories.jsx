import React from 'react';
import Heading from '../components/Heading';
import CategoriesList from '../features/categories/CategoryList';

function Categories() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading text='All categories' variation='h2' />
      <CategoriesList />
    </div>
  );
}

export default Categories;
