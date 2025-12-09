'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import ORDER_API from 'api/Order';
import { useRouter } from 'hooks/navigation';
import { useFavorite } from 'hooks/useFavorite';
import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { useCart } from '@/contexts/CartContext';
import { useFavoriteContext } from '@/contexts/FavoriteContext';

import AddQtyButton from '@/components/Button/AddQtyButton';
import ButtonBase from '@/components/Button/ButtonBase';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

// ----------------- Interfaces -----------------

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

// ----------------- Reusable UI -----------------
const InfoRow = React.memo<InfoRowProps>(({ label, children }) => (
  <div className='flex items-center'>
    <p className='text-typography-muted w-[120px] text-[15px] leading-[140%] tracking-[-0.3px]'>
      {label}
    </p>
    <div className='text-typography-base flex items-center gap-2 text-[15px] leading-[140%] tracking-[-0.3px]'>
      {children}
    </div>
  </div>
));
InfoRow.displayName = 'InfoRow';

const Divider = React.memo(() => <hr className='text-border h-[1px]' />);
Divider.displayName = 'Divider';

const PriceDisplay = React.memo(
  ({ productDetail }: { productDetail: IProducts.IProductDetailData }) => {
    const discount = productDetail.discounts[0];

    const discountDeducePrice =
      discount?.type === 'PERCENT'
        ? `${discount.value * 100}% OFF`
        : discount?.type === 'FIXED'
          ? `$${discount.value} OFF`
          : '';
    return (
      <>
        <div className='flex items-center gap-6 text-[36px] font-semibold'>
          <h1 className='text-typography-base leading-[130%]'>
            US$ {productDetail.productVariants[0].afterDiscount.toFixed(2)}
          </h1>
          {productDetail.discounts.length > 0 && (
            <span className='text-primary leading-[130%]'>
              {discount.rule === 'OVERRIDE_PRICE' ? '' : discountDeducePrice}
            </span>
          )}
        </div>

        <InfoRow label='Retails Price:'>
          <p
            className={`${productDetail.productVariants[0].discount > 0 ? 'line-through' : ''}`}
          >
            {productDetail.productVariants[0].price.toFixed(2)} USD
          </p>
          {productDetail.productVariants[0].discount > 0 && (
            <p>
              (Saved {Math.abs(productDetail.productVariants[0].discount)} USD)
            </p>
          )}
        </InfoRow>
      </>
    );
  }
);
PriceDisplay.displayName = 'PriceDisplay';

const TotalPrice = React.memo(({ price }: { price: number }) => (
  <div className='flex items-center justify-end gap-4'>
    <p className='text-typography-muted text-[15px] leading-[140%] tracking-[-0.3px]'>
      Total:
    </p>
    <p className='text-primary text-[24px] leading-[130%] font-semibold'>
      US$ {price.toFixed(2)}
    </p>
  </div>
));
TotalPrice.displayName = 'TotalPrice';

const ActionButtons = React.memo(
  ({
    isFav,
    onToggleFav,
    onChangeQty,
    productDetail,
    qty,
    loadingFav,
  }: {
    isFav: boolean;
    onToggleFav: () => void;
    onChangeQty: () => void;
    productDetail: IProducts.IProductDetailData;
    qty: number;
    loadingFav: boolean;
  }) => {
    const error = useRef<IErrDialogRef>(null);
    const nav = useRouter();
    const {
      run: runPreCheckoutByProductId,
      loading: loadingPreCheckoutByProductId,
    } = useRequest(ORDER_API.preCheckoutByProductId, {
      manual: true,
      onSuccess: () => {
        nav.push(
          `/checkout/${productDetail.id}?qty=${qty}&variantId=${productDetail.productVariants[0].id}`
        );
      },
      onError: (err) => {
        error.current?.open(err);
      },
    });
    return (
      <>
        <ErrDialog ref={error} />
        {loadingFav ? (
          <div className='border-border flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] border-[1px] p-2'>
            <LoadingSpinner size={20} color='border-primary' />
          </div>
        ) : (
          <Image
            src={isFav ? '/assets/heart-active.svg' : '/assets/heart.svg'}
            alt='favorite'
            height={22}
            width={22}
            loading='lazy'
            className='border-border flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] border-[1px] p-2'
            onClick={onToggleFav}
          />
        )}

        <ButtonBase
          iconPosition='left'
          iconSrc='/assets/cart-plus.svg'
          className='bg-primary-light hover:bg-primary-light/50 w-full px-4'
          onClick={onChangeQty}
        >
          <span className='text-primary'>Add to cart</span>
        </ButtonBase>

        <ButtonBase
          className='w-full px-4'
          onClick={() => {
            runPreCheckoutByProductId({
              products: [
                {
                  productId: productDetail.id,
                  productVariantId: productDetail.productVariants[0].id,
                  qty: qty,
                },
              ],
            });
          }}
        >
          {loadingPreCheckoutByProductId ? <LoadingSpinner /> : 'Buy Now'}
        </ButtonBase>
      </>
    );
  }
);
ActionButtons.displayName = 'ActionButtons';

