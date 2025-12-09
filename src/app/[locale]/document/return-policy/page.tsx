import { getTranslations } from 'next-intl/server';
import React from 'react';

export const metadata = {
  title: 'Return Policy - Lush Skin',
  description:
    'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },

  openGraph: {
    title: 'Return Policy - Lush Skin',
    description:
      'Lush Skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/document/return-policy`,
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
    title: 'Return Policy - Lush Skin',
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
    'Lush Skin return policy',
    'Lush Skin refund policy',
    'product returns',
    'refund guidelines',
    'exchange policy',
    'cosmetic return conditions',
    'beauty product refund',
    'Lush Skin Cambodia',
    'return and refund terms',
    'customer service policy',
    'skincare return rules',
  ],
};
export default async function ReturnPolicy() {
  const t = await getTranslations('document');

  return (
    <div className='space-y-6'>
      <h1 className='text-typography-base text-[18px] font-semibold'>
        {t('Return policy')}
      </h1>

      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
      <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
        tincidunt enim, vitae dapibus lorem. Aliquam dignissim vel urna ut
        mollis. Mauris nulla libero, bibendum sed metus eu, posuere tristique
        odio. Aenean nec arcu quis sem volutpat tempor. Ut consequat tincidunt
        velit. Donec lacinia sit amet metus quis tincidunt. Sed mollis mi neque,
        vel pharetra tortor iaculis ac. Pellentesque mollis sapien vel odio
        interdum molestie.
      </p>
    </div>
  );
}
