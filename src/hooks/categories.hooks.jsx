import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/categories.service';

export const useFetchCategories = () => {
  const {
    data: categories,
    error,
    isPending: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return { categories, isLoadingCategories };
};
