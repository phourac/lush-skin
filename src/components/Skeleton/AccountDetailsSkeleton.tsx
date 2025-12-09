'use client';

import React from 'react';

const AccountDetailsSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* Profile Image Skeleton */}
      <div className='border-border flex animate-pulse flex-col space-y-4 rounded-[16px] border-[1px] p-8'>
        <div className='h-[20px] w-[140px] rounded-md bg-gray-200' />

        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='h-[70px] w-[70px] rounded-full bg-gray-200' />

            <div className='h-[16px] w-[80px] rounded-md bg-gray-200' />
            <div className='h-[16px] w-[80px] rounded-md bg-gray-200' />
          </div>

          <div className='hidden h-[48px] w-[146px] rounded-[12px] bg-gray-200 lg:block' />
        </div>

        <div className='block h-[48px] w-[146px] rounded-[12px] bg-gray-200 lg:hidden' />
      </div>

      {/* Personal Form Skeleton */}
      <div className='border-border flex animate-pulse flex-col gap-8 rounded-[16px] border p-8'>
        <div className='h-[20px] w-[100px] rounded-md bg-gray-200' />

        <div className='flex items-end justify-between gap-8'>
          <div className='flex w-full flex-col gap-6'>
            {/* Full Name */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <div className='h-[16px] w-[120px] rounded-md bg-gray-200' />
              <div className='h-[48px] flex-1 rounded-md bg-gray-200' />
            </div>

            {/* Gender */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <div className='h-[16px] w-[120px] rounded-md bg-gray-200' />
              <div className='h-[48px] flex-1 rounded-md bg-gray-200' />
            </div>

            {/* DOB */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <div className='h-[16px] w-[120px] rounded-md bg-gray-200' />
              <div className='flex flex-1 flex-col gap-4 sm:flex-row'>
                <div className='h-[48px] w-full rounded-md bg-gray-200' />
                <div className='h-[48px] w-full rounded-md bg-gray-200' />
                <div className='h-[48px] w-full rounded-md bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='hidden h-[48px] w-[146px] rounded-[12px] bg-gray-200 lg:flex' />
        </div>

        <div className='flex justify-end lg:hidden'>
          <div className='h-[48px] w-[146px] rounded-[12px] bg-gray-200' />
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsSkeleton;
