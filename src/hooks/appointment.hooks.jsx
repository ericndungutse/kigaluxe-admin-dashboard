import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAppointmentApi, getAllAppointmentsApi, upadteAppointmentApi } from '../services/appointments.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useFetchAppointments = () => {
  const { isPending: isLoadingAppointments, data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAllAppointmentsApi,
  });

  return { appointments, isLoadingAppointments };
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isDeletingAppointment, mutate: deleteAppointment } = useMutation({
    mutationFn: async ({ id, token }) => {
      await deleteAppointmentApi(id, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
      toast.success('Appointment deleted successfully');
    },
    onError: (error) => {
      if (error.message === 'Invalid or expired token' || error.message === 'Access token is missing or invalid') {
        toast.error('Please login to continue');
        navigate('/');
      } else {
        toast.error(error.message);
      }
    },
  });

  return { isDeletingAppointment, deleteAppointment };
};

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Delete Appointment
  const { isPending: isEditingAppointment, mutate: editAppointment } = useMutation({
    mutationFn: async ({ id, token }) => {
      await upadteAppointmentApi(id, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
      toast.success('Appointment completed successfully');
    },
    onError: (error) => {
      if (error.message === 'Invalid or expired token' || error.message === 'Access token is missing or invalid') {
        toast.error('Please login to continue');
        navigate('/');
      } else {
        toast.error(error.message);
      }
    },
  });

  return { isEditingAppointment, editAppointment };
};
