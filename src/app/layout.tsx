import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/container';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Movie',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
