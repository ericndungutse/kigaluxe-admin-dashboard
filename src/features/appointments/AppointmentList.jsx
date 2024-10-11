import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Prompt from '../../components/Prompt';
import Table from '../../components/table/Table';
import { useDeleteAppointment, useFetchAppointments } from '../../hooks/appointment.hooks';
import { useUser } from '../../hooks/useUser';

const fields = [
  {
    label: 'Names',
    key: 'Names',
  },

  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Phone',
    key: 'phoneNumber',
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Completed',
    key: 'isCompleted',
  },
  {
    label: 'Action',
    key: 'action',
  },
];

export default function AppointmentList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const { isDeletingAppointment, deleteAppointment } = useDeleteAppointment();
  const { isLoadingAppointments, appointments } = useFetchAppointments();
  const id = searchParams.get('resource_id');

  const handleDeleteAppointment = () => {
    deleteAppointment(id, user?.user?.token, {
      onSettled: () => closeModal(),
    });
  };

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  };

  if (isLoadingAppointments) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-3 items-start'>
      {searchParams.get('modal') === 'delete' && (
        <Modal closeModal={closeModal}>
          <Prompt
            message='Are you sure you want to delete this appointment?'
            headingText='Delete appointment'
            yesText='Delete'
            noText='Cancel'
            onCloseModel={closeModal}
            onConfirm={handleDeleteAppointment}
            disabled={isDeletingAppointment}
          />
        </Modal>
      )}
      {/* 
      {searchParams.get('modal') === 'edit' && (
        <Modal closeModal={closeModal}>
          <AppointmentForm closeModal={closeModal} appointmentId={searchParams.get('resource_id')} />
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <AppointmentForm closeModal={() => setIsOpen(false)} />
        </Modal>
      )} */}

      <Table headers={fields} data={appointments?.paginate} dropdownOptions='edit,delete' />

      <Button size='sm' onClick={() => setIsOpen(true)}>
        Add Appointment
      </Button>
    </div>
  );
}
