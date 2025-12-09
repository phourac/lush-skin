'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import ButtonBase from '@/components/Button/ButtonBase';

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemAnim: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
const GetStarted = React.memo(() => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      variants={containerAnim}
      initial='hidden'
      animate='visible'
      className='flex flex-col items-center gap-4 py-8 text-center'
    >
      <motion.p
        variants={itemAnim}
        className='text-purple text-[18px] leading-[140%] font-semibold'
      >
        {t('Welcome to Lush Skin Affiliate Program!')}
      </motion.p>

      <motion.h1
        variants={itemAnim}
        className='max-w-[530px] text-[42px] leading-[130%] font-semibold text-black md:text-[60px]'
      >
        {t('Ready to join The Lush Creator?')}
      </motion.h1>
      <motion.div variants={itemAnim}>
        <ButtonBase className='h-[48px] rounded-[12px] px-8'>
          {t('Get Started')}
        </ButtonBase>
      </motion.div>
    </motion.div>
  );
});

GetStarted.displayName = 'GetStarted';

export default GetStarted;
