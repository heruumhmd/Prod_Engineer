import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dicoding Jobs',
  description: 'Temukan lowongan pekerjaan yang cocok untuk kamu di Dicoding Jobs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
