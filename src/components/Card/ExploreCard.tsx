'use client';

import { motion } from 'framer-motion';
import { Link } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

interface IExploreCardProps {
  bgColor: string;
  title: string;
  link: string;
}

const ExploreCard = ({ bgColor, title, link }: IExploreCardProps) => {
  const t = useTranslations('body');

  return (
    <div className='relative h-[140px] w-full overflow-hidden sm:h-[160px] md:h-[180px] lg:h-[250px]'>
      {/* Background */}
      <div
        className={`${bgColor} absolute bottom-0 z-[1] h-[140px] w-full rounded-[24px] sm:h-[160px] sm:rounded-[28px] md:h-[180px] md:rounded-[30px] lg:h-[188px] lg:rounded-[32px]`}
      ></div>

      {/* Image (non-interactive) */}
      <Image
        src='/images/mocks/explore.png'
        alt='Explore'
        fill
        sizes='(max-width: 640px) 100vw,
         (max-width: 1024px) 100vw,
         100vw'
        className='pointer-events-none z-[2] object-contain object-bottom'
        priority
      />

      {/* Content */}
      <div className='absolute right-[5%] bottom-4 z-[3] px-3 sm:right-[8%] sm:bottom-5 sm:px-0 md:right-[10%] md:bottom-6 lg:right-[10%] lg:bottom-8'>
        <h1 className='text-primary pb-[1px] text-sm font-semibold sm:pb-[2px] sm:text-base md:text-lg lg:text-[18px]'>
          {t('Explore')}
        </h1>
        <h1 className='text-primary pb-2 text-2xl leading-tight font-semibold sm:pb-2 sm:text-2xl md:pb-3 md:text-3xl lg:pb-3 lg:text-[36px]'>
          {title}
        </h1>

        {/* Smooth minimal button */}
        <Link href={link}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='group bg-primary hover:bg-primary/90 flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 sm:text-base md:text-base'
          >
            <span className='transition-all duration-300 group-hover:opacity-90'>
              {t('Shop Now')}
            </span>

            <span className='relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white'>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className='flex items-center justify-center'
              >
                <div className='relative h-3 w-2'>
                  <Image
                    src='/assets/arrow-right-primary.svg'
                    alt='arrow'
                    fill
                    sizes='12px'
                    className='object-contain'
                  />
                </div>
              </motion.div>
            </span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreCard;
