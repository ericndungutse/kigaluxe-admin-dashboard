import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProperties, filterProperty, uploadPropertyImageApi } from '../services/properties.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUser';
import toast from 'react-hot-toast';
import useCloseModal from './useCloseModal';

export const useFetchProperties = (pageToFetch) => {
  const [searchParams] = useSearchParams();
  const page = pageToFetch || searchParams.get('page') || 1;

  const query = [
    {
      key: 'location',
      value: searchParams.get('location'),
    },
    {
      key: 'property_size',
      value: searchParams.get('property_size'),
    },
    {
      key: 'price',
      value: searchParams.get('price'),
    },
    {
      key: 'property_type',
      value: searchParams.get('property_type'),
    },
    {
      key: 'isForSale',
      value: searchParams.get('isForSale'),
    },
    {
      key: 'isForRent',
      value: searchParams.get('isForRent'),
    },
  ];

  let requestQuery = '';

  // Build react query Query Name
  const queryName = ['properties', String(page)];
  for (const item of query) {
    if (item.value) {
      if (item?.key === 'price' || item?.key === 'property_size') {
        requestQuery += `${item?.key}=[${item?.value?.split(',')[0]},${item?.value?.split(',')[1]}]&`;
      } else {
        requestQuery += `${item?.key}=${item?.value}&`;
      }
      queryName.push(item?.value);
    }
  }

  // Remove the last character of the query(&)
  requestQuery = requestQuery.slice(0, -1);

  const {
    data: properties,
    isPending: isLoadingProperties,
    isError,
    error,
  } = useQuery({
    queryKey: queryName,
    queryFn: () => {
      if (requestQuery) {
        return filterProperty(requestQuery, page);
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
