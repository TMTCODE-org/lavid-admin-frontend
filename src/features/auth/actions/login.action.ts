import { jsonUserToUserWithRefreshToken } from '@/features/users/entities/user.entity';
import { axiosInstance } from '@/lib/axios-instance';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password
  });

  return jsonUserToUserWithRefreshToken(response.data);
};
