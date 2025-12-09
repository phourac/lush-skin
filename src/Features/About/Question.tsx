'use client';

import { AnimatePresence, type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

import Image from 'next/image';

/* ✅ Scroll animation variants */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemMotion: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const questions = [
  {
    id: 1,
    ques: 'Frequently Asked Questions',
    answer:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration. Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration',
  },
  {
    id: 2,
    ques: 'Frequently Asked Questions',
    answer:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration. Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration',
  },
  {
    id: 3,
    ques: 'Frequently Asked Questions',
    answer:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration. Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration',
  },
  {
    id: 4,
    ques: 'Frequently Asked Questions',
    answer:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration. Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration',
  },
  {
    id: 5,
    ques: 'Frequently Asked Questions',
    answer:
      'Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration. Lush skin is a joyful beauty, cosmetic and personal care brand that transforms skincare into a celebration',
  },
];

const QuestionItem = React.memo(
  ({
    item,
    isOpen,
    onToggle,
  }: {
    item: any;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    const t = useTranslations('about');

    return (
      <motion.div
        variants={itemMotion}
        className='border-border cursor-pointer rounded-[16px] border p-6'
        onClick={onToggle}
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-[18px] font-semibold text-black'>
            {t(item.ques)}
          </h1>

          {/* ✅ Arrow rotation */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className='bg-green flex h-8 w-8 items-center justify-center rounded-full'
          >
            <div className='relative h-[8px] w-[16px]'>
              <Image src='/assets/arrow-down.svg' alt='arrow' fill />
            </div>
          </motion.div>
        </div>

        {/* ✅ Accordion content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'
            >
              <p className='mt-6 text-[15px] leading-[140%] font-medium tracking-[-0.3px] text-black'>
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

QuestionItem.displayName = 'QuestionItem';

const Question = () => {
  const t = useTranslations('about');
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='flex flex-col items-center gap-16 pt-8 pb-[124px]'
    >
      {/* ✅ Header */}
      <motion.div variants={itemMotion} className='space-y-6 text-center'>
        <h1 className='text-[28px] leading-[140%] font-semibold tracking-[-0.56px] text-black'>
          {t('Frequently Asked Questions')}
        </h1>
        <p>
          {t('Here are some frequently asked questions (FAQ) about Lush Skin')}
        </p>
      </motion.div>

      {/* ✅ FAQ List */}
      <motion.div variants={container} className='flex w-full flex-col gap-6'>
        {questions.map((item) => (
          <QuestionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Question;
