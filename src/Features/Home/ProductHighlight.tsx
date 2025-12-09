'use client';

import { SessionPayload } from '@/actions/auth';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import ButtonBullet from '@/components/Button/ButtonBullet';
import ProductHighlightCard from '@/components/Card/ProductHighlightCard';
import TextGradient from '@/components/Text/TextGradient';

import useProductHighlight from './useProductHighlight';

const ProductHighlight = ({ session }: { session: SessionPayload | null }) => {
  const t = useTranslations('body');

  const {
    containerRef,
    currentIndex,
    handleNext,
    handlePrev,
    productHighlight,

    error,
    loading,
  } = useProductHighlight(session);

  if (productHighlight.length === 0 || error || loading) {
    return null;
  }

  return (
    <div className='mx-auto max-w-[1240px] px-4 xl:px-0'>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <TextGradient text={t('Product Highlight')} />
      </motion.div>

      <div className='relative z-10 pt-6'>
        <motion.div
          ref={containerRef}
          className={`no-scrollbar flex w-full pb-20 [&::-webkit-scrollbar]:hidden ${
            productHighlight.length === 1
              ? 'justify-center'
              : 'snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-visible scroll-smooth'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {productHighlight.map((pro, i) => (
            <motion.div
              key={i}
              className={
                productHighlight.length === 1 ? 'w-full' : 'shrink-0 snap-start'
              }
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <ProductHighlightCard
                pro={pro}
                length={productHighlight.length}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className='absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2'>
          <ButtonBullet
            current={currentIndex}
            total={productHighlight.length}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHighlight;
