import React from 'react';
import Heading from '../components/Heading';
import AppointmentList from '../features/appointments/AppointmentList';

function Appointments() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading text='All appointments' variation='h2' />
      <AppointmentList />
    </div>
  );
}

export default Appointments;
