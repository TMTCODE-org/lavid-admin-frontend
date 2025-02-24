'use server';

import { convertJsonToArrayBill } from '@/features/bills/entity/bill.entity';
import { axiosInstance } from '@/lib/axios-instance';

export const getAllBills = async () => {
  try {
    const response = await axiosInstance.get('/bills/dashboard?limit=30');
    if (!response.data) {
      return [];
    }

    if (!Array.isArray(response.data)) {
      return [];
    }

    return convertJsonToArrayBill(response.data);
  } catch (error) {
    return [];
  }
};
