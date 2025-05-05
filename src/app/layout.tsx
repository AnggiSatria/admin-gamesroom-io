import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactQueryProvider } from '@/shared/lib/helpers/client/RQuery';
import { SessionProviders } from '@/shared/lib/helpers/client/SessionProvider';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <SessionProviders>
          <ThemeProvider>
            <SidebarProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </SidebarProvider>
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
