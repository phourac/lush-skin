import AccountLayout from 'Features/Account';
import React from 'react';

// ---------------------------------------------
// SEO METADATA
// ---------------------------------------------
export const metadata = {
  title: 'Account - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
  },

  openGraph: {
    title: 'Account - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
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
    title: 'Account - Lush Skin',
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

function Account() {
  return (
    <div className='border-border border-b-[1px]'>
      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <AccountLayout />
      </div>
    </div>
  );
}

export default Account;
