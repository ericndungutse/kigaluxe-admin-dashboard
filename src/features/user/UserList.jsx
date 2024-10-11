import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Table from '../../components/table/Table';
import { useUser } from '../../hooks/useUser';
import { useFetchUsers } from '../../hooks/users.hooks';

const fields = [
  {
    label: 'Image',
    key: 'profileImg',
  },
  {
    label: 'First Name',
    key: 'firstName',
  },
  {
    label: 'Last Name',
    key: 'lastName',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phoneNumber',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const id = searchParams.get('resource_id');

  // // Delete User
  // const { isPending: isDeleting, mutate: deleteUser } = useMutation({
  //   mutationFn: () => deleteUserApi(id, user?.user?.token),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('users');
  //     toast.success('User deleted successfully');
  //     closeModal();
  //   },
  //   onError: (error) => {
  //     if (error.message === 'Invalid or expired token' || error.message === 'Access token is missing or invalid') {
  //       toast.error('Please login to continue');
  //       navigate('/');
  //     } else {
  //       toast.error(error.message);
  //     }
  //   },
  // });

  // Load Users
  const { isLoadingUsers, users } = useFetchUsers();

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };

  if (isLoadingUsers) {
    return <div>Loading...</div>;
  }

  if (loadingUsersError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      {/* {searchParams.get('modal') === 'details' && (
        <Modal closeModal={closeModal}>
          <UserDetails closeModal={closeModal} />
        </Modal>
      )} */}

      {/* {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this user?'
            headingText='Delete user'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={() => deleteUser()}
            disabled={isDeleting}
          />
        </Modal>
      )} */}

      {/* {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <UserForm closeModal={closeModal} userId={searchParams.get('resource_id')} />
        </Modal>
      )} */}
      {/* 
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <UserForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )} */}

      <Table headers={fields} data={users.paginate} dropdownOptions='edit,delete' />

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Add User
      </Button>
    </div>
  );
}
