import { useQuery } from '@tanstack/react-query';
import { getAllCourses } from '../actions/courses.action';

export const useGetCourses = () => {
  const getCoursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      return await getAllCourses({});
    }
  });

  return {
    getCoursesQuery
  };
};
