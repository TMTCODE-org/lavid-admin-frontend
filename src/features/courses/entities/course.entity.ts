import {
  Category,
  mapToCategory
} from '@/features/categories/entities/category.entity';
import {
  Language,
  mapToLanguage
} from '@/features/languages/entities/language.entity';
import { convertJsonToPack, Pack } from '@/features/packs/entities/pack.entity';
import { jsonUserToUser, User } from '@/features/users/entities/user.entity';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  offPrice: number;
  category: Category;
  averageRating: number;
  totalReviews: number;
  totalStudents: number;
  createdBy: User;
  image?: string | null;
  totalDuration: number;
  language: Language;
  instructor: User;
  introVideoUrl: string | null;
  downloadLink: string | null;
  pdfUrl: string | null;
  pack: Pack;
  prevId: string | null;
  isInSubscription: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCourse = ExtractIds<
  Pick<Course, 'category' | 'language' | 'pack'>
> &
  Omit<
    Course,
    'id' | 'createdAt' | 'updatedAt' | 'prevId' | 'instructor' | 'createdBy'
  >;

export const convertJsonToCourse = (json: any): Course => {
  if (!json || Object.keys(json).length === 0) {
    return {
      id: 'No ID',
      title: 'No Title',
      description: 'No Description',
      price: 0,
      offPrice: 0,
      category: mapToCategory({}),
      averageRating: 0,
      totalReviews: 0,
      totalStudents: 0,
      createdBy: jsonUserToUser({}),
      image: null,
      totalDuration: 0,
      language: mapToLanguage({}),
      instructor: jsonUserToUser({}),
      introVideoUrl: null,
      downloadLink: null,
      pdfUrl: null,
      isInSubscription: false,
      pack: convertJsonToPack({}),
      prevId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return {
    id: json?.id ?? 'No ID',
    title: json?.title ?? 'No Title',
    description: json?.description ?? 'No Description',
    price: Number(json?.price) || 0,
    offPrice: Number(json?.offPrice) || 0,
    category: mapToCategory(json?.category),
    averageRating: Number(json?.averageRating) || 0,
    totalReviews: Number(json?.totalReviews) || 0,
    totalStudents: Number(json?.totalStudents) || 0,
    createdBy: jsonUserToUser(json?.createdBy),
    image: json?.image ?? null,
    totalDuration: Number(json?.totalDuration) || 0,
    language: mapToLanguage(json?.language),
    instructor: jsonUserToUser(json?.instructor),
    introVideoUrl: json?.introVideoUrl ?? null,
    downloadLink: json?.downloadLink ?? null,
    pdfUrl: json?.pdfUrl ?? null,
    isInSubscription: json?.isInSubscription ?? false,
    pack: convertJsonToPack(json?.pack),
    createdAt: new Date(json?.createdAt),
    updatedAt: new Date(json?.updatedAt),
    prevId: json?.prevId ?? null
  };
};
