'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';

import CusInput from '@/components/CusInput/CusInput';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import { PricePreCheckoutSkeleton } from '@/components/Skeleton/PricePreCheckoutSkeleton';

const CheckoutSummaryItem = ({
  preCheckoutData,
  runCheckCoupon,
  status,
  setStatus,

  runPreCheckout,
  loadingCheckCoupon,
  loadingPreCheckoutData,
}: {
  runCheckCoupon: (params: { code: string }) => void;
  preCheckoutData: IOrder.IPrecheckout | undefined;
  status: {
    type: 'success' | 'error' | null;
    message: string;
    icon: string;
    rule?: string;
    discountType?: string;
  };
  setStatus: React.Dispatch<
    React.SetStateAction<{
      type: 'success' | 'error' | null;
      message: string;
      icon: string;
      rule?: string;
      discountType?: string;
    }>
  >;

  runPreCheckout: (couponCode?: string, cusAddressId?: number) => void;
  loadingCheckCoupon: boolean;
  loadingPreCheckoutData: boolean;
}) => {
  const { setValue, watch } = useFormContext<IPlaceOrder.IItemToPlaceOrder>();
  const t = useTranslations('checkout');
  const [localPromo, setLocalPromo] = useState('');
  const cusAddressId = watch('cusAddressId');

  const handleApplyPromo = () => {
    const trimmedPromo = localPromo.trim();

    // --- REMOVE PROMO ---
    if (status.type === 'success') {
      setLocalPromo('');
      setStatus({ type: null, message: '', icon: '' });
      setValue('couponCode', '');

      // Re-run precheckout WITHOUT coupon
      runPreCheckout('', cusAddressId);
      return;
    }

    // --- APPLY PROMO ---
    if (!trimmedPromo) {
      return setStatus({
        type: 'error',
        message: 'Please enter a promo code.',
        icon: '/assets/warning.svg',
      });
    }

    setValue('couponCode', trimmedPromo);

    // validate coupon
    runCheckCoupon({ code: trimmedPromo });
  };

  return (
    <>
      {/* Items List */}
      <div className='flex w-full flex-col items-start overflow-auto lg:max-h-[260px] [&::-webkit-scrollbar]:hidden'>
        {preCheckoutData?.data?.preCheckoutProducts.map((item, index) => (
          <div key={index} className='w-full'>
            <div className='flex w-full justify-between gap-4'>
              <div className='flex w-full items-start gap-3'>
                <Image
                  src={item.productVariant.product.productImages[0].imageUrl}
                  width={72}
                  height={72}
                  alt={item.productVariant.product.nameEn}
                  className='rounded-md border'
                />

                <div className='flex max-w-[222px] flex-col gap-2'>
                  <h1 className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3%]'>
                    {item.productVariant.product.nameEn}
                  </h1>

                  <div className='text-typography-muted space-y-1 text-[14px] leading-[140%] tracking-[-0.3%]'>
                    <p>{item.productVariant.sku}</p>
                    {item.productVariant.attributes &&
                      Object.values(item.productVariant.attributes).length >
                        0 && (
                        <>
                          {Object.values(item.productVariant.attributes).map(
                            (value, index) => (
                              <p key={index}>{value}</p>
                            )
                          )}
                        </>
                      )}
                  </div>

                  <p className='text-purple text-[14px] leading-[140%] font-medium tracking-[-0.3%]'>
                    x{item.qty}
                  </p>
                </div>
              </div>

              <div className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3%]'>
                ${item.productVariant.price.toFixed(2)}
              </div>
            </div>

            {index < preCheckoutData.data.productVariants.length - 1 && (
              <hr className='bg-border my-6 h-px border-0' />
            )}
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className='bg-paper w-full space-y-[6px] rounded-[12px] p-4'>
        <h1 className='text-typography-base text-[15px] leading-[140%] font-medium'>
          {t('Promo Code')}
        </h1>

        <CusInput
          value={localPromo}
          onChange={(e) => setLocalPromo(e.target.value)}
          placeholder={t('Enter Promo Code')}
          error={status.type === 'error'}
          className={`flex h-[40px] items-center rounded-[12px] bg-white pr-20 ${
            status.type === 'success'
              ? 'focus:outline-border pl-10'
              : 'focus:outline-primary pl-4'
          }`}
          rightElement={
            <button
              type='button'
              onClick={handleApplyPromo}
              className={`cursor-pointer ${
                status.type === 'success'
                  ? 'bg-paper text-typography-base hover:bg-white'
                  : 'bg-primary hover:bg-primary/90 border-primary text-white'
              } border-border flex h-[40px] min-w-[80px] items-center justify-center rounded-r-[12px] border-[1px] px-[14px] text-[15px] leading-[140%] font-medium tracking-[-0.3%] transition-all`}
            >
              {loadingCheckCoupon ? (
                <LoadingSpinner size={18} />
              ) : status.type === 'success' ? (
                'Remove'
              ) : (
                'Apply'
              )}
            </button>
          }
          leftElement={
            status.type === 'success' && (
              <div className='relative h-[20px] w-[20px]'>
                <Image src='/assets/promo-check.svg' alt='' fill />
              </div>
            )
          }
        />

        {status.type === 'error' && (
          <div className='flex items-center gap-2'>
            <div className='relative h-[18px] w-[18px]'>
              <Image src={status.icon} alt='' fill />
            </div>
            <p className='text-typography-error mt-1 text-[13px]'>
              {status.message}
            </p>
          </div>
        )}
        {status.type === 'success' && (
          <div className='flex items-center justify-between gap-2'>
            Discounts
            <p className='mt-1'>
              {status.message}
              {status.discountType === 'PERCENTAGE' ? '%' : 'US$'} OFF
            </p>
          </div>
        )}
      </div>

      {loadingPreCheckoutData ? (
        <PricePreCheckoutSkeleton />
      ) : (
        <>
          {/* Price Breakdown */}
          <div className='w-full space-y-2'>
            <div className='text-typography-base flex items-center justify-between text-[15px] leading-[140%] font-medium tracking-[-0.3%]'>
              <span>{t('Subtotal')}</span>
              <span>US${preCheckoutData?.data.subTotal.toFixed(2)}</span>
            </div>

            <div className='text-typography-base flex items-center justify-between text-[15px] leading-[140%] font-medium tracking-[-0.3%]'>
              <span>{t('Delivery Fee')}</span>
              <span>US${preCheckoutData?.data.deliveryFee.toFixed(2)}</span>
            </div>

            <div className='text-typography-base flex items-center justify-between text-[15px] leading-[140%] font-medium tracking-[-0.3%]'>
              <span>{t('Discounts')}</span>
              <span>
                -US$
                {Math.abs(
                  Number(preCheckoutData?.data?.discountTotal ?? 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className='flex w-full items-center justify-between'>
            <span className='text-typography-base text-[15px] leading-[140%] font-semibold tracking-[-0.3%]'>
              {t('Total')}
            </span>
            <span className='text-primary text-[24px] leading-[130%] font-semibold'>
              US${preCheckoutData?.data.finalSubTotal.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(CheckoutSummaryItem);
