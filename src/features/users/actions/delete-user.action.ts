'use server';

import { axiosInstance } from '@/lib/axios-instance';

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/users/${id}`);

    return true;
  } catch (error) {
    console.log({
      error
    });
    return false;
  }
};
