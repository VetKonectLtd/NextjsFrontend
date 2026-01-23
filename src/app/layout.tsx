import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/lib/react-query';
import Navbar from '@/components/shared/Navbar';
import { fontVariables } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';
import GoogleMapsScript from '@/components/shared/GoogleMapsScript';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: "Vet Konect | Digital Animal Care & Veterinary Services Across Africa",
    template: "%s | Vet Konect",
  },

  description:
    "Vet Konect is Africa’s all-in-one digital animal health platform connecting pet owners, livestock farmers, veterinarians, and clinics to trusted care, feeds, veterinary drugs, AI disease prediction, and real-time disease alerts.",

  applicationName: "Vet Konect",
  generator: "Next.js",
  category: "Animal Health & Veterinary Services",

  keywords: [
    "veterinary services in Africa",
    "digital animal health platform",
    "find a vet near me",
    "livestock health management",
    "pet care services",
    "veterinary clinics",
    "animal disease alerts",
    "veterinary drugs and feeds",
    "AI disease prediction for animals",
    "Vet Konect",
  ],

  authors: [{ name: "Vet Konect" }],
  creator: "Vet Konect",
  publisher: "Vet Konect",

  metadataBase: new URL("https://vetkonect.com"),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vetkonect.com",
    siteName: "Vet Konect",
    title: "Vet Konect | Re-imagining Animal Care Across Africa",
    description:
      "Connecting animal owners across Africa to veterinarians, clinics, feeds, drugs, secure payments, AI disease prediction, and real-time animal health alerts — all in one trusted platform.",
    images: [
      {
        url: "/og-image.png", // place in /public
        width: 1200,
        height: 630,
        alt: "Vet Konect Digital Animal Care Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vet Konect | Digital Animal Care Platform",
    description:
      "Quality animal care at your fingertips. Find vets, clinics, feeds, drugs, and disease alerts across Africa with Vet Konect.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};



export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <Script id="google-translate-init"
        dangerouslySetInnerHTML={{
          __html: `
      window.__GOOGLE_TRANSLATION_CONFIG__ = {
        languages: [
          { title: 'English', name: 'en' },
          { title: 'French', name: 'fr' },
          { title: 'Spanish', name: 'es' },
          { title: 'Italian', name: 'it' },
          { title: 'Portuguese', name: 'pt' },
          { title: 'Swahili', name: 'sw' },
          { title: 'Afrikaans', name: 'af' },
          { title: 'Amharic', name: 'am' },
          { title: 'Hausa', name: 'ha' },
          { title: 'Yoruba', name: 'yo' },
          { title: 'Igbo', name: 'ig' },
          { title: 'Zulu', name: 'zu' },
          { title: 'Somali', name: 'so' },
          { title: 'Shona', name: 'sn' },
          { title: 'Malagasy', name: 'mg' }
        ],
        defaultLanguage: 'en',
      };

      window.TranslateInit = function() {
              if (!window.__GOOGLE_TRANSLATION_CONFIG__) return;
              new google.translate.TranslateElement({
                pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
    `,
        }} strategy="beforeInteractive" />

      {/* <Script src="@/app/assets/translation" strategy="beforeInteractive" /> */}
      <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit"  strategy="afterInteractive" />

      <body className={`${fontVariables} font-nunito min-h-screen bg-white`}>
       <div id="google_translate_element" className="hidden" />
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
