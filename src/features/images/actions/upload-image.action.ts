'use server';

import { axiosInstance } from '@/lib/axios-instance';

export const uploadImage = async (formData: FormData) => {
  const response = await axiosInstance.post('/images/upload', formData);

  const urlFile = response.data.file;

  return urlFile;
};
