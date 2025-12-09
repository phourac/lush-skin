'use client';

import { motion } from 'framer-motion';
import useAddQty from 'hooks/useAddQty';
import React from 'react';

import Image from 'next/image';

interface AddQtyButtonProps {
  initialQty?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const AddQtyButton: React.FC<AddQtyButtonProps> = ({
  initialQty,
  min,
  max,
  onChange,
}) => {
  const { handleDecrease, handleIncrease, qty } = useAddQty({
    initialQty: initialQty,
    min,
    max,
    onChange,
  });
  return (
    <motion.div
      //   initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className='border-primary flex h-10 w-[106px] items-center justify-between rounded-lg border p-1'
    >
      <motion.button
        type='button'
        onClick={handleDecrease}
        whileTap={{ scale: 0.9 }}
        whileHover={{ opacity: 0.8 }}
        className='bg-primary-light flex h-8 w-8 items-center justify-center rounded-md text-white'
      >
        <div className='relative h-[18px] w-[18px]'>
          <Image src='/assets/remove.svg' alt='Remove' priority fill />
        </div>
      </motion.button>

      <motion.span
        key={qty}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className='text-typography-base flex-1 text-center text-[15px] leading-[140%] font-medium tracking-[-2%] select-none'
      >
        {qty}
      </motion.span>

      <motion.button
        type='button'
        onClick={handleIncrease}
        whileTap={{ scale: 0.9 }}
        whileHover={{ opacity: 0.8 }}
        className='bg-primary flex h-8 w-8 items-center justify-center rounded-md text-white'
      >
        <div className='relative h-[18px] w-[18px]'>
          <Image src='/assets/add.svg' alt='Add' priority fill />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default React.memo(AddQtyButton);
