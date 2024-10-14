import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllLocations, uploadLocationImageApi } from '../services/locations.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

const useFetchLocations = (pageToFetch, refetch = true) => {
  const [searchParams] = useSearchParams();
  const page = pageToFetch || searchParams.get('page') || 1;
  const {
    isPending: isLoadingLocations,
    data: locations,
    error: loadingLocationsError,
  } = useQuery({
    queryKey: ['locations', String(page)],
    queryFn: () => getAllLocations(page),
    enabled: refetch,
  });

  return { locations, isLoadingLocations, loadingLocationsError };
};

export const useUploadLocationImage = () => {
  const [searchParams] = useSearchParams();
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const invalidateQuery = !searchParams.get('page') ? 'locations' : ['locations', searchParams.get('page')];

  const { isPending: isUploadingLocationimages, mutate: uploadLocationImage } = useMutation({
    mutationFn: async (formData) => {
      await uploadLocationImageApi(searchParams.get('resource_id'), formData, user?.user?.token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(invalidateQuery);
      toast.success('Location image uploaded successfully');
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

  return { isUploadingLocationimages, uploadLocationImage };
};

export default useFetchLocations;
