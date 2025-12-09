'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

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

const StartEarning = React.memo(() => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        variants={container}
        className='flex flex-col items-center gap-4 py-12'
      >
        <motion.p
          variants={fadeUp}
          className='text-purple text-[18px] leading-[140%] font-semibold'
        >
          {t('Start Earning in Three Simple Steps')}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className='max-w-[797px] text-center text-[18px] leading-[140%] font-semibold text-black'
        >
          {t(
            'Our program is beginner-friendly and built for creators, influencers, or anyone who loves to share beauty finds'
          )}
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        className='flex w-full flex-col gap-6 pb-8 md:flex-row'
      >
        {earning.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <StartEarningCard
              index={idx}
              title={item.title}
              description={item.des}
              src={item.src}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

StartEarning.displayName = 'StartEarning';

export default StartEarning;
