'use client';

import React from 'react';

interface EmptyDataProps {
  title?: string;
  description?: string;
  btnTitle?: string;
  imageSrc?: string;
  onRefresh?: () => void;
}

const EmptyData: React.FC<EmptyDataProps> = ({
  title = 'No Data',
  description = 'There’s currently nothing to show here.',
  btnTitle = 'Refresh',
  onRefresh,
}) => {
  return (
    <div className='flex min-h-[40vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-3'>
        <div className='text-[28px] leading-none font-semibold tracking-tight text-black/90'>
          {title}
        </div>
      </div>

      <h1 className='text-[18px] font-medium text-black'>{description}</h1>

      {onRefresh && (
        <button
          type='button'
          onClick={onRefresh}
          className='hover:bg-primary hover:border-primary mt-4 inline-block cursor-pointer rounded-full border border-black px-6 py-2 text-[15px] font-medium text-black transition hover:text-white'
        >
          {btnTitle}
        </button>
      )}
    </div>
  );
};

export default EmptyData;
