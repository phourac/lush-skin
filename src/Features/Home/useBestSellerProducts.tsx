'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useEffect, useRef } from 'react';

import { useProductContext } from '@/contexts/ProductContext';

export default function useBestSellerProducts(session: SessionPayload | null) {
  const hasFetchedPages = useRef<Set<number>>(new Set());

  const {
    apiPageBestSeller,
    listProductBestSeller,
    pageBestSeller,
    setApiPageBestSeller,
    setListProductSeller,
    setPageBestSeller,
  } = useProductContext();

  const { run, data, loading, error, refresh } = useRequest(
    () => {
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts({
            page: apiPageBestSeller,
            pageSize: 10,
            slug: 'best-seller',
          })
        : PRODUCT_API.getGuestProducts({
            page: apiPageBestSeller,
            pageSize: 10,
            slug: 'best-seller',
          });
    },
    {
      manual: true,
      onSuccess: (res) => {
        const newData = res?.data || [];

        hasFetchedPages.current.add(apiPageBestSeller);

        setListProductSeller((prev) => {
          const startIndex = (apiPageBestSeller - 1) * 10;

          const updated = [...prev];

          newData.forEach((item, index) => {
            updated[startIndex + index] = item;
          });

          return updated;
        });
      },
    }
  );

  useEffect(() => {
    if (!hasFetchedPages.current.has(apiPageBestSeller)) {
      run();
    }
  }, [apiPageBestSeller, session?.isLogin, run]);

  const pagination = {
    page: pageBestSeller,
    totalPage: data?.pagination?.totalPage,
    totalCount: data?.pagination?.totalCount,
  };

  const handlePrefetch = () => setApiPageBestSeller((p) => p + 1);
  const handleNextPage = () => setPageBestSeller((p) => p + 1);
  const handlePrevPage = () => setPageBestSeller((p) => (p > 1 ? p - 1 : 1));

  return {
    loading,
    data,
    pagination,
    listProductBestSeller,
    error,
    refresh,

    handlePrefetch,
    handleNextPage,
    handlePrevPage,
  };
}
