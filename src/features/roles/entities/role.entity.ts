import { NumbersHelper } from '@/helpers/numbers.helper';

export interface Role {
  id: number;
  name: string;
  description: string;
}

export const convertJsonToRole = (data: any): Role => {
  if (!data) {
    return {
      id: NumbersHelper.randomNumber(1, 100),
      name: '',
      description: ''
    };
  }

  return {
    id: Number(data.id) || NumbersHelper.randomNumber(1, 100),
    name: data.name || '',
    description: data.description || ''
  };
};

export const convertListJsonToRoles = (data: any): Role[] => {
  if (!data) {
    return [];
  }

  return data.map((item: any) => convertJsonToRole(item));
};
