import {
  Bill,
  convertJsonToArrayBill
} from '@/features/bills/entity/bill.entity';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  avatar: string;
  createdAt: Date;
  skill?: string;
  bio?: string;
  phoneNumber: string;
  socialMedia?: Record<string, string>;
  referrerCode?: string;
  bills: Bill[];
}

export type CreateUser = Omit<
  User,
  'id' | 'createdAt' | 'isActive' | 'avatar' | 'bills'
> & { password: string };

export interface UserWithToken extends User {
  token: string;
}

export interface UserWithRefreshToken extends UserWithToken {
  refreshToken: string;
}

export const jsonUserToUserWithRefreshToken = (
  jsonUser: any
): UserWithRefreshToken => ({
  ...jsonUserToUserWithToken(jsonUser),
  refreshToken: jsonUser.refreshToken || ''
});

export const jsonUserToUserWithToken = (jsonUser: any): UserWithToken => ({
  ...jsonUserToUser(jsonUser),
  token: jsonUser.token
});

export const jsonUserToUser = (jsonUser: any): User => {
  if (!jsonUser || Object.keys(jsonUser).length === 0) {
    return {
      id: 'No ID',
      username: 'No Username',
      email: 'No Email',
      firstName: 'No First Name',
      lastName: 'No Last Name',
      isActive: false,
      avatar: '/images/avatars/default_man.jpg',
      createdAt: new Date(),
      skill: 'No Skill',
      bio: 'No Bio',
      phoneNumber: 'No Phone Number',
      socialMedia: {},
      bills: []
    };
  }

  return {
    id: jsonUser.id || '',
    username: jsonUser.username || 'No Username',
    email: jsonUser.email || 'No Email',
    firstName: jsonUser.firstName || 'No First Name',
    lastName: jsonUser.lastName || 'No Last Name',
    isActive: jsonUser.isActive || false,
    avatar: jsonUser.avatar || '/images/avatars/default_man.jpg',
    createdAt: new Date(jsonUser.createdAt) || new Date(),
    skill: jsonUser.skill,
    bio: jsonUser.bio,
    phoneNumber: jsonUser.phoneNumber || '',
    socialMedia: jsonUser.socialMedia || {},
    referrerCode: jsonUser.referrerCode,
    bills: convertJsonToArrayBill(jsonUser.bills)
  };
};
