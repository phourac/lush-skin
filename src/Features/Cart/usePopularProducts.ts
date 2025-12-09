'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useEffect, useRef } from 'react';

import { useProductContext } from '@/contexts/ProductContext';

export const usePopularProducts = (session: SessionPayload | null) => {
  const hasFetchedPages = useRef<Set<number>>(new Set());

  const {
    apiPagePopularProduct,
    listProductPopularProduct,
    pagePopularProduct,
    setApiPagePopularProduct,
    setListProductPopularProduct,
    setPagePopularProduct,
  } = useProductContext();

  const { run, data, loading, error, refresh } = useRequest(
    () => {
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts({
            page: apiPagePopularProduct,

            pageSize: 10,
          })
        : PRODUCT_API.getGuestProducts({
            page: apiPagePopularProduct,

            pageSize: 10,
          });
    },
    {
      manual: true,
      onSuccess: (res) => {
        const newData = res?.data || [];

        hasFetchedPages.current.add(apiPagePopularProduct);

        setListProductPopularProduct((prev) => {
          const startIndex = (apiPagePopularProduct - 1) * 10;

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
    if (!hasFetchedPages.current.has(apiPagePopularProduct)) {
      run();
    }
  }, [apiPagePopularProduct, session?.isLogin, run]);

  const pagination = {
    page: pagePopularProduct,
    totalPage: data?.pagination?.totalPage,
    totalCount: data?.pagination?.totalCount,
  };

  const handlePrefetch = () => setApiPagePopularProduct((p) => p + 1);
  const handleNextPage = () => setPagePopularProduct((p) => p + 1);
  const handlePrevPage = () =>
    setPagePopularProduct((p) => (p > 1 ? p - 1 : 1));

  return {
    loading,
    data,
    pagination,
    listProductPopularProduct,
    error,
    refresh,
    handlePrefetch,
    handleNextPage,
    handlePrevPage,
  };
};
