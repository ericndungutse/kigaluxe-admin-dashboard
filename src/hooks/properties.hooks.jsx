import { useSearchParams } from 'react-router-dom';
import { fetchProperties } from '../services/properties.service';
import { useQuery } from '@tanstack/react-query';

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
