'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

import Image from 'next/image';

import ButtonBase from '@/components/Button/ButtonBase';

const leftAnim: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const rightAnim: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};
const GetStartedViralPay = () => {
  const t = useTranslations('affiliate');

  return (
    <motion.section
      initial='hidden'
      animate='visible'
      className='flex flex-col items-center justify-between gap-8 py-8 md:flex-row md:gap-16'
    >
      {/* LEFT CONTENT */}
      <motion.div
        variants={leftAnim}
        className='flex flex-col items-start gap-4 text-center md:text-left'
      >
        <p className='text-purple text-[18px] leading-[140%] font-semibold'>
          {t(
            'Your creativity is worth celebrating — and we’re here to reward it'
          )}
        </p>

        <h1 className='text-[42px] leading-[130%] font-semibold text-black md:text-[60px]'>
          {t('Go Viral Get Paid')}
        </h1>

        <ButtonBase className='h-[48px] rounded-[12px] px-8'>
          {t('Get Started')}
        </ButtonBase>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div variants={rightAnim}>
        {' '}
        <Image
          src={'/images/viralpay-banner.png'}
          alt=''
          width={453}
          height={542}
          sizes='(max-width: 768px) 260px, 453px'
          priority
          className='h-auto w-auto'
        />{' '}
      </motion.div>
    </motion.section>
  );
};

export default memo(GetStartedViralPay);
