'use server';

import { convertJsonToBill } from '@/features/bills/entity/bill.entity';
import { axiosInstance } from '@/lib/axios-instance';

export const activeBill = async (billId: string, token: string) => {
  const response = await axiosInstance.patch(
    `/bills/${billId}/activate`,
    {}
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
  );

  return convertJsonToBill(response.data);
};
