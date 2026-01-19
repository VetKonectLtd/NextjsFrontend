import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/lib/react-query';
import Navbar from '@/components/shared/Navbar';
import { fontVariables } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';
import GoogleMapsScript from '@/components/shared/GoogleMapsScript';
import {NextIntlClientProvider} from 'next-intl';

export const metadata: Metadata = {
  title: 'VetKonect - Veterinary Practice Management',
  description: 'Modern veterinary practice management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${fontVariables} font-nunito min-h-screen bg-white`}>
        <GoogleMapsScript />
        <ReactQueryProvider>
          <div className="flex flex-col min-h-full">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
