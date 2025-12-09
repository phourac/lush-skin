'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchProduct = () => {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ✅ Keep input synced with URL param
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // ✅ Detect screen size once + on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Disable body scroll on mobile modal open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ✅ Function to handle navigation cleanly
  const navigateToShop = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      const currentParams = new URLSearchParams(searchParams.toString());
      const currentQuery = currentParams.get('query') || '';

      // If query is empty → remove query param
      if (!trimmed) {
        if (!currentQuery) return; // prevent redundant push
        currentParams.delete('query');
        const qs = currentParams.toString();
        router.push(`/shop${qs ? `?${qs}` : ''}`);
        setOpen(false);
        return;
      }

      // If query didn’t change → skip navigation
      if (trimmed === currentQuery) return;

      // Otherwise, update query param
      currentParams.set('query', trimmed);
      router.push(`/shop?${currentParams.toString()}`);
      setOpen(false);
    },
    [router, searchParams, setOpen] // dependencies
  );

  // ✅ Debounce desktop input updates
  useEffect(() => {
    if (!isDesktop) return;
    const timeout = setTimeout(() => {
      navigateToShop(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, isDesktop, navigateToShop]);

  return (
    <>
      <div className='relative flex items-center'>
        {/* Desktop input */}
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          className='text-primary placeholder-primary border-primary hidden h-12 w-[160px] border-0 border-b bg-transparent px-3 py-2 font-medium tracking-[-0.3px] focus:ring-0 focus:outline-none sm:block md:w-[180px]'
        />

        {/* Search icon button */}
        <button
          onClick={() => setOpen(true)}
          className='flex items-center justify-center p-3 transition-transform sm:absolute sm:top-1/2 sm:right-2 sm:-translate-y-1/2'
        >
          <Image
            src='/assets/search-product.svg'
            alt='Search'
            width={22}
            height={22}
            className='object-contain'
          />
        </button>
      </div>

      {/* Mobile search modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className='fixed inset-0 z-[98] bg-black/20 backdrop-blur-sm sm:hidden'
            />

            {/* Modal */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='fixed top-0 right-0 left-0 z-[99] bg-white shadow-[0_6px_12px_rgba(51,51,51,0.08)] sm:hidden'
            >
              <div className='flex items-center gap-2 px-4 py-3'>
                <input
                  type='text'
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search')}
                  onKeyDown={(e) => e.key === 'Enter' && navigateToShop(query)}
                  className='text-primary flex-1 border-none bg-transparent text-base placeholder:text-gray-400 focus:ring-0 focus:outline-none'
                />

                {/* Search button */}
                <button
                  onClick={() => navigateToShop(query)}
                  className='rounded-full p-2 transition-colors hover:bg-gray-100'
                >
                  <div className='relative h-[20px] w-[20px]'>
                    <Image src='/assets/search-product.svg' alt='Search' fill />
                  </div>
                </button>

                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className='rounded-full p-2 transition-colors hover:bg-gray-100'
                >
                  <div className='relative h-[24px] w-[24px]'>
                    <Image src='/assets/cancel.svg' alt='Close' fill />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchProduct;
