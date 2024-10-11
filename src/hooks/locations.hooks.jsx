import { useQuery } from '@tanstack/react-query';
import { getAllLocations } from '../services/locations.service';

const useFetchLocations = (refetch = true) => {
  const {
    isPending: isLoadingLocations,
    data: locations,
    error: loadingLocationsError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
    enabled: refetch,
  });

  return { locations, isLoadingLocations, loadingLocationsError };
};

export default useFetchLocations;
