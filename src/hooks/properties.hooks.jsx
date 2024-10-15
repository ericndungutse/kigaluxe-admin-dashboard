import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProperties, uploadPropertyImageApi } from '../services/properties.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUser';
import toast from 'react-hot-toast';
import useCloseModal from './useCloseModal';

export const useFetchProperties = (pageToFetch) => {
  const [searchParams] = useSearchParams();
  const page = pageToFetch || searchParams.get('page') || 1;

  const {
    data: properties,
    isPending: isLoadingProperties,
    isError,
  } = useQuery({
    queryKey: ['properties', page],
    queryFn: () => fetchProperties(page),
  });

  return { properties, isLoadingProperties, isError };
};

export const useUploadPropertyImages = () => {
  const [searchParams] = useSearchParams();
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const closeModal = useCloseModal();

  const invalidateQuery = !searchParams.get('page') ? 'properties' : ['properties', searchParams.get('page')];

  const { isPending: isUploadingPropertyimages, mutate: uploadPropertyImages } = useMutation({
    mutationFn: async (formData) => {
      await uploadPropertyImageApi(searchParams.get('resource_id'), formData, user?.user?.token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(invalidateQuery);
      closeModal();
      toast.success('Images uploaded successfully');
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

  return { isUploadingPropertyimages, uploadPropertyImages };
};
