'use client';

import { SessionPayload } from '@/actions/auth';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';

import DropdownMenu from '@/components/Button/DropdownMenu';
import FilterSideSkeleton from '@/components/Skeleton/FilterSideSkeleton';
import ProductShopListSkeleton from '@/components/Skeleton/ProductShopListSkeleton';

import ProductList from './ProductList';
import ShopBannerSlide from './ShopBannerSlide';
import { useShopItemsLogic } from './useShopItemsLogic';

// ✅ Load FilterSide lazily for mobile drawer
const FilterSide = dynamic(() => import('./FilterSide'), {
  ssr: false,
  loading: () => <FilterSideSkeleton />,
});

const options = [
  { id: 'popular', name: 'Popularity' },
  { id: 'new', name: 'Newest' },
  { id: 'low', name: 'Price: Low to High' },
  { id: 'hight', name: 'Price: High to Low' },
];

function ShopItemsList({ session }: { session: SessionPayload | null }) {
  const {
    categories,
    currentSortOption,
    queryParam,
    showFilter,
    setShowFilter,
    handleSortChange,
  } = useShopItemsLogic();

  return (
    <div className='relative flex min-h-screen'>
      {/* Desktop Filter */}
      <div className='hidden md:block md:w-[300px] md:flex-shrink-0 md:pr-4'>
        {/* ✅ Sticky wrapper */}
        <div className='sticky top-[190px] max-h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          <FilterSide categories={categories} />
        </div>
      </div>

      <div className='relative flex-1 overflow-hidden pt-8'>
        <div className='flex flex-col gap-4 md:gap-[32px] lg:pl-[52px]'>
          {!queryParam && (
            <Suspense
              fallback={<div className='h-[180px] rounded-lg bg-gray-100' />}
            >
              <ShopBannerSlide />
            </Suspense>
          )}

          <div>
            <div className='flex justify-between py-[16px]'>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(true)}
                className='bg-paper flex items-center gap-2 rounded-lg px-5 py-[4px] text-[15px] font-medium md:hidden'
              >
                <FilterIcon />
                Filters
              </button>

              <p className='text-typography-base hidden text-[18px] font-semibold md:flex'>
                {!queryParam ? (
                  '25,000+ results'
                ) : (
                  <>
                    25,000+ Results for <b>&apos;{queryParam}&apos;</b>
                  </>
                )}
              </p>

              <DropdownMenu
                label='Sort By'
                options={options.map((x) => x.name)}
                selected={currentSortOption.name}
                onChange={handleSortChange}
                buttonClassName='py-[4px] px-[12px] bg-paper rounded-[8px]'
              />
            </div>
          </div>

          {/* ✅ ProductList Suspense for Faster First Render */}
          <Suspense fallback={<ProductShopListSkeleton />}>
            <ProductList {...{ session }} />
          </Suspense>
        </div>

        {/* ✅ Mobile Drawer */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              className='fixed inset-0 z-[99999] flex bg-black/30 md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                // 👇 The trick: offset from top
                className='absolute h-full w-[320px] touch-pan-y overflow-y-auto overscroll-contain bg-white shadow-xl [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden'
                initial={{ x: '-100%' }}
                animate={{
                  x: 0,
                  transition: { type: 'tween', duration: 0.25 },
                }}
                exit={{
                  x: '-100%',
                  transition: { type: 'tween', duration: 0.2 },
                }}
              >
                <div className='min-h-full p-4'>
                  <FilterSide categories={categories} />
                </div>
              </motion.div>

              <div onClick={() => setShowFilter(false)} className='flex-1' />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ShopItemsList;

const FilterIcon = () => (
  <svg
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 
      01-.293.707l-6.414 6.414a1 1 0 
      00-.293.707V17l-4 4v-6.586a1 1 0 
      00-.293-.707L3.293 7.293A1 1 0 
      013 6.586V4z'
    />
  </svg>
);
