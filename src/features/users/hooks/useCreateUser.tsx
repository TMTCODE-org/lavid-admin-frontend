import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.'
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  }),
  firstName: z.string().min(3, {
    message: 'First name must be at least 3 characters.'
  }),
  lastName: z.string().min(3, {
    message: 'Last name must be at least 3 characters.'
  }),
  avatar: z.string().url().optional()
});

export const useCreateUser = () => {
  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      firstName: '',
      lastName: '',
      avatar: ''
    }
  });

  return {
    form
  };
};
