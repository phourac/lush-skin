'use client';

import { Link } from 'hooks/navigation';
import React from 'react';

import Image from 'next/image';

import AddQtyButton from '@/components/Button/AddQtyButton';
import CheckboxCustom from '@/components/Button/CheckboxCustom';

import CartAction from './CartAction';

interface CartItemProps {
  item: ICart.ICartResData;
  checked: boolean;
  onSelect: () => void;
  onQtyChange: (qty: number) => void;
  onCancel: (id: number[]) => void;
  onFavouriteToggle: (id: number, active: boolean) => void;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

const CartItem = React.memo(function CartItem({
  item,
  checked,
  onSelect,
  onQtyChange,
  onCancel,
  onFavouriteToggle,
  openIndex,
  setOpenIndex,
  index,
}: CartItemProps) {
  if (item.product == null) {
    return;
  }
  return (
    <div className='border-border flex items-start gap-[22px] border-t py-4 last:border-b'>
      {/* Checkbox + Image */}
      <div className='flex items-center gap-[12px]'>
        <CheckboxCustom checked={checked} onChange={onSelect} />
        <Link
          href={`/shop/product/${item.productId}`}
          aria-label='Go to product detail page'
        >
          <Image
            src={item.product?.productImages[0].imageUrl || ''}
            alt={item.product?.nameEn}
            width={124}
            height={124}
            loading='lazy'
            className='h-[124px] w-[124px] flex-shrink-0 object-contain'
          />
        </Link>
      </div>

      {/* Content */}
      <div className='flex w-full justify-between'>
        <div className='w-full lg:max-w-[270px]'>
          <div className='space-y-2'>
            <p className='text-typography-base text-[15px] font-medium tracking-[-2%]'>
              {item.product?.nameEn}
            </p>
            <div className='flex items-start'>
              <p className='text-typography-muted w-[74px] text-[15px] leading-[140%] tracking-[-0.3px] break-words'>
                Code:
              </p>
              <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
                {item.product.productVariants[0].sku}
              </p>
            </div>
            {item.product.productVariants[0].attributes !== null &&
              Object.entries(item.product.productVariants[0].attributes).map(
                ([key, value], index) => (
                  <div className='flex items-start' key={index}>
                    <p className='text-typography-muted w-[74px] text-[15px] leading-[140%] tracking-[-0.3px] break-words'>
                      {key}:
                    </p>
                    <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
                      {String(value)}
                    </p>
                  </div>
                )
              )}
          </div>

          <div className='mt-3 flex items-center justify-between gap-2'>
            <div className='block xl:hidden'>
              <p className='text-primary text-[18px] font-semibold'>
                ${item.product?.productVariants[0]?.afterDiscount.toFixed(2)}
              </p>

              {item.product?.productVariants[0]?.afterDiscount !==
                item.product?.productVariants[0]?.price && (
                <p className='text-typography-muted text-[15px] leading-[21px] font-medium tracking-[-0.3px] line-through'>
                  ${item.product?.productVariants[0]?.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Mobile qty */}
            <div className='flex gap-6 lg:hidden'>
              <AddQtyButton initialQty={item?.qty} onChange={onQtyChange} />
              <CartAction
                id={item?.id}
                productId={item?.productId}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                isFav={item.product.productFavorites.length > 0 ? true : false}
                onFavouriteToggle={onFavouriteToggle}
                onCancel={onCancel}
                name={item.product?.nameEn}
              />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className='hidden items-center gap-6 lg:flex'>
          <div className='hidden xl:block'>
            <p className='text-primary text-[18px] font-semibold'>
              ${item.product?.productVariants[0]?.afterDiscount.toFixed(2)}
            </p>
            {item.product?.productVariants[0]?.afterDiscount !==
              item.product?.productVariants[0]?.price && (
              <p className='text-typography-muted text-[15px] leading-[21px] font-medium tracking-[-0.3px] line-through'>
                ${item.product?.productVariants[0]?.price.toFixed(2)}
              </p>
            )}
          </div>
          <AddQtyButton initialQty={item?.qty} onChange={onQtyChange} />
          <CartAction
            productId={item?.productId}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            isFav={item.product.productFavorites.length > 0 ? true : false}
            onFavouriteToggle={onFavouriteToggle}
            onCancel={onCancel}
            id={item?.id}
            name={item.product?.nameEn}
          />
        </div>
      </div>
    </div>
  );
});

export default CartItem;
