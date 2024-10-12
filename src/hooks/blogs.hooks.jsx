import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBlogApi, getAllBlogsApi, updateBlogApi } from '../services/blogs.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useCloseModal from './useCloseModal';

export const useFetchblogs = () => {
  const { data: blogs, isPending: isLoadingblogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogsApi,
  });

  return { blogs, isLoadingblogs };
};

export const useEditBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const closeModal = useCloseModal();
  // Delete Appointment
  const { isPending: isEditingBlog, mutate: editBlog } = useMutation({
    mutationFn: async ({ id, data, token }) => {
      await updateBlogApi(id, data, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      closeModal();
      toast.success('Blog updated successfully');
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

  return { isEditingBlog, editBlog };
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Delete Appointment
  const { isPending: isDeletingBlog, mutate: deleteBlog } = useMutation({
    mutationFn: async ({ id, token }) => {
      await deleteBlogApi(id, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      toast.success('Blog deleted successfully');
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

  return { isDeletingBlog, deleteBlog };
};
