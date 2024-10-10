import { useQuery } from '@tanstack/react-query';
import { getAllLocations } from '../services/locations.service';

const useFetchLocations = () => {
  const {
    isPending: isLoadingLocations,
    data: locations,
    error: loadingLocationsError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });

  return { locations, isLoadingLocations, loadingLocationsError };
};

export default useFetchLocations;
