'use client';

import { SessionProvider } from 'next-auth/react'; // Tambahkan import SessionProvider

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SessionProviders = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};
