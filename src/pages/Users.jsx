import React from 'react';
import Heading from '../components/Heading';
import UserList from '../features/user/UserList';

function Users() {
  return (
    <div className='px-6 flex flex-col gap-4'>
      <Heading text='All users' variation='h2' />
      <UserList />
    </div>
  );
}

export default Users;
