import { axiosInstance } from '@/lib/axios-instance';
import { mapToCategory } from '../entities/category.entity';

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');

    const data = response.data;

    if (!data) {
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    const categories = data.map((category: any) => mapToCategory(category));

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
