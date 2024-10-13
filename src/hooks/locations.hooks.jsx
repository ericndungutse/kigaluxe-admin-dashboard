import { useQuery } from '@tanstack/react-query';
import { getAllLocations } from '../services/locations.service';
import { useSearchParams } from 'react-router-dom';

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

export default useFetchLocations;
