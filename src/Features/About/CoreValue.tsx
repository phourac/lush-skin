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
  hidden: { opacity: 0, y: 28 },
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
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const decoItem: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};
const CoreValue = () => {
  const t = useTranslations('about');

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='bg-purple relative'
    >
      {/* Decorative SVG - Lazy load, only when visible */}
      <motion.div variants={decoItem}>
        <Image
          src={'/assets/core-value-02.svg'}
          alt=''
          width={293}
          height={293}
          loading='lazy'
          className='absolute top-0 -left-10 hidden aspect-square lg:block'
        />
      </motion.div>
      <motion.div variants={decoItem}>
        <Image
          src={'/assets/core-value-01.svg'}
          alt=''
          width={188}
          height={198}
          loading='lazy'
          className='absolute bottom-0 left-0 hidden lg:block'
        />
      </motion.div>

      <div className='mx-auto w-full max-w-[1240px] px-4 py-16 xl:px-0'>
        <div className='flex flex-col items-center gap-16 md:px-16 lg:flex-row'>
          <motion.div
            variants={container}
            className='flex flex-1 flex-col gap-8 md:pt-[100px]'
          >
            <motion.h1
              variants={item}
              className='text-pink text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'
            >
              {' '}
              {t('Core Value')}
            </motion.h1>
            <motion.p
              variants={item}
              className='text-pink text-[20px] leading-[140%] font-medium'
            >
              {t(
                'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
              )}
              .
            </motion.p>
            <motion.p
              variants={item}
              className='text-pink text-[20px] leading-[140%] font-medium'
            >
              {t(
                'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
              )}
              .
            </motion.p>
          </motion.div>

          {/* Banner Image Optimization (no UI change) */}
          <motion.div variants={imageItem}>
            <Image
              src='/images/mocks/core-value-banner.png'
              width={537}
              height={671}
              alt=''
              loading='lazy'
              sizes='(max-width: 768px) 90vw, 537px'
              className='h-auto w-auto rounded-[28px] object-cover'
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(CoreValue);
