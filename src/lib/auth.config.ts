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
    async jwt({ token, user }) {
      if (user) {
        if (user) {
          token = {
            ...token,
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              avatar: user.avatar
            }
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
} satisfies NextAuthConfig;

export default authConfig;
