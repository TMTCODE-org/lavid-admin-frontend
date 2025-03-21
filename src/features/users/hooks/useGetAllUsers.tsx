import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../actions/get-all-users.action';

export const useGetAllUsers = () => {
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await getAllUsers({
        pagination: {
          limit: 1000,
          page: 1
        }
      });
    }
  });

  return {
    userQuery
  };
};
