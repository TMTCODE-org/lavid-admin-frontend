'use server';

import { axiosInstance } from '@/lib/axios-instance';
import { convertJsonToPack } from '../entities/pack.entity';

export const getAllPacksAction = async () => {
  try {
    const response = await axiosInstance.get('/packs');

    if (!response.data) {
      return [];
    }

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((pack: any) => convertJsonToPack(pack));
  } catch (error) {
    return [];
  }
};
