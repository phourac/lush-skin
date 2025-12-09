// components/Navbar/NavbarSkeleton.tsx
'use client';

import React from 'react';

// components/Navbar/NavbarSkeleton.tsx

// components/Navbar/NavbarSkeleton.tsx

const NavbarSkeleton = () => {
  return (
    <div className='sticky top-0 z-50 h-[164px] animate-pulse bg-white'>
      {/* Top promo bar */}
      <div className='h-[36px] w-full bg-gray-200' />

      {/* Main navbar action (logo/search/cart area) */}
      <div className='flex h-[80px] items-center justify-between px-6'>
        <div className='h-6 w-32 rounded bg-gray-200' /> {/* logo */}
        <div className='h-10 w-1/3 rounded bg-gray-200' /> {/* search */}
        <div className='flex gap-4'>
          <div className='h-6 w-6 rounded-full bg-gray-200' />
          <div className='h-6 w-6 rounded-full bg-gray-200' />
          <div className='h-6 w-6 rounded-full bg-gray-200' />
        </div>
      </div>

      {/* Navbar route links */}
      <div className='flex h-[48px] justify-center gap-6 px-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='h-5 w-20 rounded bg-gray-200' />
        ))}
      </div>
    </div>
  );
};

export default NavbarSkeleton;
