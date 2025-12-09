'use client';

import { AnimatePresence, motion } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';
import { useLocale } from 'next-intl';
import React, { useState } from 'react';

import Image from 'next/image';

const ProductUsage = ({
  detailHtmlEn,
  detailHtmlKh,
}: {
  detailHtmlEn: {
    description: string;
    howToUse: string;
    ingredients: string;
  };
  detailHtmlKh: {
    description: string;
    howToUse: string;
    ingredients: string;
  };
}) => {
  const locale = useLocale();

  const description =
    locale === 'en'
      ? detailHtmlEn?.description || detailHtmlKh?.description
      : detailHtmlKh?.description || detailHtmlEn?.description;

  const ingredients =
    locale === 'en'
      ? detailHtmlEn?.ingredients || detailHtmlKh?.ingredients
      : detailHtmlKh?.ingredients || detailHtmlEn?.ingredients;

  const howToUse =
    locale === 'en'
      ? detailHtmlEn?.howToUse || detailHtmlKh?.howToUse
      : detailHtmlKh?.howToUse || detailHtmlEn?.howToUse;

  const usage = [
    {
      id: 1,
      icon: '/assets/description.svg',
      title: 'Description',
      des: description,
    },
    {
      id: 2,
      icon: '/assets/ingredient.svg',
      title: 'Ingredients',
      des: ingredients,
    },
    {
      id: 3,
      icon: '/assets/info.svg',
      title: 'How to use',
      des: howToUse,
    },
  ];

  const [openIds, setOpenIds] = useState<number[]>(
    usage.length ? [usage[0].id] : []
  );
  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (!description && !ingredients && !howToUse) {
    return null;
  }

  return (
    <div className='bg-paper p-8'>
      <div className='mx-auto max-w-[940px]'>
        {usage.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <div key={item.id} className='border-border border-b py-8'>
              <button
                type='button'
                className='flex w-full cursor-pointer items-center justify-between'
                onClick={() => toggleAccordion(item.id)}
              >
                <div className='flex items-center gap-2'>
                  <div className='relative h-[20px] w-[20px]'>
                    <Image src={item.icon} alt={item.title} fill />
                  </div>
                  <p className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
                    {item.title}
                  </p>
                </div>

                <motion.div
                  className='text-primary flex items-center justify-center rounded-full text-[18px] font-bold'
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className='relative h-[13px] w-[13px]'>
                    <Image
                      src={isOpen ? '/assets/minus.svg' : '/assets/plus.svg'}
                      alt=''
                      fill
                    />
                  </div>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div
                      className='text-typography-base pt-8 text-[18px] leading-[140%] font-medium'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.des || ''),
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductUsage;
