'use client';

import usePlaceOrder from 'Features/Order/OrderDetail/usePlaceOrder';
import { useRequest } from 'ahooks';
import COUPON_API from 'api/Coupon';
import ORDER_API from 'api/Order';
import { useRouter } from 'hooks/navigation';
import { useAddress } from 'hooks/useAddress';
import useNavigateParam from 'hooks/useNavigateParam';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import ButtonBase from '@/components/Button/ButtonBase';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import CheckoutSummaryItemSkeleton from '@/components/Skeleton/CheckoutSummaryItemSkeleton';
import { PaymentMethodSkeleton } from '@/components/Skeleton/PaymentMethodSkeleton';

import CheckoutSummaryItem from './CheckoutSummaryItem';
import OrderNote from './OrderNote';

const AddressList = dynamic(() => import('@/components/Address/AddressList'), {
  ssr: false,
});
const PaymentMethod = dynamic(() => import('./PaymentMethod'), { ssr: false });

const CheckoutDetail = ({ groupId }: { groupId: string }) => {
  const searchParams = useSearchParams();
  const errorPlaceOrder = useRef<IErrDialogRef>(null);

  const decodedGroupId = decodeURIComponent(groupId);
  const cartIds = decodedGroupId.split(',').map((id) => Number(id));

  const getQty = searchParams.get('qty') || '';
  const getVariantId = searchParams.get('variantId') || '';
  const nav = useRouter();

  // Determine checkout mode
  const isProductCheckout = !!(getVariantId && getQty);

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    icon: string;
    rule?: string;
    discountType?: string;
  }>({ type: null, message: '', icon: '' });

  const methods = useForm<IPlaceOrder.IItemToPlaceOrder>({
    defaultValues: {
      cusRemark: '',
      couponCode: '',
      products: [
        {
          qty: 0,
          productId: 0,
          productVariantId: 0,
        },
      ],
      paymentMethodId: 1,
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const cusAddressId = watch('cusAddressId');

  const { setParam } = useNavigateParam();

  const { setPlaceOrderItems } = usePlaceOrder();
  const { handleOpenAddressDialog } = useAddress();
  const t = useTranslations('checkout');

  // Unified preCheckout request
  const {
    run: runPreCheckout,
    data: preCheckoutData,
    loading: loadingPreCheckoutData,
    error: errorPreCheckoutData,
    // refresh: refreshPreCheckoutData,
  } = useRequest(
    async (couponCode?: string, cusAddressId?: number) => {
      if (isProductCheckout) {
        return ORDER_API.preCheckoutByProductId({
          products: [
            {
              productId: groupId ? parseInt(groupId, 10) : 0,
              qty: parseInt(getQty, 10),
              productVariantId: parseInt(getVariantId, 10),
            },
          ],
          ...(couponCode && { couponCode }),
          ...(cusAddressId && { cusAddressId }),
        });
      } else {
        return ORDER_API.preCheckoutByCart({
          cartIds: cartIds,
          ...(couponCode && { couponCode }),
          ...(cusAddressId && { cusAddressId }),
        });
      }
    },
    {
      manual: true,
    }
  );

  // Check coupon
  const { run: runCheckCoupon, loading: loadingCheckCoupon } = useRequest(
    COUPON_API.checkCoupon,
    {
      manual: true,
      onSuccess: (data) => {
        setStatus({
          type: 'success',
          message: (data.data.value * 100).toString(),
          icon: '',
          discountType: data.data.type,
          rule: data.data.rule,
        });
        if (data.data.code) {
          runPreCheckout(data.data.code, cusAddressId);
        }
      },
      onError: (err) => {
        setStatus({
          type: 'error',
          message: err.message || 'Invalid promo code.',
          icon: '/assets/warning.svg',
        });
        setValue('couponCode', '');
      },
    }
  );

  const paymentMethod = preCheckoutData?.data?.paymentMethods || [];

  // Initial load
  useEffect(() => {
    runPreCheckout(undefined, cusAddressId);
  }, [groupId, getVariantId, getQty, cusAddressId, runPreCheckout]);

  const { run: runPlaceOrder, loading: loadingPlaceOrder } = useRequest(
    ORDER_API.placeOrder,
    {
      manual: true,
      onSuccess: (data) => {
        nav.push(`/order/${data.data.order.id}`);
      },
      onError: (err) => {
        errorPlaceOrder.current?.open(err);
      },
    }
  );

  const onSubmit = (data: IPlaceOrder.IItemToPlaceOrder) => {
    // if (!checkoutItems || checkoutItems.length === 0) {
    //   console.warn('⚠️ No products to place order.');
    //   return;
    // }

    const newData: IPlaceOrder.IItemToPlaceOrder = {
      ...data,
      products:
        preCheckoutData?.data.preCheckoutProducts.map(
          ({ productId, productVariantId, qty }) => ({
            productId,
            productVariantId,
            qty,
          })
        ) || [],
      cusAddressId: data.cusAddressId,
      paymentMethodId: data.paymentMethodId,
      cusRemark: data.cusRemark,
    };
    runPlaceOrder(newData);

    setPlaceOrderItems(newData);
    // nav.push('/order/1');
  };

  // if (errorPreCheckoutData) {
  //   return (
  //     <div className='flex min-h-[70vh] flex-col items-center justify-center px-4 text-center'>
  //       <h1 className='text-[22px] font-medium text-black'>
  //         Error {(errorPreCheckoutData as any).status}
  //       </h1>
  //       <p className='mt-2 max-w-md text-[15px] text-neutral-500'>
  //         {errorPreCheckoutData.message}
  //       </p>
  //       <button
  //         type='button'
  //         onClick={refreshPreCheckoutData}
  //         className='mt-8 inline-block rounded-full border border-black px-6 py-2 text-[15px] font-medium text-black transition hover:bg-black hover:text-white'
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      <ErrDialog
        ref={errorPlaceOrder}
        onClose={() => {
          if (cusAddressId === undefined) {
            setParam('address', '1');
          }
        }}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <div className='flex gap-[88px]'>
              {/* Cart items */}
              <div className='w-full lg:max-w-[727px]'>
                <div className='h-auto w-full'>
                  {/* Header section */}
                  <div className='top-[164px] z-10 flex flex-col bg-white pt-8 lg:sticky'>
                    <h2 className='text-typography-base z-10 bg-white text-[20px] leading-[140%] font-semibold tracking-[-2%] md:text-[28px]'>
                      {t('Checkout')}
                    </h2>
                  </div>

                  <Controller
                    name='cusAddressId'
                    control={methods.control}
                    render={({}) => (
                      <>
                        <div className='pt-8'>
                          <AddressList
                            selectedId={watch('cusAddressId')}
                            onSelect={(id) => {
                              setValue('cusAddressId', id);
                            }}
                            onOpenDialog={handleOpenAddressDialog}
                            title='Select Delivery Address'
                          />
                        </div>
                        <p className='text-typography-error pt-4 text-right'>
                          {errorPreCheckoutData?.message}
                        </p>
                      </>
                    )}
                  />
                </div>

                <div className='pt-12 pb-6'>
                  {loadingPreCheckoutData ? (
                    <PaymentMethodSkeleton />
                  ) : (
                    <PaymentMethod paymentMethod={paymentMethod} />
                  )}
                </div>

                <div className='pt-6 pb-6'>
                  <OrderNote />
                </div>

                <div className='flex flex-col pt-6 pb-6 lg:hidden'>
                  <h1 className='text-typography-base pb-6 text-[18px] leading-[140%] font-semibold'>
                    {t('Order Summary')}
                  </h1>

                  <div className='flex flex-col gap-6'>
                    {loadingPreCheckoutData && preCheckoutData === undefined ? (
                      <CheckoutSummaryItemSkeleton />
                    ) : (
                      <CheckoutSummaryItem
                        preCheckoutData={preCheckoutData}
                        runCheckCoupon={runCheckCoupon}
                        setStatus={setStatus}
                        status={status}
                        runPreCheckout={runPreCheckout}
                        loadingCheckCoupon={loadingCheckCoupon}
                        loadingPreCheckoutData={loadingPreCheckoutData}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className='hidden w-full max-w-[392px] lg:block'>
                <div className='sticky top-[264px] w-full'>
                  <div className='border-border flex w-full flex-col items-start gap-6 rounded-[12px] border bg-white p-4'>
                    <h5 className='text-typography-base mx-auto text-[18px] leading-[140%] font-semibold'>
                      {t('Order Summary')}
                    </h5>

                    {loadingPreCheckoutData && preCheckoutData === undefined ? (
                      <CheckoutSummaryItemSkeleton />
                    ) : (
                      <>
                        <CheckoutSummaryItem
                          preCheckoutData={preCheckoutData}
                          runCheckCoupon={runCheckCoupon}
                          setStatus={setStatus}
                          status={status}
                          runPreCheckout={runPreCheckout}
                          loadingCheckCoupon={loadingCheckCoupon}
                          loadingPreCheckoutData={loadingPreCheckoutData}
                        />
                        <ButtonBase
                          className='w-full'
                          type='submit'
                          disabled={loadingPlaceOrder}
                        >
                          {loadingPlaceOrder ? (
                            <LoadingSpinner />
                          ) : (
                            t('Place Order')
                          )}
                        </ButtonBase>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Checkout button */}
          <div className='fixed right-0 bottom-0 left-0 z-50 flex justify-between bg-white px-4 py-4 text-start shadow-[0_-2px_8px_rgba(0,0,0,0.08)] lg:hidden'>
            <div className='flex items-center gap-2'>
              <h1 className='text-typography-base pr-1 text-[15px] leading-[140%] font-semibold'>
                {t('Total')}:{' '}
                <span className='text-primary text-[20px]'>
                  US${preCheckoutData?.data.finalSubTotal.toFixed(2)}
                </span>
              </h1>
            </div>

            <div className='flex items-center gap-2 whitespace-nowrap'>
              <ButtonBase type='submit' disabled={loadingPlaceOrder}>
                <div className='flex w-[110px] justify-center'>
                  {loadingPlaceOrder ? <LoadingSpinner /> : t('Place Order')}
                </div>
              </ButtonBase>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default CheckoutDetail;
