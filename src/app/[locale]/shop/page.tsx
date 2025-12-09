import { getSession } from '@/actions/auth';
import ShopItemsList from 'Features/Shop/ShopItemsList';
import React from 'react';

// ---------------------------------------------
// SEO METADATA
// ---------------------------------------------
// ---------------------------------------------
// SEO METADATA
// ---------------------------------------------
export const metadata = {
  title: {
    default: 'Shop Natural Skincare & Beauty Products – Lush Skin',
    template: '%s | Shop – Lush Skin',
  },
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  keywords: [
    'Lush Skin shop',
    'Lush Skin products',
    'natural skincare Cambodia',
    'beauty products online',
    'cosmetics store Cambodia',
    'skincare shop Cambodia',
    'glowing skin products',
    'buy skincare online',
    'Lush Skin cosmetics',
  ],

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
  },

  openGraph: {
    title: 'Shop - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
    siteName: 'Lush Skin',
    type: 'website',
    images: [
      {
        url: `/logo192.png`, // ← change to your real OG image
        width: 1200,
        height: 630,
        alt: 'Shop - Lush Skin Products',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shop - Lush Skin',
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

// ---------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------
async function Shop() {
  const session = await getSession();

  return (
    <div className='mx-auto max-w-[1240px] px-4 xl:px-0'>
      <ShopItemsList session={session} />
    </div>
  );
}

export default Shop;
