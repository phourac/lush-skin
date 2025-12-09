'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageItem: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const OurStory = () => {
  const t = useTranslations('about');

  return (
    <motion.section
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      className='flex flex-col items-center space-y-8 pt-12 pb-16 text-center'
    >
      {' '}
      <h1 className='text-[24px] leading-[140%] font-semibold tracking-[-0.56px] text-black md:text-[32px]'>
        {t('Our Story')}
      </h1>
      <motion.div variants={imageItem}>
        <Image
          src='/images/logo-navbar.svg'
          alt='Lush Skin Logo'
          width={286}
          height={63}
          loading='lazy'
          sizes='(max-width: 768px) 200px, 286px'
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div>
      <motion.p
        variants={item}
        className='max-w-[500px] text-[18px] leading-[150%] font-medium text-black md:text-[20px]'
      >
        {t(
          'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
        )}
        .
      </motion.p>
    </motion.section>
  );
};

export default React.memo(OurStory);
