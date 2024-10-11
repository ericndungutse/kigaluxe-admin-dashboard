import { useQuery } from '@tanstack/react-query';
import { getAllUsersApi } from '../services/user.service';

export const useFetchUsers = () => {
  const {
    data: users,
    error,
    isPending: isLoadingUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersApi,
  });

  return { users, isLoadingUsers };
};
