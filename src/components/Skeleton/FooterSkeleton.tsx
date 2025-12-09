// components/Footer/FooterSkeleton.tsx
'use client';

import React from 'react';

// components/Footer/FooterSkeleton.tsx

// components/Footer/FooterSkeleton.tsx

const FooterSkeleton = () => {
  return (
    <div className='animate-pulse pt-[44px]'>
      {/* CopyRight Section */}
      <div className='mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-4 py-6'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='h-4 w-24 rounded bg-gray-200' />
          <div className='flex items-center gap-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-6 w-10 rounded-md bg-gray-200' />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-48 rounded bg-gray-200' />
          <div className='h-4 w-64 rounded bg-gray-200' />
        </div>
      </div>

      {/* Support Section */}
      <div className='w-full bg-gray-100 py-[16px]'>
        <div className='mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4'>
          <div className='space-y-2'>
            <div className='h-6 w-40 rounded bg-gray-200' />
            <div className='h-4 w-64 rounded bg-gray-200' />
          </div>
          <div className='flex gap-6'>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-200' />
                <div className='flex flex-col gap-2'>
                  <div className='h-4 w-32 rounded bg-gray-200' />
                  <div className='h-5 w-24 rounded bg-gray-200' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info Section */}
      <div className='mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-4 py-[40px] sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='space-y-3'>
            <div className='h-5 w-32 rounded bg-gray-200' />
            <div className='space-y-2'>
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className='h-4 w-24 rounded bg-gray-200' />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterSkeleton;
