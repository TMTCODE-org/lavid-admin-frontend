import { login } from '@/features/auth/actions/login.action';
import { CredentialsSignin, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export class InvalidLoginError extends CredentialsSignin {
  code = 'invalid_credentials';
}

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        try {
          const user = await login(
            credentials?.email as string,
            credentials?.password as string
          );
          return user;
        } catch (error: any) {
          throw new InvalidLoginError('Invalid credentials');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (user) {
          token = {
            ...token,
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              avatar: user.avatar,
              token: user.token,
              lastName: user.lastName
            }
          };
        }
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.token = token.accessToken as string;
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
} satisfies NextAuthConfig;

export default authConfig;
