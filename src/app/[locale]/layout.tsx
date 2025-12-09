import { deleteSession, getSession } from '@/actions/auth';
import '@/styles/globals.css';
import Auth from 'Features/Auth/Auth';
import { routing } from 'i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';

import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import { AppWrapper } from '@/contexts/AppServerContext';
import ClientProviders from '@/contexts/ClientProviders';

import Footer from '@/components/Footer';
import TopLoader from '@/components/Loading/TopLoader';
import Navbar from '@/components/Navbar';
import FooterSkeleton from '@/components/Skeleton/FooterSkeleton';
import NavbarSkeleton from '@/components/Skeleton/NavbarSkeleton';

const poppins = localFont({
  src: [
    {
      path: '../../../public/fonts/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

const kantumruyPro = localFont({
  src: [
    {
      path: '../../../public/fonts/KantumruyPro-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/KantumruyPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/KantumruyPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/KantumruyPro-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/KantumruyPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kantumruy-pro',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: {
    default: 'Lush Skin - Beauty, Cosmetics & Personal Care',
    template: '%s | Lush Skin - Beauty, Cosmetics & Personal Care',
  },

  description:
    'Lush Skin is a joyful natural skincare, beauty, cosmetic and personal care brand that transforms skincare into a celebration. Our signature ribbon-shaped “U” symbolizes happiness, confidence, and the joy of giving. Discover high-quality products designed to nourish, brighten, and enhance your glowing skin.',
  keywords: [
    'Lush Skin',
    'LushSkin Cambodia',
    'LushSkin skincare products',
    'natural skincare products',
    'skincare for glowing skin',
    'beauty and cosmetics',
    'best skincare routine',
    'personal care products',
    'organic skincare for radiant skin',
    'brightening skincare products',
    'skincare for sensitive skin',
    'Lush Skin beauty brand',
  ],
  creator: 'Lush Skin',
  publisher: 'Lush Skin',
  openGraph: {
    title: 'Lush Skin - Beauty, Cosmetics & Personal Care',
    description:
      'Experience natural skincare and beauty products from Lush Skin. Designed to nourish your skin, brighten your complexion, and elevate your daily routine.',
    siteName: 'Lush Skin',
    images: [
      {
        url: 'logo192.png',
        width: 1200,
        height: 630,
        alt: 'Lush Skin - Beauty, Cosmetics & Personal Care',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lush Skin - Beauty, Cosmetics & Personal Care',
    description:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    site: '@lushskin',
    creator: '@lushskin',
    images: ['logo192.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  category: 'beauty',
};

// export const viewport: Viewport = {
//   themeColor: '#ffffff',
// };
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const fontClass = locale === 'en' ? 'font-poppins' : 'font-kantumruy-pro';

  async function handleDeleteSes() {
    'use server';
    await deleteSession();
  }

  const sessioon = await getSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${kantumruyPro.variable} ${fontClass} flex min-h-screen flex-col antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders {...{ sessioon, handleDeleteSes }}>
            <AppWrapper>
              <main className='flex-1'>
                <TopLoader />
                <div className={`flex min-h-screen flex-col antialiased`}>
                  <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar />
                  </Suspense>{' '}
                  <main className='flex-1'>{children}</main>
                  <Suspense fallback={<FooterSkeleton />}>
                    <Footer />
                  </Suspense>{' '}
                  <Auth />
                </div>
              </main>
            </AppWrapper>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
