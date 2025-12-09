'use client';

import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Link } from 'hooks/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import ButtonPagination from '../Button/ButtonPagination';
import ProductCard from '../Card/ProductCard';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';

interface IListHorizontalProps {
  defaultData: IProducts.IProductRes | undefined;
  listProduct: IProducts.IProductData[];
  loadingBanner?: boolean;
  bannerLink?: string;
  bannerSrc?: string;
  bannerAlt?: string;
  width?: number;
  responsiveBreakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  pagination?: {
    page: number;
    totalPage: number | undefined;
    totalCount: number | undefined;
  };
  onNextPage?: (itemsPerPage: number) => void;
  onPrevPage?: () => void;
  onPrefetch?: () => void;
  loading?: boolean;
}

const DEFAULT_BREAKPOINTS = {
  sm: 1,
  md: 1,
  lg: 2,
  xl: 2,
  xxl: 3,
};

const GRID_COLS_MAP: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const ANIMATION_VARIANTS: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
};

const ListHorizontal = ({
  listProduct,
  bannerSrc,
  bannerAlt = 'Banner',
  width,
  responsiveBreakpoints = DEFAULT_BREAKPOINTS,
  pagination,
  onNextPage,
  onPrevPage,
  onPrefetch,
  loading = false,
  loadingBanner,
  bannerLink,
}: IListHorizontalProps) => {
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number | null>(null);
  const prefetchedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const getItemsPerPage = () => {
      const w = window.innerWidth;
      if (w < 640) return responsiveBreakpoints.sm ?? 1;
      if (w < 768) return responsiveBreakpoints.md ?? 1;
      if (w < 1024) return responsiveBreakpoints.lg ?? 2;
      if (w < 1280) return responsiveBreakpoints.xl ?? 2;
      return responsiveBreakpoints.xxl ?? 3;
    };

    const handleResize = () => setItemsPerPage(getItemsPerPage());

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsiveBreakpoints]);

  // ✅ FIXED: Calculate total pages based on currently loaded items
  const safeItemsPerPage = itemsPerPage || 1;
  const totalPages = pagination?.totalCount
    ? Math.ceil(pagination.totalCount / safeItemsPerPage)
    : 1;
  const currentPage = pagination?.page || 1;

  // ✅ FIXED: Simple startIndex calculation without Math.min constraint
  const startIndex = (currentPage - 1) * safeItemsPerPage;

  const currentItems = listProduct.slice(
    startIndex,
    startIndex + safeItemsPerPage
  );

  const endIndex = startIndex + currentItems?.length;

  // Prefetch next API page when approaching data boundary (8, 9, 10, 18, 19, 20, etc.)
  useEffect(() => {
    if (!onPrefetch || !pagination || !itemsPerPage || !listProduct.length)
      return;

    const totalLoaded = listProduct.length;
    const nearBoundary = endIndex % 10;
    const shouldPrefetch = nearBoundary >= 8 || nearBoundary === 0;
    const nextApiPage = Math.floor(totalLoaded / 10) + 1;
    const hasMorePages =
      pagination.totalPage && nextApiPage <= pagination.totalPage;
    const alreadyPrefetched = prefetchedRef.current.has(nextApiPage);
    const isNearEndOfData = endIndex >= totalLoaded - 2;

    if (
      shouldPrefetch &&
      !alreadyPrefetched &&
      hasMorePages &&
      isNearEndOfData
    ) {
      prefetchedRef.current.add(nextApiPage);
      onPrefetch();
    }
  }, [endIndex, pagination, onPrefetch, itemsPerPage, listProduct.length]);

  if (itemsPerPage === null) return null;

  const handleNext = () => {
    if (!pagination || !onNextPage) return;
    // ✅ FIXED: Check against client-side totalPages
    if (currentPage < totalPages) {
      setDirection(1);
      setTriggeredByPagination(true);
      onNextPage(itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (!pagination || !onPrevPage) return;
    if (currentPage > 1) {
      setDirection(-1);
      setTriggeredByPagination(true);
      onPrevPage();
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <div className='relative w-full'>
          <div className='flex flex-col gap-6 md:flex-row md:items-stretch'>
            {/* Banner Section */}
            {bannerSrc && (
              <div className='flex justify-center md:justify-start'>
                {loadingBanner ? (
                  <div className='h-[423px] w-[338px] animate-pulse rounded-lg bg-gray-200' />
                ) : (
                  <Link
                    aria-label={bannerAlt || 'View banner'}
                    href={bannerLink ?? '#'}
                    className='relative h-[423px] w-[338px]' // REQUIRED for object-cover
                  >
                    <Image
                      src={bannerSrc}
                      alt={bannerAlt}
                      fill
                      priority
                      sizes='(max-width: 640px) 100vw,
            (max-width: 1024px) 100vw,
            100vw'
                      className='rounded-lg object-cover' // now works!
                    />
                  </Link>
                )}
              </div>
            )}

            {/* Product Grid Section */}
            <div className='relative min-h-[423px] flex-1 overflow-hidden'>
              <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={ANIMATION_VARIANTS}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className={`grid w-full justify-items-center gap-3 sm:gap-8 ${GRID_COLS_MAP[itemsPerPage] || 'grid-cols-6'}`}
                >
                  {loading && triggeredByPagination
                    ? Array.from({ length: itemsPerPage }).map((_, idx) => (
                        <ProductCardSkeleton key={idx} />
                      ))
                    : currentItems?.map((item) => (
                        <ProductCard
                          key={item.id}
                          id={item.id}
                          name={item.nameEn}
                          price={item.productVariants?.[0]?.afterDiscount}
                          img={item.productImages?.map(
                            (img: any) => img.imageUrl
                          )}
                          shopId={item.shopId ?? 1}
                          discountedPrice={item.productVariants?.[0]?.price}
                          width={width}
                          variant={item.productVariants}
                        />
                      ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className='flex justify-center py-8'>
          <ButtonPagination
            current={currentPage - 1}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default ListHorizontal;
