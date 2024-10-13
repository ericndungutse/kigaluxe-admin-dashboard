import React from 'react';
import Heading from '../components/Heading';
import LocationsList from '../features/locations/LocationList';

function Locations() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading text='All locations' variation='h2' />
      <LocationsList />
    </div>
  );
}

export default Locations;
