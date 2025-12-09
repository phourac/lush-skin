'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useSearchParams } from 'next/navigation';

import { useProductContext } from '@/contexts/ProductContext';

import ProductCard from '@/components/Card/ProductCard';
import EmptyData from '@/components/EmptyData';
import ProductCardSkeleton from '@/components/Skeleton/ProductCardSkeleton';

const PAGE_SIZE = 9;

const ProductList = ({ session }: { session: SessionPayload | null }) => {
  const searchParams = useSearchParams();
  const { list, setList, page, setPage } = useProductContext();

  const [hasMore, setHasMore] = useState(true);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(3);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  const query = searchParams.get('query') || '';
  const categoryIds = useMemo(() => {
    return [
      ...searchParams.getAll('cate'),
      ...searchParams.getAll('brands'),
    ].join(',');
  }, [searchParams]);
  const [prevFilters, setPrevFilters] = useState({
    query,
    categoryIds,
    isLogin: session?.isLogin,
  });

  // Fetch products
  const { run, loading, error } = useRequest(
    (pageNum: number) => {
      const params = {
        page: pageNum,
        pageSize: PAGE_SIZE,
        search: query,
        categoryIds,
      };
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts(params)
        : PRODUCT_API.getGuestProducts(params);
    },
    {
      cacheKey: `product-list-${page}-${query}-${categoryIds}`,
      manual: true,
      onSuccess: (res, params) => {
        const pageNum = params?.[0] ?? 1;
        const newData = res?.data ?? [];

        setHasMore(newData.length === PAGE_SIZE);

        if (pageNum === 1) {
          setList((prev) => {
            const newIds = new Set(newData.map((item: any) => item.id));
            const oldIds = new Set(prev.map((item: any) => item.id));

            const keepItems = prev.filter((item: any) => newIds.has(item.id));

            const addItems = newData.filter(
              (item: any) => !oldIds.has(item.id)
            );

            const removeItems = prev.filter(
              (item: any) => !newIds.has(item.id)
            );

            // If there are items being removed, schedule their removal
            if (removeItems.length > 0) {
              setTimeout(() => {
                setList(newData);
              }, 100); // Match exit animation duration

              return [...keepItems, ...addItems, ...removeItems];
            }

            return newData;
          });
          setIsPaginating(false);
        } else {
          // For pagination, just append
          setList((prev) => [...prev, ...newData]);
          setIsPaginating(false);
        }

        setIsFirstLoad(false);
      },
    }
  );

  // Reset and fetch on filter change
  useEffect(() => {
    const filtersChanged =
      prevFilters.query !== query ||
      prevFilters.categoryIds !== categoryIds ||
      prevFilters.isLogin !== session?.isLogin;

    if (filtersChanged) {
      setPage(1);
      setHasMore(true);
      setPrevFilters({ query, categoryIds, isLogin: session?.isLogin });
      run(1);
    } else if (list.length === 0) {
      setIsFirstLoad(true);
      run(1);
    }
  }, [
    query,
    categoryIds,
    session?.isLogin,
    list.length,
    prevFilters.categoryIds,
    prevFilters.query,
    run,
    setPage,
    prevFilters.isLogin,
  ]);

  // Load more
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsPaginating(true);

    run(nextPage);
  };

  // Responsive skeleton count
  useEffect(() => {
    const updateSkeletonCount = () => {
      const w = window.innerWidth;
      setSkeletonCount(w < 640 ? 2 : w < 1024 ? 2 : 3);
    };
    updateSkeletonCount();
    window.addEventListener('resize', updateSkeletonCount);
    return () => window.removeEventListener('resize', updateSkeletonCount);
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render states
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EmptyData
          title={`Error ${(error as any).status}`}
          description={error.message}
        />
      </motion.div>
    );
  }

  if (isFirstLoad && loading && list.length === 0) {
    return (
      <div className='col-span-full mt-4 grid grid-cols-2 justify-center gap-4 md:grid-cols-3'>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && list.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col items-center py-10 text-gray-400'
      >
        <EmptyData />
      </motion.div>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          loading &&
          isPaginating &&
          list.length > 0 && (
            <div className='col-span-full mt-4 grid grid-cols-2 justify-center gap-4 md:grid-cols-3'>
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <ProductCardSkeleton key={`sk-${i}`} />
              ))}
            </div>
          )
        }
        endMessage={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='col-span-full py-4 text-center text-gray-400'
          >
            No more data!
          </motion.div>
        }
        className='grid grid-cols-2 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'
      >
        <AnimatePresence mode='popLayout'>
          {list.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{
                layout: { duration: 0.1 },
                opacity: { duration: 0.08 },
                scale: { duration: 0.08 },
              }}
            >
              <ProductCard
                id={item.id}
                name={item.nameEn}
                price={item.productVariants?.[0]?.price}
                img={item.productImages?.map((i) => i.imageUrl)}
                shopId={item.shopId ?? 1}
                discountedPrice={item.productVariants?.[0]?.price}
                width={268.67}
                variant={item.productVariants}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </InfiniteScroll>

      {/* Scroll-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='bg-primary fixed right-6 bottom-6 rounded-full p-3 text-white shadow-lg'
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductList;
