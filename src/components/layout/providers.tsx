'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ReactQueryProvider } from '../providers/react-query-provider';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
}
