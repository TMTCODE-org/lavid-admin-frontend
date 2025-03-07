import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../actions/get-all-categories.action';

export const useCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await getAllCategories();
    }
  });

  return {
    categoriesQuery
  };
};
