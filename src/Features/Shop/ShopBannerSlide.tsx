'use client';

import { motion } from 'framer-motion';
import React from 'react';

import Image from 'next/image';

import ButtonPagination from '@/components/Button/ButtonPagination';

import useShopBannerSlide from './useShopBannerSlide';

const ShopBannerSlide = () => {
  const {
    current,
    handleNext,
    handlePrev,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    dataBanner,
  } = useShopBannerSlide();

  return (
    <div className='w-full overflow-hidden rounded-[16px]'>
      <div
        className='relative aspect-[870/326] w-full overflow-hidden rounded-[16px] bg-white'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className='flex h-full w-full'
          animate={{ x: `-${current * 100}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {dataBanner?.data.map((slide, idx) => (
            <motion.div
              key={slide.id}
              className='h-full w-full flex-shrink-0'
              animate={{
                opacity: idx === current ? 1 : 0.6,
                scale: idx === current ? 1 : 0.98,
              }}
              initial={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Image
                src={slide.imageUrl}
                alt={`Slide ${idx + 1}`}
                width={870}
                height={326}
                className='h-full w-full object-cover'
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className='hidden justify-center pt-[12px] sm:flex'>
        <ButtonPagination
          current={current}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={dataBanner?.data.length || 0}
        />
      </div>
    </div>
  );
};

export default ShopBannerSlide;
