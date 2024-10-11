import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Prompt from '../../components/Prompt';
import Table from '../../components/table/Table';
import { useDeleteAppointment, useEditAppointment, useFetchAppointments } from '../../hooks/appointment.hooks';
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
  const user = useUser();
  const { isDeletingAppointment, deleteAppointment } = useDeleteAppointment();
  const { isLoadingAppointments, appointments } = useFetchAppointments();
  const [loadingAppointmentId, setLoadingAppointmentId] = useState(null);
  const { editAppointment } = useEditAppointment();

  const handleDeleteAppointment = () => {
    deleteAppointment(
      { id: searchParams.get('resource_id'), token: user?.user?.token },
      {
        onSettled: () => closeModal(),
      }
    );
  };

  const displayAppointments = appointments?.paginate.map((app) => {
    return !app.isCompleted
      ? {
          ...app,
          isCompleted: (
            <Button
              size='sm'
              onClick={() => {
                setLoadingAppointmentId(app.id);
                editAppointment(
                  { id: app.id, token: user?.user?.token },
                  {
                    onSettled: () => setLoadingAppointmentId(null),
                  }
                );
              }}
              loading={loadingAppointmentId === app.id}
            >
              Complete
            </Button>
          ),
        }
      : app;
  });

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

      <Table headers={fields} data={displayAppointments} dropdownOptions='delete' />
    </div>
  );
}
