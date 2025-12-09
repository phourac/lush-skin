'use client';

import { useRequest } from 'ahooks';
import ORDER_API from 'api/Order';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'hooks/navigation';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import React, { memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Image from 'next/image';

import EmptyData from '@/components/EmptyData';
import OrderCardSkeleton from '@/components/Skeleton/OrderCardSkeleton';

const transitionConfig = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.25 },
};

const OrderCard = memo(function OrderCard({
  order,
  orderTime,
  total,
  orderNum,
}: {
  order: IOrder.IOrderListData;
  orderTime: string;
  total: number;
  orderNum: number;
}) {
  const t = useTranslations('order');

  return (
    <div className='border-border rounded-[12px] border'>
      {/* Header */}
      <div className='bg-paper flex flex-col justify-between gap-2 rounded-t-[12px] px-4 py-[18px] md:flex-row md:gap-0 md:px-6'>
        <Link
          href={`/order/${order.id}`}
          aria-label={'View order details'}
          className='text-[15px] font-medium hover:underline'
        >
          {t('Order No')}. {orderNum}{' '}
          <span className='text-typography-muted'>
            · {moment(orderTime).calendar().replace(' at ', ' ')}
          </span>
        </Link>
        <h1 className='text-[18px] font-semibold'>
          {t('Total')} ${total.toFixed(2)}
        </h1>
      </div>

      {/* Items */}
      <div className='py-[18px]'>
        {order.orderProducts?.length ? (
          order.orderProducts.map((item, idx) => (
            <div key={item.id || idx}>
              <div className='flex justify-between px-6'>
                <Link
                  href={`/shop/product/${item.productId}`}
                  className='flex items-start gap-3'
                >
                  <Image
                    src={item.productInfo.product.productImages[0].imageUrl}
                    width={72}
                    height={72}
                    alt={item.orderId.toString()}
                    className='rounded-md'
                  />
                  <div className='flex max-w-[222px] flex-col gap-1'>
                    <h1 className='text-[15px]'>
                      {item.productInfo.product.nameEn}
                    </h1>
                    <div className='text-typography-muted space-y-1 text-[14px] leading-[140%] tracking-[-0.3%]'>
                      <p>{item.productInfo.sku}</p>
                      {item.productInfo.attributes &&
                        Object.values(item.productInfo.attributes).length >
                          0 && (
                          <>
                            {Object.values(item.productInfo.attributes).map(
                              (value, index) => (
                                <p key={index}>{value}</p>
                              )
                            )}
                          </>
                        )}
                    </div>
                    <p className='text-purple text-[14px] font-medium'>
                      x{item.qty}
                    </p>
                  </div>
                </Link>

                <p className='text-[15px] font-medium'>
                  ${item.productInfo.price.toFixed(2)}
                </p>
              </div>

              <hr className='bg-border mx-6 my-6 h-px border-0' />
            </div>
          ))
        ) : (
          <p className='text-typography-muted py-6 text-center text-sm'>
            {t('No items found in this order')}
          </p>
        )}

        <div className='flex flex-col items-end gap-3 px-6 md:flex-row md:items-center md:justify-end'>
          <p className='text-[15px] font-medium'>
            {t('Payment Method:')}{' '}
            <span
              className={`${order.paymentStatus === 'UNPAID' ? 'text-typography-error' : 'text-success'} `}
            >
              {' '}
              {order.paymentType === 'ONLINE' ? 'KHQR' : 'CASH'}{' '}
              <span className='capitalize'>
                ({order.paymentStatus.toLowerCase()})
              </span>
            </span>
          </p>
          <span className='text-typography-muted hidden md:block'>|</span>
          <span className='text-[15px] font-semibold'>
            {t('Total')} ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default function OrderHistoryList() {
  const t = useTranslations('order');

  const ORDER_STATUS = [
    { name: t('Processing Order'), id: 1, value: 'PROCESSING' },
    { name: t('Accepted Orders'), id: 2, value: 'COMPLETED' },
    { name: t('Cancelled Orders'), id: 3, value: 'CANCELLED' },
  ];

  const [activeTab, setActiveTab] = useState(ORDER_STATUS[0]);
  const [orders, setOrders] = useState<IOrder.IOrderListData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  // Fetch orders using useRequest
  const {
    run: fetchOrders,
    loading,
    error,
    refresh,
  } = useRequest(
    async (pageNum: number) => {
      const response = await ORDER_API.orderList({
        page: pageNum,
        pageSize: PAGE_SIZE,
        status: activeTab.value,
      });
      return response.data;
    },
    {
      manual: true,
      onSuccess: (data, params) => {
        const [pageNum] = params;

        if (pageNum === 1) {
          // Initial load or tab change
          setOrders(data);
        } else {
          // Load more
          setOrders((prev) => [...prev, ...data]);
        }

        setHasMore(data.length === PAGE_SIZE);
      },
      onError: (error) => {
        console.error('Error fetching orders:', error);
      },
    }
  );

  // Initial load and reload on tab change
  useEffect(() => {
    setPage(1);
    setOrders([]);
    setHasMore(true);
    fetchOrders(1);
  }, [activeTab.value, fetchOrders]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage);
    }
  };

  const handleTabChange = (tab: {
    name: string;
    id: number;
    value: string;
  }) => {
    setActiveTab(tab);
  };

  return (
    <div className='pt-4'>
      {/* Tabs Header */}
      <div className='border-border scrollbar-hide relative flex gap-6 overflow-x-auto border-b whitespace-nowrap md:px-4 [&::-webkit-scrollbar]:hidden'>
        {ORDER_STATUS.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`relative shrink-0 cursor-pointer px-[10px] pt-2 pb-3 text-[18px] font-medium ${
                isActive
                  ? 'text-primary'
                  : 'text-typography-base hover:text-primary/70'
              }`}
            >
              {tab.name}
              {isActive && (
                <motion.div
                  layoutId='underline'
                  className='bg-primary absolute right-0 bottom-0 left-0 h-[2px]'
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className='my-8'>
        <AnimatePresence mode='wait'>
          <motion.div key={activeTab.id} {...transitionConfig}>
            {loading && page === 1 ? (
              <div className='flex w-full justify-center'>
                <OrderCardSkeleton />
              </div>
            ) : error ? (
              <EmptyData
                title={`Error ${(error as any).status}`}
                description={error.message}
                btnTitle='Refresh'
                onRefresh={() => refresh()}
              />
            ) : orders.length > 0 ? (
              <InfiniteScroll
                dataLength={orders.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                  <div className='mt-8 flex justify-center'>
                    <OrderCardSkeleton />
                  </div>
                }
                endMessage={
                  <div className='mt-8 flex justify-center py-4'>
                    <p className='text-typography-muted text-sm'>
                      No more orders
                    </p>
                  </div>
                }
                className='space-y-5 md:space-y-[44px]'
              >
                {orders.map((order, index) => (
                  <OrderCard
                    key={`${order.id}-${index}`}
                    order={order}
                    orderTime={order.createdAt}
                    total={order.total}
                    orderNum={order.id}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <EmptyData />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
