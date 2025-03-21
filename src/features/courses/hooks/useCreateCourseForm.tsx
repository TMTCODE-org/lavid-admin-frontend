import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createCourse } from '../actions/courses.action';
import { useSession } from 'next-auth/react';

export const CreateCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  offPrice: z.number().min(1, 'Off Price is required'),
  image: z.string().min(1, 'Image is required'),
  categoryId: z.string().min(1, 'Category is required'),
  languageId: z.string().min(1, 'Language is required'),
  instructorId: z.string().min(1, 'Instructor is required'),
  introVideoUrl: z.string().min(1, 'Intro Video Url is required'),
  packId: z.string().min(1, 'Pack is required'),
  downloadLink: z.string().optional(),
  pdfUrl: z.string().optional()
  // orderNumber: z.number().min(1, 'Order Number is required').optional()
});

export const useCreateCourseForm = () => {
  const form = useForm({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      offPrice: 0,
      image: '',
      categoryId: '',
      languageId: '',
      instructorId: '',
      introVideoUrl: '',
      packId: '',
      downloadLink: '',
      pdfUrl: '',
      orderNumber: 0
    }
  });

  const { data: session } = useSession();

  const createCourseMutation = useMutation({
    mutationKey: ['courses', 'create'],
    mutationFn: async (data: z.infer<typeof CreateCourseSchema>) => {
      const course = await createCourse(data, session?.user?.token!);

      return course;
    }
  });

  return { form, createCourseMutation };
};
