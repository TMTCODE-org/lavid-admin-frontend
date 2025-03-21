'use server';

import { Pagination } from '@/features/shared/entities/pagination';
import { axiosInstance } from '@/lib/axios-instance';
import {
  convertJsonToCourse,
  Course,
  CreateCourse
} from '../entities/course.entity';
import { isAxiosError } from 'axios';

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

export const createCourse = async (
  createCourse: CreateCourse,
  token: string
): Promise<Course> => {
  try {
    if (createCourse.pdfUrl?.length === 0) {
      createCourse.pdfUrl = null;
    }

    if (createCourse.downloadLink?.length === 0) {
      createCourse.downloadLink = null;
    }

    const response = await axiosInstance.post(
      '/courses',
      {
        ...createCourse
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return convertJsonToCourse(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.log({
        error: error.response?.data
      });
    }

    return convertJsonToCourse({});
  }
};
