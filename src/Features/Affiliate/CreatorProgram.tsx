'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const program = [
  {
    title: 'Generous Commissions',
    des: 'Earn up to 15%',
    src: '/assets/commision-program.svg',
    color: 'purple',
  },
  {
    title: 'Premium Products',
    des: 'Beauty, skincare, and cosmetics trusted by thousands',
    src: '/assets/viral-pay.svg',
    color: 'primary',
  },
  {
    title: 'Generous Commissions',
    des: 'Earn up to 15%',
    src: '/assets/commision-program.svg',
    color: 'purple',
  },
  {
    title: 'Premium Products',
    des: 'Beauty, skincare, and cosmetics trusted by thousands',
    src: '/assets/viral-pay.svg',
    color: 'primary',
  },
];

/* ✅ Motion Variants */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const CreatorProgram = React.memo(() => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* ✅ Header */}
      <motion.div
        variants={container}
        className='flex flex-col items-center gap-4 py-12'
      >
        <motion.p
          variants={fadeUp}
          className='text-purple text-[18px] leading-[140%] font-semibold'
        >
          {t('Why join The Lush Creator program?')}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className='max-w-[797px] text-center text-[18px] leading-[140%] font-semibold text-black'
        >
          {t(
            'Our affiliate program is designed to reward your influence, passion, and creativity — while helping you grow your income with products people actually love'
          )}
        </motion.p>
      </motion.div>

      {/* ✅ Cards */}
      <motion.div
        variants={container}
        className='flex w-full flex-col gap-6 pb-8 md:flex-row'
      >
        {program.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className='border-border flex flex-1 flex-col items-center gap-4 rounded-[16px] border p-4'
          >
            <div
              className={`bg-${item.color} flex h-12 w-12 items-center justify-center rounded-full`}
            >
              <Image src={item.src} alt='' width={21} height={21} />
            </div>

            <div className='text-center'>
              <h1 className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
                {t(item.title)}
              </h1>

              <p className='text-typography-base text-[20px] leading-[140%] font-semibold'>
                {t(item.des)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

CreatorProgram.displayName = 'CreatorProgram';

export default CreatorProgram;
