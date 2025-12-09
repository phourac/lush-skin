'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useId } from 'react';

import Image from 'next/image';

interface CheckboxCustomProps {
  checked: boolean;
  onChange: () => void;
  label?: string;

  /** Checkbox shape: 'rounded' | 'square' */
  shape?: 'rounded' | 'square';

  /** Custom image for checked state */
  checkImage?: string;

  /** Width and height of the check icon */
  iconWidth?: number;
  iconHeight?: number;

  /** Size of the checkbox box itself */
  boxSize?: number;
}

const CheckboxCustom: React.FC<CheckboxCustomProps> = ({
  checked,
  onChange,
  label,
  shape = 'square',
  checkImage = '/assets/check.svg',
  iconWidth = 12,
  iconHeight = 12,
  boxSize = 20,
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className='group flex cursor-pointer items-center gap-3 rounded-md py-2 select-none'
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        className='sr-only' // Visually hidden but accessible to screen readers
        aria-label={label || 'Toggle option'} // 🔥 Ensures accessible name
      />

      {/* Visual checkbox */}
      <div
        role='presentation' // 🔥 Mark as decorative
        className={`relative flex items-center justify-center border transition-colors duration-200 ${checked ? 'border-primary bg-primary' : 'border-border group-hover:border-primary/60 bg-transparent'} ${shape === 'rounded' ? 'rounded-full' : 'rounded-md'} `}
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              key='check'
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className='flex items-center justify-center'
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
              }}
            >
              <Image
                src={checkImage}
                alt=''
                width={iconWidth}
                height={iconHeight}
                className='h-auto w-auto'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {label && (
        <span className='text-typography-base text-[15px] leading-[140%]'>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckboxCustom;
