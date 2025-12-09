'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import OrderStatus from '@/components/Order/OrderStatus';

const OrderStatusSection = ({ status }: { status: string | undefined }) => {
  const t = useTranslations('orderDetail');

  console.log('status', status);

  const processingStatuses = [
    'PROCESSING',
    'AWAITING_ACCEPTANCE',
    'AWAITING_STOCK',
    'AWAITING_PICKUP',
    'ON_HOLD',
    'DELIVERING',
  ] as const;

  if (
    processingStatuses.includes(status! as (typeof processingStatuses)[number])
  ) {
    return (
      <OrderStatus
        bg='bg-paper'
        des={t(
          'Please wait for order confirmation We will notify you when your order is ready'
        )}
        icon='/assets/order-pending.svg'
        textColor='text-typography-base'
        title={t('Processing Your Order')}
      />
    );
  }

  if (status === 'COMPLETED') {
    return (
      <OrderStatus
        bg='bg-success-light'
        des={t('Your order is confirmed and will be delivered shortly')}
        icon='/assets/order-confirm.svg'
        textColor='text-success'
        title={t('Order Confirmed')}
      />
    );
  }

  return (
    <OrderStatus
      bg='bg-error-light'
      des={t(
        'This order has been canceled If you believe this is a mistake, please contact support'
      )}
      icon='/assets/order-cancel.svg'
      textColor='text-typography-error'
      title={t('Order Cancelled')}
    />
  );
};

export default React.memo(OrderStatusSection);
