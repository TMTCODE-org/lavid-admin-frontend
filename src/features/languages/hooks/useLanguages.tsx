import { useQuery } from '@tanstack/react-query';
import { getAllLanguages } from '../actions/get-all-languages.action';

export const useLanguages = () => {
  const languagesQuery = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const data = await getAllLanguages();

      return data;
    }
  });

  return {
    languagesQuery
  };
};
