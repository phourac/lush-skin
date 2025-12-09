'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const AboutBanner = () => {
  const t = useTranslations('about');
  return (
    <section>
      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='max-w-[748px] py-16 text-[28px] leading-[130%] font-medium text-black md:text-[36px]'
        >
          {t(
            'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration'
          )}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className='relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden'
      >
        <Image
          src='/images/about-banner.png'
          alt='About Banner'
          priority
          fill
          sizes='(max-width: 768px) 100vw, 90vw'
          className='object-cover'
        />
      </motion.div>
    </section>
  );
};

export default React.memo(AboutBanner);
