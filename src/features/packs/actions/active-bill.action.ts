'use server';

import { convertJsonToBill } from '@/features/bills/entity/bill.entity';
import { axiosInstance } from '@/lib/axios-instance';

export const activeBill = async (
  billId: string,
  ownerId: string,
  token: string
) => {
  const response = await axiosInstance.patch(
    `/bills/${billId}/activate`,
    {
      ownerId
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
  );

  return convertJsonToBill(response.data);
};
