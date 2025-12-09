'use client';

import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProductCard from '@/components/Card/ProductCard';
import ErrDialog from '@/components/Dialog/ErrorDialog';
import EmptyData from '@/components/EmptyData';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

const FavoriteList = () => {
  const t = useTranslations('favorite');

  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { runRemoveFavorite, removeSuccess, errorFavorite } = useFavorite();

  const {
    run: fetchFavorites,
    loading,
    error,
  } = useRequest(
    async (pageNum: number) => {
      const res = await PRODUCT_API.getCustomerProducts({
        page: pageNum,
        pageSize: 10,
        isFavourite: true,
      });
      return res.data;
    },
    {
      manual: true,
      onSuccess: (res, params) => {
        const [pageNum] = params;

        // If page 1, replace the list (for initial load or refresh)
        if (pageNum === 1) {
          setList(res);
          setHasMore(res.length === 10);
          // Scroll to top on refresh
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // For subsequent pages, append to list
          setList((prev) => [...prev, ...res]);
          setHasMore(res.length === 10);
        }
      },
    }
  );

  // Load first page on mount
  useEffect(() => {
    fetchFavorites(1);
  }, [fetchFavorites]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFavorites(nextPage);
    }
  };

  // Handle refresh - reset everything
  const handleRefresh = () => {
    setPage(1);
    setList([]);
    setHasMore(true);
    fetchFavorites(1);
  };

  // Remove item from list when favorite is removed
  useEffect(() => {
    if (removeSuccess) {
      setList((prev) =>
        prev.filter((item) => item.id !== removeSuccess.productId)
      );
    }
  }, [removeSuccess]);

  return (
    <>
      <ErrDialog ref={errorFavorite} />
      <div>
        {/* Header */}
        <div className='py-8'>
          <p className='text-typography-base flex items-center gap-2 text-[28px] font-semibold'>
            {t('My Favorites')}
            <span className='text-typography-muted'>({list.length})</span>
          </p>
        </div>

        {/* ERROR UI */}
        {error && (
          <EmptyData
            title={`Error ${(error as any).status}`}
            description={error.message}
            btnTitle='Refresh'
            onRefresh={handleRefresh}
          />
        )}

        {/* INITIAL LOADING */}
        {loading && list.length === 0 && (
          <div className='flex h-[200px] items-center justify-center'>
            <LoadingSpinner color='border-primary' />
          </div>
        )}

        {/* CONTENT */}
        {!error && list.length === 0 && !loading && (
          <EmptyData title='No Favorites' />
        )}

        {!error && list.length > 0 && (
          <InfiniteScroll
            dataLength={list.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className='flex justify-center py-6'>
                <LoadingSpinner color='border-primary' />
              </div>
            }
            endMessage={
              <p className='text-typography-muted py-6 text-center'>
                No more favorites
              </p>
            }
          >
            <div className='grid w-full grid-cols-2 justify-center gap-[44px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {list.map((item: any) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.nameEn}
                  price={item.productVariants?.[0]?.price}
                  discountedPrice={item.productVariants?.[0]?.price}
                  img={item.productImages?.map((img: any) => img.imageUrl)}
                  shopId={item.shopId ?? 1}
                  width={222}
                  isFav={1}
                  variant={[]}
                  handleRemoveFavorite={(id: number) => {
                    runRemoveFavorite({ productId: id });
                  }}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default FavoriteList;
