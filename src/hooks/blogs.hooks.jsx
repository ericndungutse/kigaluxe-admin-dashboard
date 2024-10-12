import { useQuery } from '@tanstack/react-query';
import { getAllBlogsApi } from '../services/blogs.service';

export const useFetchblogs = () => {
  const { data: blogs, isPending: isLoadingblogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogsApi,
  });

  return { blogs, isLoadingblogs };
};
