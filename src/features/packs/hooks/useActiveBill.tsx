import { Bill } from '@/features/bills/entity/bill.entity';
import { useMutation } from '@tanstack/react-query';
import { activeBill } from '../actions/active-bill.action';
import { useSession } from 'next-auth/react';
import { getQueryClient } from '@/lib/react-query';
import { toast } from 'sonner';

export const useActiveBill = () => {
  const queryClient = getQueryClient();

  const { data } = useSession();

  const activeBillMutation = useMutation({
    mutationKey: ['bills', 'activate'],
    mutationFn: async (bill: Bill) => {
      return await activeBill(bill.id, data?.token as string);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bills']
      });

      toast.success('Pack activado');
    },
    onError: () => {
      toast.error('Algo ocurrio');
    }
  });

  return {
    activeBillMutation
  };
};
