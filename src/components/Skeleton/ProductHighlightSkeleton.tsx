'use client';

import React from 'react';

const ProductHighlightSkeleton = () => {
  return (
    <div className='mx-auto max-w-[1240px] px-4 xl:px-0'>
      {/* Title */}
      <div className='mb-6 h-6 w-40 animate-pulse rounded-md bg-gray-200' />

      {/* Product Cards Grid */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all'
          >
            {/* Image placeholder */}
            <div className='relative mb-3 h-[180px] w-full animate-pulse rounded-xl bg-gray-200' />

            {/* Product name */}
            <div className='mb-2 h-4 w-3/4 animate-pulse rounded-md bg-gray-200' />

            {/* Price */}
            <div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-200' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHighlightSkeleton;
