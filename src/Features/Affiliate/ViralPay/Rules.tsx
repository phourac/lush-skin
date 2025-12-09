'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

interface RuleItem {
  name: string;
}

interface RuleCardProps {
  title: string;
  icon: string;
  items: RuleItem[];
  bgIcon: string;
  iconList: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardAnim: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
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

const RuleCard: React.FC<RuleCardProps> = ({
  title,
  icon,
  items,
  bgIcon,
  iconList,
}) => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ scale: 1.02 }}
      className='border-border w-full space-y-8 rounded-[16px] border p-8'
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-typography-base text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
          {t(title)}
        </h1>

        <div
          className={`${bgIcon} flex h-12 w-12 items-center justify-center rounded-full p-3`}
        >
          <div className='relative h-6 w-6'>
            <Image src={icon} fill alt={`${title} icon`} loading='lazy' />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className='space-y-4'>
        {items.map((item, idx) => (
          <div key={idx} className='flex items-center gap-3'>
            <div className='relative h-[18px] w-[18px]'>
              <Image src={iconList} alt='Rule indicator' fill loading='lazy' />
            </div>
            <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
              {t(item.name)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const thingsToDo: RuleItem[] = [
  { name: 'Keep your content original and public' },
  { name: 'Include our official hashtag and mention' },
  { name: 'Keep videos at least 30 seconds long' },
  { name: 'Clearly show and mention LUSH Skin and the product purchased' },
];

const thingsNotToDo: RuleItem[] = [
  { name: 'No false or misleading claims' },
  { name: 'No explicit or inappropriate visuals' },
  { name: 'No duplicate or reposted submissions' },
  { name: 'No paid or fake views and engagements' },
];

const Rules = () => {
  const t = useTranslations('affiliate');

  return (
    <motion.div
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
      className='flex flex-col items-center gap-8 py-16'
    >
      {/* Header Section */}
      <motion.div
        variants={cardAnim}
        className='mx-auto flex w-full max-w-[790px] flex-col items-center gap-4 text-center'
      >
        <p className='text-purple text-[18px] leading-[140%] font-semibold'>
          {t('Glow Rules: What to Do (and Not Do)')}
        </p>

        <p className='text-[18px] leading-[140%] font-semibold text-black'>
          {
            'Stay creative, stay classy — and keep your content fresh, fun, and authentic To keep ViralPay fair and exciting for everyone, make sure your submission follows our simple guidelines'
          }
        </p>
      </motion.div>

      {/* Rule Cards */}
      <motion.div
        variants={container}
        className='flex w-full flex-col items-center justify-between gap-6 md:flex-row'
      >
        <RuleCard
          title='Bring Your Best Self'
          icon='/assets/viral-pay-thumbup.svg'
          bgIcon='bg-purple'
          iconList='/assets/viral-pay-check.svg'
          items={thingsToDo}
        />

        <RuleCard
          title='Avoid the No-Gos'
          icon='/assets/viral-pay-warning.svg'
          bgIcon='bg-pink'
          iconList='/assets/viral-pay-cancel.svg'
          items={thingsNotToDo}
        />
      </motion.div>
    </motion.div>
  );
};

export default Rules;
