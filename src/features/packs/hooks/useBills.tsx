import { useQuery } from '@tanstack/react-query';
import { getAllBills } from '../actions/get-all-bills.action';

export const useBills = () => {
  const billsQuery = useQuery({
    queryKey: ['bills'],
    queryFn: () => getAllBills(),
    staleTime: 1000 * 60 * 10
  });

  return {
    billsQuery
  };
};
