'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

interface OrderSummaryProps {
  orderDetail: IOrder.IOrderDetail | undefined;
}

const OrderSummary = ({ orderDetail }: OrderSummaryProps) => {
  const t = useTranslations('orderDetail');

  return (
    <div className='border-border flex flex-col gap-6 rounded-[12px] border-[1px] p-4'>
      <h1 className='text-typography-base mx-auto text-[18px] leading-[140%] font-semibold'>
        {t('Order Summary')}
      </h1>

      <div className='flex flex-col'>
        {orderDetail?.data?.orderProducts?.map((item, index: number) => (
          <div key={item.productId}>
            <div className='flex w-full justify-between'>
              <div className='flex items-start gap-3'>
                <Image
                  src={item.productInfo.product.productImages[0].imageUrl}
                  width={72}
                  height={72}
                  alt={item.id.toString()}
                />
                <div className='flex max-w-[222px] flex-col gap-2'>
                  <h1 className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3%]'>
                    {item.productInfo.product.nameEn}
                  </h1>
                  <div className='text-typography-muted space-y-1 text-[14px] leading-[140%] tracking-[-0.3%]'>
                    <p>{item.productInfo.sku}</p>
                    {item.productInfo.attributes &&
                      Object.values(item.productInfo.attributes).length > 0 && (
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
              </div>
              <div className='text-typography-base text-[15px] font-medium'>
                ${item.productInfo.price.toFixed(2)}
              </div>
            </div>

            {index < orderDetail?.data?.orderProducts.length - 1 && (
              <hr className='bg-border my-6 h-px border-0' />
            )}
          </div>
        ))}
      </div>

      <div className='space-y-6'>
        <div className='flex justify-between text-[15px] font-medium'>
          <span>{t('Subtotal')}</span>
          <span>US${orderDetail?.data.subTotal.toFixed(2)}</span>
        </div>

        <div className='flex justify-between text-[15px] font-medium'>
          <span>{t('Delivery Fee')}</span>
          <span>US${orderDetail?.data?.deliveryFee.toFixed(2)}</span>
        </div>

        <div className='flex justify-between text-[15px] font-medium'>
          <span>{t('Discounts')}</span>
          <span>
            -US${Math.abs(orderDetail?.data.discount ?? 0).toFixed(2)}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-[15px] font-semibold'>{t('Total')}</span>
          <span className='text-primary text-[24px] font-semibold'>
            US${orderDetail?.data?.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderSummary);
