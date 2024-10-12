import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBlogApi, getAllBlogsApi } from '../services/blogs.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useFetchblogs = () => {
  const { data: blogs, isPending: isLoadingblogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogsApi,
  });

  return { blogs, isLoadingblogs };
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
