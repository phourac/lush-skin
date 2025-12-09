'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import Image from 'next/image';

import { useAppContext } from '@/contexts/AppClientContext';

import ButtonPagination from '@/components/Button/ButtonPagination';

import useSlideShowBanner from './useSlideShowBanner';

export const SlideshowBanner = () => {
  const { dataBanner } = useAppContext();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const bannerLength = dataBanner?.data?.length ?? 0;

  const {
    current,
    handleNext,
    handlePrev,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
  } = useSlideShowBanner(bannerLength);

  const handleImageLoad = (idx: number) => {
    setLoadedImages((prev) => new Set(prev).add(idx));
  };

  if (!dataBanner || dataBanner?.data?.length === 0) {
    return null;
  }

  return (
    <div
      className='relative aspect-[16/6] w-full overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Animated background pattern while loading */}
      {!loadedImages.has(current) && (
        <div className='absolute inset-0 animate-pulse bg-gray-200'>
          <div className='absolute inset-0 bg-gray-200' />
        </div>
      )}

      {/* Track with slides */}
      <motion.div
        className='flex h-full w-full'
        animate={{ x: `-${current * 100}%` }}
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {dataBanner?.data?.map((slide, idx) => {
          // Preload current, next, and previous images
          const shouldLoad =
            idx === current ||
            idx === (current + 1) % bannerLength ||
            idx === (current - 1 + bannerLength) % bannerLength;

          return (
            <motion.div
              key={slide.id}
              className='relative h-full w-full flex-shrink-0'
              animate={{
                opacity: idx === current ? 1 : 0.7,
                scale: idx === current ? 1 : 0.98,
              }}
              initial={{ opacity: 0.7, scale: 0.98 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {shouldLoad && (
                <>
                  {/* Loading skeleton */}
                  {!loadedImages.has(idx) && (
                    <div className='absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200' />
                  )}

                  <Image
                    src={slide.imageUrl}
                    alt={slide.name}
                    fill
                    sizes='100vw'
                    priority={idx === 0} // Priority load first image
                    quality={85} // Reduce quality slightly for faster load
                    className={`object-cover object-center transition-opacity duration-500 select-none ${
                      loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(idx)}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pagination buttons */}
      <div className='absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:flex'>
        <ButtonPagination
          current={current}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={dataBanner?.data?.length}
        />
      </div>
    </div>
  );
};
