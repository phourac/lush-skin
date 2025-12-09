'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import ButtonBase from '@/components/Button/ButtonBase';

/* ✅ Motion Variant */
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

const BecomeAffiliate = React.memo(() => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      className='flex flex-col items-center gap-4 py-8 text-center'
    >
      <motion.p
        variants={fadeUp}
        className='text-purple text-[18px] leading-[140%] font-semibold'
      >
        {t('Ready to join the movement?')}
      </motion.p>

      <motion.p
        variants={fadeUp}
        className='max-w-[790px] text-[18px] leading-[140%] font-semibold text-black'
      >
        {t(
          'Sign up for our content affiliate program today and start earning while sharing your love for all things beauty!'
        )}
      </motion.p>

      <motion.div variants={fadeUp}>
        <ButtonBase className='h-[48px] rounded-[12px] px-4'>
          {t('Become an Affiliate')}
        </ButtonBase>
      </motion.div>
    </motion.div>
  );
});

BecomeAffiliate.displayName = 'BecomeAffiliate';

export default BecomeAffiliate;
