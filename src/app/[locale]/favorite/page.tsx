import FavoriteList from 'Features/Favorite';
import React from 'react';

export const metadata = {
  title: 'Favorite - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/favorite`,
  },

  openGraph: {
    title: 'Favorite - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/favorite`,
    siteName: 'Lush Skin',
    type: 'website',
    images: [
      {
        url: `/logo192.png`, // update to your real OG image
        width: 1200,
        height: 630,
        alt: 'favorite Lush Skin',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'favorite - Lush Skin',
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

  keywords: [
    'Lush Skin Favorites',
    'Favorite beauty products',
    'Favorite skincare products',
    'Wishlist beauty items',
    'Skincare wishlist',
    'Beauty product favorites',
    'Lush Skin Cambodia',
    'Save products',
    'Shop favorite cosmetics',
    'Beauty shopping wishlist',
  ],
};
function Favorite() {
  return (
    <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
      <FavoriteList />
    </div>
  );
}

export default Favorite;
