import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    avatar: string;
    createdAt: Date;
    skill?: string;
    token?: string;
    bio?: string;
    phoneNumber: string;
    socialMedia?: Record<string, string>;
  }
}
