'use client';

import React from 'react';

const NewArrivalSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='animate-pulse rounded-2xl border border-gray-100 p-4 shadow-sm'
        >
          <div className='aspect-square rounded-xl bg-gray-200' />
          <div className='mt-3 h-4 w-3/4 rounded bg-gray-200' />
          <div className='mt-2 h-4 w-1/2 rounded bg-gray-200' />
          <div className='mt-3 h-8 w-full rounded bg-gray-200' />
        </div>
      ))}
    </div>
  );
};

export default NewArrivalSkeleton;
