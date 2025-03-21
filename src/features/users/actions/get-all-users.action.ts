'use server';

import { Pagination } from '@/features/shared/entities/pagination';
import { axiosInstance } from '@/lib/axios-instance';
import { jsonUserToUser } from '../entities/user.entity';

export const getAllUsers = async ({
  pagination
}: {
  pagination?: Pagination;
}) => {
  try {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 100;

    const response = await axiosInstance.get('/users', {
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

    return response.data.map((user) => jsonUserToUser(user));
  } catch (error) {
    return [];
  }
};
