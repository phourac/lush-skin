'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

import Image from 'next/image';

const SocialMediaToShine = [
  { name: 'Facebook', icon: '/viral-pay-facebook.svg' },
  { name: 'Instagram', icon: '/viral-pay-instagram.svg' },
  { name: 'TikTok', icon: '/viral-pay-tiktok.svg' },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemAnim: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

const WhereToShine = () => {
  const t = useTranslations('affiliate');

  return (
    <motion.section
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      variants={container}
      className='flex flex-col items-center gap-8 py-16'
    >
      {/* Top Text Section */}
      <motion.div
        variants={itemAnim}
        className='flex max-w-[790px] flex-col items-center gap-4 px-4 text-center'
      >
        <p className='text-purple text-[18px] leading-[140%] font-semibold'>
          {t('Where to Shine')}
        </p>

        <p className='text-[18px] leading-[140%] font-semibold text-black'>
          {t(
            'Your content deserves a platform that celebrates creativity — post it where you shine the most Upload your ViralPay videos to'
          )}
        </p>

        <p className='text-[15px] leading-[140%] font-medium text-black'>
          {t('Tag')}{' '}
          <span className='text-primary font-semibold'>@lushskin.cc</span>{' '}
          {t('and use')}{' '}
          <span className='text-primary font-semibold'>#lushskinviralpay</span>{' '}
          {t('to make sure we see your glow-up moment!')}
        </p>
      </motion.div>

      {/* Social Media Grid */}
      <motion.div
        variants={container}
        className='flex w-full flex-col items-center justify-between gap-6 md:flex-row'
      >
        {SocialMediaToShine.map((item) => (
          <motion.div
            variants={itemAnim}
            whileHover={{ scale: 1.05 }}
            key={item.name}
            className='border-border flex w-full items-center justify-center gap-4 rounded-[16px] border p-8'
          >
            <div className='relative h-[40px] w-[40px]'>
              <Image
                src={`/assets/${item.icon}`}
                alt={`${item.name} icon`}
                loading='lazy'
                fill
              />
            </div>

            <p className='text-purple text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
              {item.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default memo(WhereToShine);
