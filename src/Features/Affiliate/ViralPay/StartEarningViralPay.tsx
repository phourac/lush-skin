'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

import StartEarningCard from '@/components/AffiliateCom/StartEarningCard';

import { earning } from '@/utils/data-util';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const StartEarningViralPay = () => {
  const t = useTranslations('affiliate');

  return (
    <motion.section
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='flex flex-col items-center justify-between gap-12 py-16 md:flex-row md:gap-20'
    >
      <motion.div
        variants={container}
        className='max-w-[650px] flex-1 space-y-6'
      >
        <motion.p
          variants={fadeUp}
          className='text-purple text-[18px] leading-[140%] font-semibold'
        >
          {t('Start Earning in Three Simple Steps')}
        </motion.p>

        <motion.div
          variants={container}
          className='space-y-3 text-[18px] leading-[150%] font-semibold text-black'
        >
          <motion.p variants={fadeUp}>
            {t(
              'LUSH Skin ViralPay is your chance to earn rewards simply by sharing your love for beauty!'
            )}
          </motion.p>
          <motion.p variants={fadeUp}>
            {t(
              'Create engaging content featuring LUSH Skin products, post it on your social media, and get rewarded with up to $100'
            )}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          className='space-y-3 text-[18px] leading-[150%] font-semibold text-black'
        >
          <motion.p variants={fadeUp}>
            {t(
              'Whether it’s a review, makeup tutorial, or lifestyle vlog — your creativity can turn into real rewards'
            )}
          </motion.p>
          <motion.p variants={fadeUp}>
            {t(
              'Join the movement and let your voice shine — because beauty deserves to be seen and celebrated!'
            )}
          </motion.p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className='text-[18px] leading-[150%] font-semibold text-black'
        >
          {t(
            'Our program is beginner-friendly and built for creators, influencers, or anyone who loves to share beauty finds'
          )}
        </motion.p>
      </motion.div>

      <motion.div variants={container} className='flex flex-1 flex-col gap-6'>
        {earning.map((item, index) => (
          <motion.div key={item.title} variants={fadeUp}>
            <StartEarningCard
              index={index}
              title={item.title}
              description={item.des}
              src={item.src}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default memo(StartEarningViralPay);
