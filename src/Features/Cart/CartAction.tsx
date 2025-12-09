'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useFavorite } from 'hooks/useFavorite';
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useCart } from '@/contexts/CartContext';
import { useFavoriteContext } from '@/contexts/FavoriteContext';

import ErrDialog from '@/components/Dialog/ErrorDialog';

interface CartActionProps {
  productId: number;
  onFavouriteToggle?: (productId: number, active: boolean) => void;
  onCancel?: (productId: number[]) => void;
  isFav?: boolean;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  id: number;
  name: string;
}

const CartAction: React.FC<CartActionProps> = ({
  id,
  productId,
  onFavouriteToggle,
  onCancel,
  isFav,
  openIndex,
  setOpenIndex,
  index,
  name,
}) => {
  const [active, setActive] = useState<boolean>(!!isFav);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const { setGetFavoriteProductName } = useFavoriteContext();
  const {
    runAddFavorite,
    runRemoveFavorite,
    addSuccess,
    removeSuccess,
    errorFavorite,
  } = useFavorite();

  const { refreshCartList } = useCart();

  const isOpen = openIndex === index;

  /** Sync local state with backend response */
  useEffect(() => {
    if (addSuccess === true) {
      setActive(true);
    }
    if (removeSuccess?.productId === productId) {
      setActive(false);
    }
  }, [addSuccess, removeSuccess, productId]);

  /** Sync with parent when item initial favorite state changes */
  useEffect(() => {
    setActive(!!isFav);
  }, [isFav]);

  /** Handle Favourite Click */
  const handleFavouriteClick = () => {
    const newActive = !active;

    // optimistic update
    setActive(newActive);

    // call backend
    if (newActive) {
      runAddFavorite({ productId });
    } else {
      runRemoveFavorite({ productId });
    }

    setGetFavoriteProductName(name);

    onFavouriteToggle?.(productId, newActive);

    setOpenIndex(null);
  };

  /** Handle Cancel */
  const handleCancelClick = () => {
    onCancel?.([id]);
    setOpenIndex(null);
  };

  /** Outside click close */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handler);
    }
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [isOpen, setOpenIndex]);

  return (
    <>
      {/* Desktop */}
      <ErrDialog ref={errorFavorite} onClose={refreshCartList} />
      <div className='hidden items-center gap-6 md:flex'>
        <button
          type='button'
          onClick={handleFavouriteClick}
          className='cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95'
        >
          <div className='relative h-[24px] w-[24px]'>
            <Image
              src={
                active
                  ? '/assets/favourite-active.svg'
                  : '/assets/favourite.svg'
              }
              alt='Favourite'
              fill
              priority
            />
          </div>
        </button>

        <button
          type='button'
          onClick={handleCancelClick}
          className='cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95'
        >
          <div className='relative h-[24px] w-[24px]'>
            <Image src='/assets/cancel.svg' alt='Cancel' fill priority />
          </div>
        </button>
      </div>

      {/* Mobile */}
      <div className='relative flex items-center md:hidden' ref={tooltipRef}>
        <button
          type='button'
          onClick={() =>
            setOpenIndex((prev) => (prev === index ? null : index))
          }
          className='flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95'
        >
          <Image src='/assets/threedot.svg' width={24} height={24} alt='Menu' />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className='absolute top-full right-0 mt-2 w-36 rounded-xl border border-gray-100 bg-white shadow-lg'
            >
              <button
                onClick={handleFavouriteClick}
                className='flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              >
                <Image
                  src={
                    active
                      ? '/assets/favourite-active.svg'
                      : '/assets/favourite.svg'
                  }
                  width={20}
                  height={20}
                  alt='Favourite'
                />
                <span>{active ? 'Unfavourite' : 'Favourite'}</span>
              </button>

              <button
                onClick={handleCancelClick}
                className='flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              >
                <Image
                  src='/assets/cancel.svg'
                  width={20}
                  height={20}
                  alt='Cancel'
                />
                <span>Remove</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default React.memo(CartAction);
