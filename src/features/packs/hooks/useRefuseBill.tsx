import { Bill } from '@/features/bills/entity/bill.entity';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { refuseBill } from '../actions/refuse-bill.action';
import { getQueryClient } from '@/lib/react-query';
import { toast } from 'sonner';

export const useRefuseBill = () => {
  const { data } = useSession();
  const queryClient = getQueryClient();

  const refuseBillMutation = useMutation({
    mutationKey: ['bills', 'refuse'],
    mutationFn: async (bill: Bill) => {
      return await refuseBill(bill.id, data?.token as string);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bills']
      });

      toast.success('Pack Rechazado');
    },
    onError: () => {
      toast.error('Algo ocurrio');
    }
  });

  return {
    refuseBillMutation
  };
};
