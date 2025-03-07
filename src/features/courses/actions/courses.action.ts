'use server';

import { Pagination } from '@/features/shared/entities/pagination';
import { axiosInstance } from '@/lib/axios-instance';
import { convertJsonToCourse } from '../entities/course.entity';

export const getAllCourses = async ({
  pagination
}: {
  pagination?: Pagination;
}) => {
  try {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 100;

    const response = await axiosInstance.get('/courses', {
      params: {
        page,
        limit
      }
    });

    if (!response.data) {
      return [];
    }

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((course) => convertJsonToCourse(course));
  } catch (error) {
    console.log({
      error
    });
    return [];
  }
};
