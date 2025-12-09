'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < maxValue) onChange(value, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > minValue) onChange(minValue, value);
  };

  return (
    <div className='relative mx-auto w-full max-w-md pt-2 pb-2'>
      {/* Track */}
      <div
        className='absolute top-1/2 h-[8px] w-full -translate-y-1/2 rounded-full bg-gray-200'
        style={{ boxShadow: 'inset 0px 1px 4px 0px #00000033' }}
      />

      {/* Active track */}
      <motion.div
        className='bg-primary absolute top-1/2 h-[8px] -translate-y-1/2 rounded-full'
        animate={{
          left: `${((minValue - min) / (max - min)) * 100}%`,
          width: `${((maxValue - minValue) / (max - min)) * 100}%`,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />

      {/* Range Inputs */}
      <input
        ref={minRef}
        type='range'
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinChange}
        className='pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent'
        style={{ zIndex: minValue > (max - min) / 2 ? 5 : 3 }}
      />
      <input
        ref={maxRef}
        type='range'
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxChange}
        className='pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent'
        style={{ zIndex: maxValue <= (max - min) / 2 ? 5 : 3 }}
      />

      {/* Handles */}
      {[
        { value: minValue, ref: minRef, key: 'min' },
        { value: maxValue, ref: maxRef, key: 'max' },
      ].map(({ value, ref, key }) => (
        <motion.div
          key={key}
          className='absolute top-1/2 -translate-y-1/2 cursor-pointer'
          animate={{
            left: `${((value - min) / (max - min)) * 100}%`,
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
          style={{ marginLeft: '-12px' }}
          onPointerDown={(e) => {
            e.preventDefault();
            ref.current?.classList.add('pointer-events-auto');
            const handleUp = () => {
              ref.current?.classList.remove('pointer-events-auto');
              document.removeEventListener('pointerup', handleUp);
            };
            document.addEventListener('pointerup', handleUp);
          }}
        >
          <div
            className='bg-primary h-6 w-6 rounded-full border-[3px] border-white shadow-md'
            style={{ boxShadow: '0 1px 3px 0 #000E2B80' }}
          />
        </motion.div>
      ))}

      {/* Thumb styles */}
      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default DualRangeSlider;
