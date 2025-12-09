import GetStarted from 'Features/Affiliate/GetStarted';
import React from 'react';

import dynamic from 'next/dynamic';

import ImageHighlight from '@/components/ImageHighlight';
import { SkeletonBecomeAffiliate } from '@/components/Skeleton/SkeletonBecomeAffiliate';
import { SkeletonCreatorProgram } from '@/components/Skeleton/SkeletonCreatorProgram';
import { SkeletonStartEarning } from '@/components/Skeleton/SkeletonStartEarning';

const CreatorProgram = dynamic(
  () => import('Features/Affiliate/CreatorProgram'),
  {
    loading: () => <SkeletonCreatorProgram />,
  }
);
const StartEarning = dynamic(() => import('Features/Affiliate/StartEarning'), {
  loading: () => <SkeletonStartEarning />,
});

const BecomeAffiliate = dynamic(
  () => import('Features/Affiliate/BecomeAffiliate'),
  {
    loading: () => <SkeletonBecomeAffiliate />,
  }
);

export const metadata = {
  title: 'Lush Creator - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/lush-creator`,
  },

  openGraph: {
    title: 'Lush Creator - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/lush-creator`,
    siteName: 'Lush Skin',
    type: 'website',
    images: [
      {
        url: `/logo192.png`, // update to your real OG image
        width: 1200,
        height: 630,
        alt: 'Creator Lush Skin',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Lush Creator - Lush Skin',
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
    'Lush Creator Program',
    'Lush Skin Affiliate',
    'Beauty affiliate program',
    'Skincare affiliate program',
    'Earn as creator Cambodia',
    'Beauty influencer program',
    'Lush Skin ambassador',
    'Affiliate marketing beauty',
    'Make money promoting skincare',
    'Content creator program Cambodia',
  ],
};

function LushCreator() {
  return (
    <>
      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <GetStarted />
      </div>

      <ImageHighlight />

      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <CreatorProgram />
        <StartEarning />
        {/* <ViralPay /> */}
        <BecomeAffiliate />
      </div>
    </>
  );
}

export default LushCreator;
