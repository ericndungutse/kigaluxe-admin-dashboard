import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProperties, filterProperty, uploadPropertyImageApi } from '../services/properties.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUser';
import toast from 'react-hot-toast';
import useCloseModal from './useCloseModal';

export const useFetchProperties = (pageToFetch) => {
  const [searchParams] = useSearchParams();
  const page = pageToFetch || searchParams.get('page') || 1;

  // Build query to the api: Like location=<name>&...
  let query = '';
  Object.entries(Object.fromEntries(searchParams)).forEach(([key, value]) => {
    if (key === 'page') return;
    // IF key is price or property_size, split the value and add it to the query
    // Normaly comes as price=100,1000 => price=[100,1000]
    if (key === 'price' || key === 'property_size') {
      query += `${key}=[${value.split(',')[0]},${value.split(',')[1]}]&`;
    } else {
      query += `${key}=${value}&`;
    }
  });

  // Remove the last character of the query(&)
  query = query.slice(0, -1);

  // Build react query Query Name
  const queryName = query ? ['properties', String(page), query] : ['properties', String(page)];

  const {
    data: properties,
    isPending: isLoadingProperties,
    isError,
    error,
  } = useQuery({
    queryKey: queryName,
    queryFn: () => {
      if (query) {
        return filterProperty(query, page);
      } else {
        return fetchProperties(page);
      }
    },
  });

  return { properties, isLoadingProperties, isError, error };
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
