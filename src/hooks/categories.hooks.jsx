import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/categories.service';
import { useSearchParams } from 'react-router-dom';

export const useFetchCategories = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const { data: categories, isPending: isLoadingCategories } = useQuery({
    queryKey: ['categories', String(page)],
    queryFn: () => getAllCategories(page),
  });

  return { categories, isLoadingCategories };
};
