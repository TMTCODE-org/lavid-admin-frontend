import { mapToTypeCategory, TypeCategory } from './type-category.entity';

export interface Category {
  id: number;
  name: string;
  description: string;
  type: TypeCategory;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mapToCategory = (data: any): Category => {
  if (!data) {
    return {
      id: 0,
      name: '',
      description: '',
      type: {
        id: 0,
        name: ''
      },
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: mapToTypeCategory(data.type),
    image: data.image,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
};
