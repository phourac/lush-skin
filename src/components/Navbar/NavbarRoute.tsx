'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Image from 'next/image';

import { useAppContext } from '@/contexts/AppClientContext';

import { navigation } from '@/utils/route-utils';

// ✅ Reusable Category Section
const CategorySection = ({
  group,
  index,
  categories,
  onNavigate,
}: {
  group: IGroupCategory.IGroupCategoryData;
  index: number;
  categories: ICategory.ICategoryData[];
  onNavigate: () => void; // ✅ FIXED TYPE
}) => {
  const getCate =
    categories?.filter((cate) => cate.productCategoryGroupId === group.id) ||
    [];

  return (
    <div className='flex flex-col gap-4'>
      {(group.nameEn === 'skincare' || group.nameEn === 'makeup') &&
        group.thumbUrl && (
          <Image
            src={group.imageUrl || ''}
            alt={group.nameEn}
            width={243}
            height={92}
            className='rounded-lg'
          />
        )}

      <div className='px-1 py-0.5'>
        <h2
          className={`text-typography-muted px-[10px] ${
            index === 1 || index === 2
              ? 'py-3 md:py-6'
              : 'py-[16px] md:py-[18px]'
          } text-[18px] leading-[140%] font-semibold md:text-[18px]`}
        >
          {group.nameEn}
        </h2>

        <div className='flex flex-col'>
          {getCate.map((cate, idx) => {
            const href =
              group.nameEn === 'brand'
                ? `/shop?brands=${cate.id}`
                : `/shop?cate=${cate.id}`;

            return (
              <Link
                onClick={onNavigate}
                key={idx}
                href={href}
                className='text-typography-base border-border w-full cursor-pointer px-[10px] py-2 text-left text-[15px] leading-[140%] font-medium first:border-t-[1px] md:py-3 md:text-[18px]'
              >
                {cate.nameEn}
              </Link>
            );
          })}

          <Link
            href='/shop'
            onClick={onNavigate}
            className='text-typography-base flex w-full justify-between gap-[6px] px-[10px] py-3 text-[15px] leading-[140%] font-semibold md:text-[18px]'
          >
            Shop All
            <span className='bg-green flex h-8 w-8 items-center justify-center rounded-full'>
              <Image
                src='/assets/arrow-right.svg'
                alt=''
                width={8}
                height={16}
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
//  Generic Dropdown Component with Manual State
// ----------------------------------------------------------------------

const DropdownContainer = ({
  open,
  children,
  hasVectors = false,
  onClose,
}: {
  open: boolean;
  children: React.ReactNode;
  hasVectors?: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {open && (
      <>
        <div
          className='pointer-events-auto fixed inset-0 top-[164px] z-30 cursor-pointer bg-black/12'
          onClick={onClose}
        />

        <div className='pointer-events-none fixed top-[164px] left-0 z-40 w-screen'>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className='pointer-events-auto relative overflow-hidden bg-white shadow-lg ring-1 ring-gray-200'
          >
            {hasVectors && (
              <>
                <Image
                  src='/assets/shop-menu-vector-green.svg'
                  alt=''
                  width={188}
                  height={198}
                  className='pointer-events-none absolute bottom-0 left-0 hidden xl:block'
                />

                <Image
                  src='/assets/shop-menu-vector-blue.svg'
                  alt=''
                  width={188}
                  height={198}
                  className='pointer-events-none absolute right-0 bottom-0 hidden lg:block'
                />
              </>
            )}

            <div className='relative max-h-[calc(100vh-194px-2rem)] min-h-[calc(100vh-194px-2rem)] overflow-y-auto'>
              {children}
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
);

// ----------------------------------------------------------------------
//  Shop Dropdown
// ----------------------------------------------------------------------

const ShopDropdown = ({
  open,
  groupCategories,
  categories,
  onNavigate,
  onClose,
}: any) => (
  <DropdownContainer open={open} hasVectors onClose={onClose}>
    <div className='md:p- mx-auto flex w-full flex-col gap-4 px-4 sm:flex-row sm:justify-center md:gap-8'>
      {groupCategories.map((group: any, index: number) => (
        <CategorySection
          key={group.id}
          group={group}
          index={index}
          categories={categories}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  </DropdownContainer>
);

// ----------------------------------------------------------------------
//  Affiliate Dropdown
// ----------------------------------------------------------------------

const affiliateRoutes: Record<string, string> = {
  'The Lush Creator': '/lush-creator',
  'The Lush Skin ViralPay': '/viral-pay',
};

const AffiliateDropdown = ({
  open,
  onClose,
}: {
  open: boolean;
  onNavigate: (href: string) => void;
  onClose: () => void;
}) => {
  const t = useTranslations('Navbar');
  return (
    <DropdownContainer open={open} hasVectors onClose={onClose}>
      <div className='mx-auto flex flex-col gap-8 py-0 sm:flex-row sm:justify-center md:py-6'>
        <div className='mx-auto flex w-full max-w-[1240px] flex-col gap-4 xl:px-0'>
          <div className='w-full px-4'>
            <h2 className='text-typography-muted py-[16px] text-[18px] leading-[140%] font-semibold md:text-[18px]'>
              {t('Affiliate Programs')}
            </h2>

            <hr className='border-border h-[1px] w-full' />

            <div className='flex flex-col gap-2 pt-0 md:gap-4 md:pt-4'>
              {['The Lush Creator', 'The Lush Skin ViralPay'].map(
                (title, idx) => (
                  <Link
                    key={idx}
                    href={affiliateRoutes[title]}
                    onClick={onClose} // ✅ CLOSE ONLY
                    className='flex w-full items-center justify-between rounded-lg py-2'
                  >
                    <h1 className='text-typography-base text-[15px] font-semibold underline'>
                      {t(title)}
                    </h1>

                    <span className='bg-green flex h-8 w-8 items-center justify-center rounded-full'>
                      <Image
                        src='/assets/arrow-right.svg'
                        alt=''
                        width={8}
                        height={16}
                      />
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </DropdownContainer>
  );
};

// ----------------------------------------------------------------------
//  Main Navbar Component
// ----------------------------------------------------------------------

const NavbarRoute = () => {
  const { dataCate, dataGroupCate } = useAppContext();

  // Manual state control for each dropdown
  const [shopOpen, setShopOpen] = useState(false);
  const [affiliateOpen, setAffiliateOpen] = useState(false);

  const categories = dataCate?.data || [];
  const groupCategories = dataGroupCate?.data || [];

  const t = useTranslations('Navbar');

  const btnWidth = 'w-auto sm:w-[90px] md:w-[110px] lg:w-[125px] flex-shrink-0';
  const commonBtn = `
    flex h-12 ${btnWidth} items-center justify-center gap-1.5 
    rounded-lg px-2 py-1 font-medium capitalize text-gray-700 
    transition-all duration-200 hover:bg-gray-50 hover:text-gray-900
    focus:outline-none cursor-pointer
  `;

  // Handle navigation with animation delay
  const handleNavigate = (setOpen: (open: boolean) => void) => {
    setOpen(false); // ✅ CLOSE ONLY
  };

  return (
    <nav className='relative z-50 flex min-w-0 items-center justify-between gap-1 px-4 sm:justify-center sm:px-0'>
      {navigation.map((nav, idx) => {
        const isShop = nav.subRoutes[0]?.subName === 'shop';
        const isAffiliate = nav.subRoutes[0]?.subName === 'affiliate';

        if (isShop && groupCategories.length > 0) {
          return (
            <div className='relative min-w-0' key={idx}>
              <button
                className={commonBtn}
                onClick={() => {
                  setAffiliateOpen(false); // Close affiliate when opening shop
                  setShopOpen(!shopOpen);
                }}
              >
                <span className='truncate'>{t(nav.name)}</span>
                <motion.svg
                  className='h-4 w-4 shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  animate={{ rotate: shopOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </motion.svg>
              </button>

              <ShopDropdown
                open={shopOpen}
                groupCategories={groupCategories}
                categories={categories}
                onNavigate={() => handleNavigate(setShopOpen)}
                onClose={() => setShopOpen(false)}
              />
            </div>
          );
        }

        if (isAffiliate) {
          return (
            <div className='relative min-w-0' key={idx}>
              <button
                className={commonBtn}
                onClick={() => {
                  setShopOpen(false); // Close shop when opening affiliate
                  setAffiliateOpen(!affiliateOpen);
                }}
              >
                <span className='truncate'>{t(nav.name)}</span>
                <motion.svg
                  className='h-4 w-4 shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  animate={{ rotate: affiliateOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </motion.svg>
              </button>

              <AffiliateDropdown
                open={affiliateOpen}
                onNavigate={() => handleNavigate(setAffiliateOpen)}
                onClose={() => setAffiliateOpen(false)}
              />
            </div>
          );
        }

        return (
          <Link href={nav.route} className={commonBtn} key={idx}>
            <span className='cursor-pointer truncate'>{t(nav.name)}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavbarRoute;
