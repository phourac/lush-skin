'use client';

import { Link } from 'hooks/navigation';
import { useBreakPoints } from 'hooks/useBreakPoints';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Image from 'next/image';

import { useCart } from '@/contexts/CartContext';

import ErrDialog from '../Dialog/ErrorDialog';

interface IProductCardProps {
  id: number;
  name: string;
  price: number;
  img: string[];
  shopId?: number;
  width?: number;
  height?: number;
  discountedPrice?: number;
  isFav?: number;
  variant: IProducts.ProductVariant[];
  handleRemoveFavorite?: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  img = [],
  width = 269,
  height = 287,
  discountedPrice,
  isFav,
  variant = [],
  handleRemoveFavorite,
}: IProductCardProps) => {
  const hasHoverImage = img.length > 1;
  const [hovered, setHovered] = useState(false);
  const { runAddToCart, errorAddToCart, setGetCartProductName } = useCart();

  const { isSmUp } = useBreakPoints();

  const t = useTranslations('favorite');

  // Safe variant id (could be undefined)
  const firstVariantId = variant?.[0]?.id;

  // Show add button always on small screens, and only on hover for desktop
  // const showAddButton = !isSmUp ? true : hovered;

  // Defensive: ensure we always have at least one image placeholder if empty
  const primaryImg = img?.[0] ?? '/assets/placeholder.png';
  const hoverImg = img?.[1] ?? null;

  return (
    <>
      <ErrDialog ref={errorAddToCart} />

      <div
        style={{ maxWidth: width }}
        className='relative flex h-[423px] cursor-pointer flex-col items-center justify-between gap-1 overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.02] md:gap-3'
        // Hover only triggers on desktop
        onMouseEnter={() => {
          if (isSmUp) setHovered(true);
        }}
        onMouseLeave={() => {
          if (isSmUp) setHovered(false);
        }}
      >
        <Link
          href={`/shop/product/${id}`}
          className='w-full'
          aria-label={`Shop Product ${name}`}
        >
          <div
            className='relative flex items-center justify-center overflow-hidden bg-gray-50'
            style={
              isSmUp
                ? { width: `${width}px`, height: `${height}px` }
                : { width: '100%', height: `${220}px` }
            }
          >
            {/* Primary Image */}
            <Image
              src={primaryImg}
              alt={name}
              fill
              className={`object-cover transition-opacity duration-700 ${
                hasHoverImage && hovered ? 'opacity-0' : 'opacity-100'
              }`}
              sizes={`${width}px`}
            />

            {/* Hover Image */}
            {hasHoverImage && hoverImg && (
              <Image
                src={hoverImg}
                alt={`${name} hover`}
                fill
                className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                  hovered ? 'opacity-100' : 'opacity-0'
                }`}
                sizes={`${width}px`}
              />
            )}

            {/* ✅ ADD TO CART BUTTON — NOW LOCKED TO IMAGE */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!firstVariantId) return;

                setGetCartProductName(name);
                runAddToCart({
                  productId: id,
                  qty: 1,
                  variantId: firstVariantId,
                });
              }}
              disabled={!firstVariantId}
              aria-label='Add to cart'
              onMouseDown={(e) => e.preventDefault()}
              className={`bg-green hover:bg-green/90 absolute right-3 bottom-4 z-20 flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 ${
                isSmUp
                  ? hovered
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                  : 'translate-y-0 opacity-100'
              } ${!firstVariantId ? 'cursor-not-allowed opacity-60' : ''} `}
            >
              <Image src='/assets/plus.svg' alt='' width={20} height={20} />
            </button>
          </div>
        </Link>

        {/* Add to cart button */}

        <p
          className='text-typography-base line-clamp-2 px-2 text-center text-[15px] leading-[21px] font-medium tracking-[-0.3px]'
          style={{ minHeight: '42px' }} // Reserve space for 2 lines
        >
          {name}
        </p>

        <hr className='text-divider h-[1px] w-full' />

        <div className='flex h-[46.2px] flex-col items-center'>
          <h1 className='text-typography-base text-[18px] leading-[25.2px] font-semibold'>
            {price} USD
          </h1>
          {typeof discountedPrice === 'number' && discountedPrice !== price && (
            <p className='text-typography-muted text-[15px] leading-[21px] tracking-[-0.3px] line-through'>
              {discountedPrice} USD
            </p>
          )}
        </div>

        {isFav === 1 && (
          <button
            type='button'
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
            onClick={() => handleRemoveFavorite && handleRemoveFavorite(id)}
            className='text-typography-base cursor-pointer text-[15px] leading-[21px] font-medium tracking-[-0.3px] underline'
          >
            {t('Remove from favorite')}
          </button>
        )}
      </div>
    </>
  );
};

export default ProductCard;
