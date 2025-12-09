'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useEffect, useRef } from 'react';

import { useProductContext } from '@/contexts/ProductContext';

export const useSimilarProducts = (
  session: SessionPayload | null,
  prodId: number
) => {
  const hasMounted = useRef(false);

  const {
    apiPageSimilarProduct,
    listProductSimilarProduct,
    pageSimilarProduct,
    setApiPageSimilarProduct,
    setListProductSimilarProduct,
    setPageSimilarProduct,
  } = useProductContext();

  const { run, data, loading, error } = useRequest(
    () => {
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts({
            page: apiPageSimilarProduct,
            pageSize: 10,
            similarProductId: prodId,
          })
        : PRODUCT_API.getGuestProducts({
            page: apiPageSimilarProduct,
            pageSize: 10,
            similarProductId: prodId,
          });
    },
    {
      manual: true,
      onSuccess: (res) => {
        const newData = res?.data || [];
        setListProductSimilarProduct((prev) => [...prev, ...newData]);
      },
    }
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      run();
      return;
    }
    run();
  }, [apiPageSimilarProduct, session?.isLogin, run]);

  const pagination = {
    page: pageSimilarProduct,
    totalPage: data?.pagination?.totalPage,
    totalCount: data?.pagination?.totalCount,
  };

  return {
    error,
    loading,
    data,
    pagination,
    listProductSimilarProduct,
    setApiPageSimilarProduct,
    setPageSimilarProduct,
  };
};
