import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBlogApi,
  deleteBlogApi,
  getAllBlogsApi,
  updateBlogApi,
  uploadBlogImageApi,
} from '../services/blogs.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useCloseModal from './useCloseModal';
import { useUser } from './useUser';

export const useFetchblogs = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const { data: blogs, isPending: isLoadingblogs } = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => getAllBlogsApi(page),
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

export const useCreateBlogApi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Delete Appointment
  const { isPending: isCreatingBlog, mutate: createBlog } = useMutation({
    mutationFn: async ({ data, token }) => {
      await createBlogApi(data, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('blogs');

      toast.success('Blog created successfully');
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

  return { isCreatingBlog, createBlog };
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

export const useUploadBlogImage = () => {
  const [searchParams] = useSearchParams();
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const invalidateQuery = !searchParams.get('page') ? 'locations' : ['locations', searchParams.get('page')];

  const { isPending: isUploadingBlogimages, mutate: uploadBlogImage } = useMutation({
    mutationFn: async (formData) => {
      await uploadBlogImageApi(searchParams.get('resource_id'), formData, user?.user?.token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(invalidateQuery);
      toast.success('Blog image uploaded successfully');
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

  return { isUploadingBlogimages, uploadBlogImage };
};
