import React from 'react';
import PropertiesList from '../features/properties/PropertiesList';
import Heading from '../components/Heading';

function Properties() {
  return (
    <div className='px-6 flex flex-col gap-4'>
      <Heading text='All properties' variation='h2' />
      <PropertiesList />
    </div>
  );
}

export default Properties;
