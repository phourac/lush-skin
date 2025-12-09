'use client';

import { useRouter } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCart } from '@/contexts/CartContext';

import ButtonBase from '@/components/Button/ButtonBase';
import CheckboxCustom from '@/components/Button/CheckboxCustom';
import ErrDialog from '@/components/Dialog/ErrorDialog';
import EmptyData from '@/components/EmptyData';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import CartItemSkeleton from '@/components/Skeleton/CartItemSkeleton';

import CartItem from './CartItem';
import CartSummary from './CartSummary';
import useCartReview from './useCartReview';

const CartReview: React.FC = () => {
  const methods = useForm<ICart.ICartItem>();
  const { handleSubmit } = methods;

  const nav = useRouter();

  const t = useTranslations('cart');

  const {
    clearCart,
    removeFromCart,
    updateQuantity,
    cartList,
    loadingCartList,
    errorAddToCart,
    refreshCartList,
    errorUpdateToCart,
    errorCartList,
  } = useCart();

  const {
    handleRemoveSelected,
    handleSelectAll,
    handleSelectItem,
    openIndex,
    setOpenIndex,
    isAllSelected,
    selectedItems,
    totalSelectedPrice,
    totalDiscount,
    onSubmit,
    handleFavouriteToggle,
    selectedSet,
    loadingRunPrecheckout,
    errorRunPreCheckout,
  } = useCartReview();

  return (
    <>
      <ErrDialog ref={errorAddToCart} onClose={refreshCartList} />
      <ErrDialog ref={errorRunPreCheckout} />
      <ErrDialog ref={errorUpdateToCart} onClose={refreshCartList} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <div className='flex gap-4 md:gap-[64px]'>
            {/* Cart items */}
            <div
              className={`w-full ${(cartList?.data?.length ?? 0) > 0 && 'lg:max-w-[823px]'}`}
            >
              <div className='sticky top-[164px] z-10 bg-white pt-4 md:pt-8'>
                <h2 className='text-[20px] font-semibold md:text-[28px]'>
                  {t('Review your cart')}
                </h2>

                {cartList?.data.length === 0 && (
                  <EmptyData
                    title={t('No Data')}
                    description={t('There is no item in cart yet')}
                    btnTitle={t('Shop Now')}
                    onRefresh={() => nav.push('/shop')}
                  />
                )}

                {errorCartList && (
                  <EmptyData
                    title={`Error ${(errorCartList as any).status}`}
                    description={errorCartList.message}
                  />
                )}

                {(cartList?.data?.length ?? 0) > 0 && (
                  <div className='pb- flex justify-between pt-4 pb-[22px] md:pt-8'>
                    <div className='hidden items-center gap-[22px] lg:flex'>
                      <CheckboxCustom
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                      />
                      <p className='text-[18px] font-semibold'>
                        {t('Select all')} {cartList?.data.length} {t('items')}
                      </p>
                    </div>

                    <div className='flex items-center gap-[12px]'>
                      <button
                        type='button'
                        onClick={() =>
                          clearCart(cartList?.data.map((item) => item.id) || [])
                        }
                        className='text-typography-muted cursor-pointer underline'
                      >
                        {t('Clear Cart')}
                      </button>
                      <button
                        type='button'
                        onClick={handleRemoveSelected}
                        disabled={selectedItems.length === 0}
                        className='text-typography-muted cursor-pointer underline disabled:opacity-50'
                      >
                        {t('Remove Selected')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Render cart list */}
              <div className='flex flex-col'>
                {loadingCartList || (!cartList?.data && !errorCartList)
                  ? Array.from({ length: cartList?.data.length || 2 }).map(
                      (_, i) => <CartItemSkeleton key={i} />
                    )
                  : cartList?.data.map((item, index) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        index={index}
                        checked={selectedSet.has(item.id)}
                        onSelect={() => handleSelectItem(item.id)}
                        onQtyChange={(newQty) =>
                          updateQuantity({
                            id: item.id,
                            productId: item.productId,
                            variantId: item.product.productVariants[0].id,
                            qty: newQty,
                          })
                        }
                        onCancel={removeFromCart}
                        onFavouriteToggle={handleFavouriteToggle}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                      />
                    ))}
              </div>
            </div>

            {/* Summary */}
            {(cartList?.data?.length ?? 0) > 0 && (
              <div className='hidden w-full max-w-[352px] lg:block'>
                <CartSummary
                  subTotal={totalSelectedPrice}
                  totalItems={selectedItems.length}
                  totalDiscount={totalDiscount}
                  loadingRunPrecheckout={loadingRunPrecheckout}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className='fixed right-0 bottom-0 left-0 z-50 flex justify-between bg-white px-4 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] lg:hidden'>
          <div className='flex items-center gap-2'>
            <CheckboxCustom
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            <p className='font-semibold'>
              All {selectedItems.length} {t('items')}
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <h1 className='font-semibold'>
              {t('Total')}:{' '}
              <span className='text-primary text-[18px]'>
                ${totalSelectedPrice?.toFixed(2)}
              </span>
            </h1>

            <ButtonBase
              type='submit'
              disabled={selectedItems.length === 0 || loadingRunPrecheckout}
            >
              {loadingRunPrecheckout ? (
                <LoadingSpinner size={18} />
              ) : (
                t('Checkout')
              )}
            </ButtonBase>
          </div>
        </div>
      </form>
    </>
  );
};

export default CartReview;
