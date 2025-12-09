import AboutBanner from 'Features/About/AboutBanner';
import OurStory from 'Features/About/OurStory';
import WhoAreWe from 'Features/About/WhoAreWe';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';

import ImageHighlight from '@/components/ImageHighlight';

// Lazy-load below-the-fold sections to improve initial load
const CoreValue = dynamic(() => import('Features/About/CoreValue'), {
  ssr: true,
});
const ContactUs = dynamic(() => import('Features/About/ContactUs'), {
  ssr: true,
});
const Question = dynamic(() => import('Features/About/Question'), {
  ssr: true,
});
const Careers = dynamic(() => import('Features/About/Careers'), { ssr: true });

// ---------------------------------------------
// SEO METADATA
// ---------------------------------------------
export const metadata: Metadata = {
  title: 'About - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },

  openGraph: {
    title: 'About - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    siteName: 'Lush Skin',
    type: 'website',
    images: [
      {
        url: `/logo192.png`, // update to your real OG image
        width: 1200,
        height: 630,
        alt: 'About Lush Skin',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    images: [`/logo192.png`],
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

  keywords: [
    'Lush Skin',
    'About Lush Skin',
    'Lush Skin story',
    'beauty brand Cambodia',
    'skincare brand Cambodia',
    'cosmetics brand',
    'personal care products',
    'Lush Skin mission',
    'Lush Skin vision',
    'Core values Lush Skin',
    'beauty brand philosophy',
    'premium skincare products',
    'Lush Skin careers',
    'contact Lush Skin',
  ],
};

function About() {
  return (
    <div>
      <AboutBanner />

      {/* Shared Container */}
      <section className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <WhoAreWe />
        <OurStory />
      </section>

      <section className='pb-[124px]'>
        <ImageHighlight />
      </section>

      <Suspense fallback={null}>
        <CoreValue />
      </Suspense>

      <section className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <Suspense fallback={null}>
          <ContactUs />
          <Question />
        </Suspense>
      </section>

      <Suspense fallback={null}>
        <Careers />
      </Suspense>
    </div>
  );
}

export default React.memo(About);
