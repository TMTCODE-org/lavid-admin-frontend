'use server';

import { convertJsonToBill } from '@/features/bills/entity/bill.entity';
import { axiosInstance } from '@/lib/axios-instance';

export const refuseBill = async (billId: string, token: string) => {
  const response = await axiosInstance.patch(
    `/bills/${billId}/refuse`,
    {}
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
  );

  return convertJsonToBill(response.data);
};
