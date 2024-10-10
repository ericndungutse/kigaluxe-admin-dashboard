import React from 'react';
import Heading from '../components/Heading';
import LocationsList from '../features/locations/LocationsList';

function Locations() {
  return (
    <div className='px-6 flex flex-col gap-4'>
      <Heading text='All locations' variation='h2' />
      <LocationsList />
    </div>
  );
}

export default Locations;
