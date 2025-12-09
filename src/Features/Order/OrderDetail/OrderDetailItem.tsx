'use client';

import { useRequest } from 'ahooks';
import CART_API from 'api/Cart';
import ORDER_API from 'api/Order';
import { usePathname, useRouter } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useAddressContext } from '@/contexts/AddressContext';
import { useCart } from '@/contexts/CartContext';

import ButtonBase from '@/components/Button/ButtonBase';
import CusTextarea from '@/components/CusInput/CusTextarea';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import EmptyData from '@/components/EmptyData';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import OrderDetailSkeleton from '@/components/Skeleton/OrderDetailSkeleton';

import OrderStatusSection from './OrderStatusSection';
import OrderSummary from './OrderSummary';

const GoogleMapLazy = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.GoogleMap),
  {
    ssr: false,
    loading: () => (
      <div className='bg-paper h-[300px] w-full animate-pulse rounded-md' />
    ),
  }
);

const MarkerLazy = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.Marker),
  { ssr: false }
);

const containerStyle = { width: '100%', height: '300px' };

const OrderDetailItem = () => {
  const { isLoaded } = useAddressContext();
  const t = useTranslations('orderDetail');
  const error = useRef<IErrDialogRef>(null);
  const nav = useRouter();
  const { setSelectedItems } = useCart();
  const pathname = usePathname();
  const orderId = pathname.split('/').pop();
  const [errorLocked, setErrorLocked] = useState(false);
  const [isClickingRefresh, setIsClickingRefresh] = useState(false);

  const {
    data: orderDetail,
    loading: loadingOrderDetail,
    error: errorOrderDetail,
    refresh: refreshOrderDetail,
  } = useRequest(() => ORDER_API.orderDetail({ id: Number(orderId) }), {
    refreshDeps: [orderId],
    pollingInterval: errorLocked ? 0 : 10000,
    onError: () => {
      setErrorLocked(true);
      setIsClickingRefresh(false);
    },
    onSuccess: () => {
      setErrorLocked(false);
      setIsClickingRefresh(false);
    },
  });

  const { run: runReorder, loading: loadingReorder } = useRequest(
    CART_API.reoder,
    {
      manual: true,
      onSuccess: (data) => {
        setSelectedItems(data?.data.map((item) => item.id) || []);
        nav.push(`/cart`);
      },
      onError: (err) => {
        error.current?.open(err);
      },
    }
  );

  const [imgSrc, setImgSrc] = useState('/assets/khqr-checkout.svg');

  useEffect(() => {
    if (!orderDetail?.data) return;

    if (orderDetail.data.paymentType === 'CASH') {
      setImgSrc('/assets/riel.svg');
    } else {
      const url = orderDetail.data.paymentInfo?.paymentMethodImgUrl;
      setImgSrc(url || '/assets/khqr-checkout.svg');
    }
  }, [orderDetail]);

  if (!errorOrderDetail && !orderDetail) {
    return <OrderDetailSkeleton />;
  }
  if (isClickingRefresh === true) {
    return <OrderDetailSkeleton />;
  }

  if (errorOrderDetail && !loadingOrderDetail) {
    return (
      <EmptyData
        title={`Error ${(errorOrderDetail as any).status}`}
        description={errorOrderDetail.message}
        btnTitle='Refresh'
        onRefresh={() => {
          refreshOrderDetail();
          setIsClickingRefresh(true);
        }}
      />
    );
  }

  return (
    <>
      <ErrDialog ref={error} />{' '}
      <div className='flex flex-col gap-4 overflow-hidden md:h-[calc(100vh-170px)] md:flex-row md:gap-16'>
        {/* Left Section - Independent Scrollable */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          <div className='mx-auto max-w-[699px]'>
            {/* Header */}
            <div className='space-y-4 pt-8'>
              <h1 className='text-typography-base text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
                {t('Order ID')} #{orderId}
              </h1>
              <p className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
                {t(
                  'We appreciate your order — thank you for choosing Lush Skin!'
                )}
              </p>
            </div>

            <div className='space-y-6 py-4 md:py-8'>
              {/* Status */}
              <OrderStatusSection status={orderDetail?.data.status} />

              {/* Summary */}
              <OrderSummary orderDetail={orderDetail} />
            </div>
          </div>
        </div>
        {/* Right Section - Independent Scrollable */}{' '}
        <div className='w-full overflow-y-auto md:w-[388px] [&::-webkit-scrollbar]:hidden'>
          <div className='space-y-6 pb-8 md:pt-36'>
            {/* Reorder */}
            <div className='bg-paper border-border flex items-center justify-between rounded-[12px] border p-3'>
              <h1 className='text-typography-base text-[15px] font-medium'>
                {t('Place this order again?')}
              </h1>
              <ButtonBase
                type='button'
                disabled={loadingReorder}
                onClick={() => {
                  runReorder({
                    orderId: Number(orderId),
                  });
                }}
              >
                {loadingReorder ? <LoadingSpinner /> : t('Reorder')}
              </ButtonBase>
            </div>

            {/* Note */}
            <div>
              <h1 className='text-typography-base mb-6 text-[18px] leading-[140%] font-semibold'>
                {t('Note')}
              </h1>
              <CusTextarea
                rows={4}
                placeholder={
                  orderDetail?.data.cusInfo.cusRemark ||
                  t('No additional note provided')
                }
                className='bg-paper p-4'
                disabled
              />
            </div>

            {/* Customer Information */}
            <div>
              <h1 className='text-typography-base mb-6 text-[18px] leading-[140%] font-semibold'>
                {t('Customer Information')}
              </h1>

              <div className='bg-paper border-border space-y-6 rounded-[12px] border p-4'>
                {/* Map */}
                <div className='relative w-full overflow-hidden'>
                  {isLoaded && (
                    <GoogleMapLazy
                      mapContainerStyle={containerStyle}
                      center={orderDetail?.data.cusCoords}
                      zoom={15}
                      options={{
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: false,
                        scrollwheel: false,
                        disableDefaultUI: true,
                      }}
                    >
                      {orderDetail?.data.cusCoords && (
                        <MarkerLazy
                          position={orderDetail.data.cusCoords}
                          icon={{
                            url: `/assets/pin.svg`,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        />
                      )}
                    </GoogleMapLazy>
                  )}
                </div>

                {/* Address */}
                <h1 className='text-typography-base text-[15px] font-semibold'>
                  {t('Delivery Details')}
                </h1>

                <div className='text-typography-base space-y-2 text-[15px] font-medium'>
                  <p>
                    {orderDetail?.data?.cusAddressInfo.cusAddressType} •{' '}
                    {orderDetail?.data?.cusInfo.cusName}
                  </p>
                  <p>{orderDetail?.data?.cusInfo.cusPhone}</p>
                  <p>{orderDetail?.data?.cusInfo.cusRemark}</p>
                </div>

                {/* Payment */}
                {orderDetail?.data.paymentInfo && (
                  <>
                    <h1 className='text-typography-base text-[15px] font-semibold'>
                      {t('Payment Method')}
                    </h1>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={imgSrc}
                        alt={
                          orderDetail?.data.paymentInfo?.paymentMethodName ||
                          'payment'
                        }
                        width={44}
                        height={44}
                        onError={() => setImgSrc('/assets/khqr-checkout.svg')}
                      />
                      <p className='text-typography-base text-[15px] font-medium'>
                        {orderDetail?.data.paymentInfo.paymentMethodName ===
                        'BAKONG_PAYMENT'
                          ? t('KHQR')
                          : 'Cash On Delivery'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailItem;
