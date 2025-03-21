import { useQuery } from '@tanstack/react-query';
import { getAllPacksAction } from '../actions/get-all-packs.action';

export const usePacks = () => {
  const packsQuery = useQuery({
    queryKey: ['packs'],
    queryFn: async () => {
      return await getAllPacksAction();
    }
  });

  return {
    packsQuery
  };
};
