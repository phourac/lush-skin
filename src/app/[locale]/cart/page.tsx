import { getSession } from '@/actions/auth';
import CartReview from 'Features/Cart/CartReview';
import PopularPickList from 'Features/Cart/PopularPickList';
import React from 'react';

// ---------------------------------------------
// SEO METADATA
// ---------------------------------------------
export const metadata = {
  title: 'Cart - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
  },

  openGraph: {
    title: 'Cart - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
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
    title: 'Cart - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
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
};

export default async function Cart() {
  const session = await getSession();
  return (
    <div className='mx-auto max-w-[1240px] px-4 xl:px-0'>
      <CartReview />
      <PopularPickList {...{ session }} />
    </div>
  );
}
