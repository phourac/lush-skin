'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

interface StartEarningCardProps {
  index: number;
  title: string;
  description: string;
  src: string;
}

const StartEarningCard = React.memo(
  ({ index, title, description, src }: StartEarningCardProps) => {
    const t = useTranslations('affiliate');

    return (
      <div className='border-border relative flex-1 gap-6 overflow-hidden rounded-[16px] border p-8'>
        <h1 className='text-typography-base relative z-[2] text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
          {index + 1}. {t(title)}
        </h1>

        <p className='text-typography-base relative z-[2] pt-8 text-[15px] leading-[140%] tracking-[-0.3px]'>
          {t(description)}
        </p>

        <Image
          src={src}
          alt={`Step ${index + 1}`}
          width={97}
          height={97}
          loading='lazy'
          sizes='(max-width: 768px) 50vw, 97px'
          className='absolute top-0 right-0 z-[0]'
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    );
  }
);

StartEarningCard.displayName = 'StartEarningCard';

export default StartEarningCard;
