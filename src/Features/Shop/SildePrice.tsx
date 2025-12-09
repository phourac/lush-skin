'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { IFilterForm } from './FilterSide';

const SildePrice = () => {
  const { control, watch, setValue } = useFormContext<IFilterForm>();

  const min = 0;
  const max = 100;

  // Watch values from the form
  const priceMin = watch('priceMin') ?? min;
  const priceMax = watch('priceMax') ?? max;

  // Local state for debouncing
  const [localMin, setLocalMin] = useState(priceMin);
  const [localMax, setLocalMax] = useState(priceMax);

  // Update local values when form changes externally (like reset or clearAll)
  useEffect(() => {
    setLocalMin(priceMin);
    setLocalMax(priceMax);
  }, [priceMin, priceMax]);

  // Debounce effect: update form values after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue('priceMin', localMin);
      setValue('priceMax', localMax);
    }, 1000); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [localMin, localMax, setValue]);

  // Handle slider change (instant local update)

  return (
    <div className='space-y-6'>
      {/* Dual Range Slider */}
      {/* <div className='pb-6 pl-2'>
        <DualRangeSlider
          min={min}
          max={max}
          minValue={localMin}
          maxValue={localMax}
          onChange={handleChange}
        />
      </div> */}

      {/* Inputs */}
      <div className='flex w-full gap-[10px]'>
        {/* From */}
        <Controller
          control={control}
          name='priceMin'
          render={() => (
            <div className='flex w-full flex-col items-start space-y-2'>
              <p className='text-sm text-gray-700'>From</p>
              <input
                type='number'
                placeholder='0'
                value={localMin ?? ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const safeMin = Math.max(min, Math.min(val, localMax - 1));
                  setLocalMin(safeMin);
                }}
                className='border-border focus:ring-primary h-[40px] w-full rounded-[8px] border px-3 focus:ring-1 focus:outline-none'
              />
            </div>
          )}
        />

        {/* To */}
        <Controller
          control={control}
          name='priceMax'
          render={() => (
            <div className='flex w-full flex-col items-start space-y-2'>
              <p className='text-sm text-gray-700'>To</p>
              <input
                type='number'
                placeholder='0'
                value={localMax ?? ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const safeMax = Math.min(max, Math.max(val, localMin + 1));
                  setLocalMax(safeMax);
                }}
                className='border-border focus:ring-primary h-[40px] w-full rounded-[8px] border px-3 focus:ring-1 focus:outline-none'
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SildePrice;
