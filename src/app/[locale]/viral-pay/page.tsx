import GetStartedViralPay from 'Features/Affiliate/ViralPay/GetStartedViralPay';
import StartEarningViralPay from 'Features/Affiliate/ViralPay/StartEarningViralPay';
import { Metadata } from 'next';
import React from 'react';

import dynamic from 'next/dynamic';

import { SkeletonBecomeAffiliate } from '@/components/Skeleton/SkeletonBecomeAffiliate';

// Lazy load heavy sections
const VibeContent = dynamic(
  () => import('Features/Affiliate/ViralPay/VibeContent'),
  { loading: () => <div className='h-40' /> }
);

const WhereToShine = dynamic(
  () => import('Features/Affiliate/ViralPay/WhereToShine'),
  { loading: () => <div className='h-40' /> }
);

const Rules = dynamic(() => import('Features/Affiliate/ViralPay/Rules'), {
  loading: () => <div className='h-20' />,
});

const BecomeAffiliate = dynamic(
  () => import('Features/Affiliate/BecomeAffiliate'),
  { loading: () => <SkeletonBecomeAffiliate /> }
);

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Viral Pay - Lush Skin',
    template: '%s | Viral Pay - Lush Skin',
  },
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
  keywords: [
    'Lush Skin Viral Pay',
    'Lush Skin affiliate program',
    'Viral Pay Cambodia',
    'beauty affiliate program',
    'skincare referral program',
    'earn money online sharing products',
    'Lush Skin ambassador program',
    'cosmetics affiliate program',
    'natural skincare rewards',
    'share and earn beauty products',
  ],

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/viral-pay`,
    languages: {
      en: `${process.env.NEXT_PUBLIC_SITE_URL}/viral-pay`,
    },
  },

  openGraph: {
    title: 'Viral Pay - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/viral-pay`,
    siteName: 'Lush Skin',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og/viral-pay.png`,
        width: 1200,
        height: 630,
        alt: 'Viral Pay - Lush Skin',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Viral Pay - Lush Skin',
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
function ViralPay() {
  return (
    <>
      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <GetStartedViralPay />
        <StartEarningViralPay />
      </div>

      <div>
        <VibeContent />
      </div>

      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <WhereToShine />
        <Rules />
        <BecomeAffiliate />
      </div>
    </>
  );
}

export default ViralPay;
