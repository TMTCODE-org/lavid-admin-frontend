import { axiosInstance } from '@/lib/axios-instance';
import { mapToLanguage } from '../entities/language.entity';

export const getAllLanguages = async () => {
  try {
    const response = await axiosInstance.get('/languages');

    if (!response.data) {
      return [];
    }

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((language: any) => mapToLanguage(language));
  } catch (error) {
    return [];
  }
};
