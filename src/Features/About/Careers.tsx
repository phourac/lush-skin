'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

import ButtonBase from '@/components/Button/ButtonBase';

const CAREER_IMAGES = {
  decoration1: '/assets/career-01.svg',
  decoration2: '/assets/career-02.svg',
  banner: '/images/img-highlight-04.png',
};

/* ✅ Variants */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Careers = () => {
  const t = useTranslations('about');

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='bg-purple relative'
    >
      {/* Decorations */}
      <Image
        src={CAREER_IMAGES.decoration1}
        alt=''
        width={293}
        height={293}
        className='absolute top-0 -right-2 hidden aspect-square lg:block'
        priority
      />
      <Image
        src={CAREER_IMAGES.decoration2}
        alt=''
        width={188}
        height={198}
        className='absolute right-0 bottom-0 hidden lg:block'
        priority
      />

      <div className='mx-auto w-full max-w-[1240px] px-4 py-16 xl:px-0'>
        <motion.div
          variants={container}
          className='flex flex-col items-center gap-16 md:px-16 lg:flex-row'
        >
          {/* ✅ Banner Image Animation */}
          <motion.div variants={imageMotion}>
            <Image
              src={CAREER_IMAGES.banner}
              width={537}
              height={537}
              alt=''
              className='aspect-square rounded-[12px] object-cover'
              loading='lazy'
            />
          </motion.div>

          {/* ✅ Text Block Animation */}
          <motion.div
            variants={container}
            className='flex flex-1 flex-col gap-8 md:pt-[100px]'
          >
            <motion.h1
              variants={fadeUp}
              className='text-pink text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'
            >
              {t('Careers')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className='text-pink text-[20px] leading-[140%] font-medium'
            >
              {t(
                'Join the Lush Skin Affiliate Program Lush Creator — Earn While You Empower Beauty!'
              )}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className='text-pink text-[20px] leading-[140%] font-medium'
            >
              {t(
                'Share your love for beauty and get rewarded Whether you’re a creator, influencer, or skincare enthusiast — we’ve got a place for you'
              )}
              .
            </motion.p>

            <motion.div variants={fadeUp}>
              <ButtonBase className='bg-primary h-[48px] w-[181px] rounded-[12px] px-4 text-white shadow-[0_12px_12px_0_rgba(255,255,255,0.12)_inset,_0_-2px_2px_0_rgba(48,48,48,0.10)_inset]'>
                {t('Become an Affiliate')}
              </ButtonBase>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(Careers);
