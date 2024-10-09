import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    enabled: false,
  });

  return {
    user,
  };
}
