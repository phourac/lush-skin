import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Image from 'next/image';

interface ButtonPaginationProps {
  current: number;
  total: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const IconButton = ({
  icon,
  alt,
  onClick,
}: {
  icon: string;
  alt: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className='bg-green hover:bg-green/80 active:bg-green/70 flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95'
  >
    <div className='relative h-4 w-2'>
      <Image
        src={icon}
        alt={alt}
        fill
        sizes='16px'
        className='object-contain'
      />
    </div>
  </button>
);

const ButtonPagination = ({
  current,
  total,
  handleNext,
  handlePrev,
}: ButtonPaginationProps) => {
  return (
    <div className='flex items-center justify-center gap-[10px]'>
      <IconButton
        icon='/assets/arrow-left.svg'
        alt='Previous'
        onClick={handlePrev}
      />

      <div className='bg-green text-typography-base flex items-center gap-1 rounded-[30px] px-4 py-2 text-[15px] leading-[21px] font-medium tracking-[-0.3px]'>
        <AnimatePresence mode='wait'>
          <motion.span
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {(current + 1).toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span>/</span>
        <span>{total.toString().padStart(2, '0')}</span>
      </div>

      <IconButton
        icon='/assets/arrow-right.svg'
        alt='Next'
        onClick={handleNext}
      />
    </div>
  );
};

export default ButtonPagination;
