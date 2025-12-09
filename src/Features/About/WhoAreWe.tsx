'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const WhoAreWe = () => {
  const t = useTranslations('about');

  return (
    <section className='flex flex-col items-center gap-12 pt-24 pb-16 md:flex-row'>
      {/* Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className='relative aspect-square w-full max-w-[420px] md:max-w-[500px]'
      >
        <Image
          src='/images/img-highlight-04.png'
          alt='Lush Skin Team'
          fill
          className='rounded-[12px] object-cover'
          sizes='(max-width: 768px) 80vw, 500px'
          loading='lazy'
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        variants={textContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='max-w-[600px] space-y-6'
      >
        <motion.h1
          variants={textItem}
          className='text-[24px] leading-[140%] font-semibold tracking-[-0.48px] text-black md:text-[32px]'
        >
          {t('Who Are We?')}
        </motion.h1>
        <div className='space-y-4 text-[18px] leading-[150%] text-black md:text-[20px]'>
          <motion.p variants={textItem}>
            {t(
              'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
            )}
            .
          </motion.p>
          <motion.p variants={textItem}>
            {t(
              'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
            )}
            .
          </motion.p>
          <motion.p variants={textItem} className='font-medium'>
            {t('The Lush Skin Team')}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(WhoAreWe);
