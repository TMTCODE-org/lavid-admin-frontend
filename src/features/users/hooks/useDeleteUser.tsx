import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../actions/delete-user.action';
import { toast } from 'sonner';
import { getQueryClient } from '@/lib/react-query';

export const useDeleteUser = () => {
  const queryClient = getQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const isDeleted = await deleteUser(userId);

      if (!isDeleted) throw new Error('User not deleted');
    },
    onSuccess: async () => {
      toast.success('User deleted successfully');
      await queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
    onError: () => {
      toast.error('User not deleted');
    }
  });

  return {
    deleteUserMutation
  };
};