// ----------------- Main Component -----------------
const ProductInfo = ({
  productDetail,
  session,
}: {
  //   },
  productDetail: IProducts.IProductDetailData;
  session: SessionPayload | null;
}) => {
  const [qty, setQty] = useState(1);

  const totalPrice = productDetail.productVariants[0].afterDiscount * qty;
  const { setGetFavoriteProductName } = useFavoriteContext();

  const {
    runAddFavorite,
    runRemoveFavorite,
    isFav,
    loadingAddFavorite,
    loadingRemoveFavorite,
    loadingDataFav,
    errorFavorite,
  } = useFavorite(productDetail.id, session);

  const handleToggleFav = () => {
    if (isFav === true) {
      runRemoveFavorite({ productId: productDetail.id });
    } else {
      runAddFavorite({ productId: productDetail.id });
      setGetFavoriteProductName(productDetail.nameEn);
    }
  };

  const { runAddToCart, setGetCartProductName, errorAddToCart } = useCart();

  const onChangeQty = () => {
    runAddToCart({
      qty: qty,
      productId: productDetail.id,
      variantId: productDetail.productVariants[0].id,
    });
    setGetCartProductName(productDetail.nameEn);
  };

  if (!productDetail) return;

  return (
    <>
      <ErrDialog
        ref={errorAddToCart}
        // onClose={() => setParam('auth', 'signin')}
      />
      <ErrDialog ref={errorFavorite} />
      <div className='flex w-full flex-col gap-5'>
        {/* Title */}
        <h1 className='text-typography-base max-w-[500px] text-[24px] leading-[130%] font-semibold'>
          {productDetail.nameEn}
        </h1>

        {/* Prices */}
        <PriceDisplay productDetail={productDetail} />

        {/* Delivery */}
        <InfoRow label='Delivery:'>
          <Image
            src={'/images/mocks/grab.png'}
            width={59}
            height={21}
            alt='delivery'
            loading='lazy'
          />
        </InfoRow>

        <Divider />

        {/* Details */}
        <div className='space-y-2'>
          {/* <InfoRow label='Brand:'>
            <p className='underline'>※ SKIN1004</p>
          </InfoRow> */}
          <InfoRow label='Code:'>
            {productDetail.productVariants[0].sku}
          </InfoRow>
          {productDetail.productVariants[0].attributes !== null &&
            Object.entries(productDetail.productVariants[0].attributes).map(
              ([key, value], index) => (
                <InfoRow label={key + ':'} key={index}>
                  {value}
                </InfoRow>
              )
            )}
          {/* <InfoRow label='Weight:'>183g (0.4 lbs)</InfoRow> */}
        </div>

        <Divider />

        {/* Qty */}
        <div className='bg-paper space-y-4 rounded-xl p-6'>
          <h1>{productDetail.nameEn}</h1>
          <AddQtyButton
            initialQty={1}
            onChange={(value) => {
              setQty(value);
            }}
          />
        </div>

        {/* Desktop Total */}
        <div className='hidden lg:block'>
          <TotalPrice price={totalPrice} />
        </div>

        {/* Desktop CTA */}
        <div className='hidden gap-2 lg:flex'>
          <ActionButtons
            isFav={isFav!}
            onToggleFav={handleToggleFav}
            onChangeQty={onChangeQty}
            productDetail={productDetail}
            qty={qty}
            loadingFav={
              loadingAddFavorite || loadingRemoveFavorite || loadingDataFav
            }
          />
        </div>

        {/* Mobile CTA */}
        <div className='fixed bottom-0 left-0 z-50 w-full bg-white p-4 shadow-lg lg:hidden'>
          <div className='mb-3 flex items-center justify-end gap-2'>
            <p className='text-typography-muted text-[15px]'>Total:</p>
            <p className='text-primary text-[20px] font-semibold'>
              US$ {totalPrice.toFixed(2)}
            </p>
          </div>
          <div className='flex w-full gap-2'>
            <ActionButtons
              isFav={isFav!}
              onToggleFav={handleToggleFav}
              onChangeQty={onChangeQty}
              productDetail={productDetail}
              qty={qty}
              loadingFav={
                loadingAddFavorite || loadingRemoveFavorite || loadingDataFav
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
ProductInfo.displayName = 'ProductInfo';

export default React.memo(ProductInfo);
