'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useEffect, useRef } from 'react';

import { useProductContext } from '@/contexts/ProductContext';

export default function useNewArrivalProducts(session: SessionPayload | null) {
  const hasFetchedPages = useRef<Set<number>>(new Set());

  const {
    apiPageBestSeller,
    listProductNewArrival,
    pageNewArrival,
    setApiPageNewArrival,
    setListProductNewArrival,
    setPageNewArrival,
  } = useProductContext();

  const { run, data, loading, error, refresh } = useRequest(
    () => {
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts({
            page: apiPageBestSeller,
            pageSize: 10,
            slug: 'new-arrival',
          })
        : PRODUCT_API.getGuestProducts({
            page: apiPageBestSeller,
            pageSize: 10,
            slug: 'new-arrival',
          });
    },
    {
      manual: true,
      onSuccess: (res) => {
        const newData = res?.data || [];

        hasFetchedPages.current.add(apiPageBestSeller);

        setListProductNewArrival((prev) => {
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
    page: pageNewArrival,
    totalPage: data?.pagination?.totalPage,
    totalCount: data?.pagination?.totalCount,
  };

  const handlePrefetch = () => setApiPageNewArrival((p) => p + 1);
  const handleNextPage = () => setPageNewArrival((p) => p + 1);
  const handlePrevPage = () => setPageNewArrival((p) => (p > 1 ? p - 1 : 1));

  return {
    loading,
    data,
    pagination,
    listProductNewArrival,
    error,
    refresh,
    handlePrefetch,
    handleNextPage,
    handlePrevPage,
  };
}
