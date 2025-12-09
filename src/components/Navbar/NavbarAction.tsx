'use client';

import { SessionPayload } from '@/actions/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname, useRouter } from 'hooks/navigation';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useCart } from '@/contexts/CartContext';
import { useFavoriteContext } from '@/contexts/FavoriteContext';

import { colors, getTextColor } from '@/utils/avatar-utils';
import { sideBarMenu } from '@/utils/route-utils';

import SidebarItem from '../AccountCom/SidebarItem';
import Avatar from '../Avatar';
import ButtonBase from '../Button/ButtonBase';
import SearchProduct from './SearchProduct';

const NavbarAction = ({
  session,
  handleSignOut,
}: {
  session: SessionPayload | null;
  handleSignOut(): Promise<void>;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();
  const nav = useRouter();
  const {
    totalCartItem,
    isClickingCart,
    getCartProductName,
    setIsClickingCart,
  } = useCart();
  const { isClickingFav, setIsClickingFav, getFavoriteProductName } =
    useFavoriteContext();

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const autoCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [openTooltip, setOpenTooltip] = useState<
    null | 'favorite' | 'cart' | 'account'
  >(null);

  const activeIdFromParam = Number(searchParams.get('id'));
  const activeId =
    activeIdFromParam ||
    (pathname === '/order' ? 3 : pathname.startsWith('/account') ? 1 : 0);

  const openAccount = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    enterTimeout.current = setTimeout(() => setOpenTooltip('account'), 80);
  };

  const closeAccount = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    leaveTimeout.current = setTimeout(closeTooltip, 120);
  };

  /** ✅ Close tooltip safely and clear timers */
  const closeTooltip = useCallback(() => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    setOpenTooltip(null);
  }, []);

  /** ✅ Open tooltip and auto-close after 3s */
  const showTooltip = useCallback(
    (type: 'favorite' | 'cart') => {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
      setOpenTooltip(type);
      autoCloseTimer.current = setTimeout(closeTooltip, 3000);
    },
    [closeTooltip]
  );
  const handleLocaleToggle = () => {
    const nextLocale = locale === 'km' ? 'en' : 'km';

    const params = new URLSearchParams(searchParams.toString());

    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    nav.push(url, { locale: nextLocale });
  };

  const actions = [
    {
      key: 'locale',
      icon: locale === 'en' ? '/assets/us.svg' : '/assets/khmer.svg',
      onClick: handleLocaleToggle,
    },
    { key: 'favorite', icon: '/assets/favorite.svg', href: '/favorite' },
    { key: 'account', icon: '/assets/profile.svg', href: '/account' },
    { key: 'cart', icon: '/assets/cart.svg', href: '/cart', isCart: true },
  ];

  const bgColor = colors[1];
  const textColor = getTextColor(bgColor);
  const firstLetter = session?.firstname?.charAt(0).toUpperCase() || '';

  useEffect(() => setMounted(true), []);

  /** ✅ FIXED: Show tooltip when isClickingFav becomes true */
  useEffect(() => {
    if (isClickingFav) {
      showTooltip('favorite');
      // Reset after showing tooltip
      const timer = setTimeout(() => {
        setIsClickingFav(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isClickingFav, showTooltip, setIsClickingFav]);

  /** ✅ FIXED: Show tooltip when isClickingCart becomes true */
  useEffect(() => {
    if (isClickingCart) {
      showTooltip('cart');
      // Reset after showing tooltip
      const timer = setTimeout(() => {
        setIsClickingCart(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isClickingCart, showTooltip, setIsClickingCart]);

  /** ✅ Handle outside clicks */
  useEffect(() => {
    if (!openTooltip) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        closeTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openTooltip, closeTooltip]);

  const renderProfileTooltip = () => {
    return (
      <AnimatePresence mode='wait'>
        {openTooltip === 'account' && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: '0px 6px 12px 0px #33333314' }}
            className='border-border absolute top-full left-1/2 z-[999] mt-4 w-[278px] -translate-x-4/5 rounded-[8px] border bg-white p-3'
          >
            <div className='absolute -top-[10px] left-4/5 -translate-x-2/5'>
              <Image
                src='/assets/top-arrow.svg'
                alt=''
                width={17}
                height={10}
              />
            </div>
            <div className='flex flex-col space-y-4'>
              {session?.isLogin && (
                <>
                  {session?.imageUrl ? (
                    <div className='border-border relative box-border flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full border bg-white p-[1px]'>
                      <Image
                        src={session?.imageUrl}
                        alt='Preview'
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <Avatar
                      {...{ bgColor, firstLetter, textColor, size: 70 }}
                    />
                  )}

                  <h1 className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-2%]'>
                    {session?.username}
                  </h1>

                  <button className='text-primary flex items-center gap-2 text-[15px] leading-[140%] font-medium tracking-[-2%] underline'>
                    Switch Profile
                    <Image
                      src='/assets/switch.svg'
                      alt=''
                      width={18}
                      height={18}
                    />
                  </button>
                </>
              )}

              {sideBarMenu.map((item) => (
                <SidebarItem
                  key={item.id}
                  {...item}
                  isActive={activeId === item.id}
                  handleSignOut={async () => {
                    await handleSignOut();
                    closeTooltip();
                  }}
                  session={session}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderTooltip = (key: 'favorite' | 'cart') => {
    const isFavorite = key === 'favorite';
    const label = isFavorite ? 'Added to Favorite' : 'Added to Cart';
    const link = isFavorite ? '/favorite' : '/cart';
    const buttonText = isFavorite ? 'View Favorite' : 'View Cart';
    const alignmentClass = isFavorite ? 'left-1/2 -translate-x-1/2' : 'right-0';
    const arrowPosition = isFavorite ? 'left-1/2 -translate-x-1/2' : 'right-1';

    return (
      <AnimatePresence>
        {openTooltip === key && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: '0px 6px 12px 0px #33333314' }}
            className={`border-border absolute top-full z-[999] mt-4 w-60 rounded-[8px] border bg-white p-4 ${alignmentClass}`}
          >
            <div className={`absolute -top-[10px] ${arrowPosition}`}>
              <Image
                src='/assets/top-arrow.svg'
                alt=''
                width={17}
                height={10}
              />
            </div>

            <h1 className='text-typography-base text-[15px] leading-[140%] font-medium'>
              {label}
            </h1>
            <p className='text-typography-base mt-1 text-[15px] leading-[140%]'>
              {getCartProductName || getFavoriteProductName}
            </p>

            <Link href={link} aria-label='Navbar Link'>
              <ButtonBase onClick={closeTooltip} className='mt-3 w-full'>
                {buttonText}
              </ButtonBase>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.nav
      initial={{ height: 80 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className='relative mx-auto flex max-w-[1240px] items-center justify-between px-4 xl:px-0'
    >
      {/* Logo */}
      <Link
        aria-label='Home'
        href='/'
        className='absolute flex items-center gap-2 xl:left-1/2 xl:-translate-x-1/2'
      >
        <div className='relative h-[20px] w-[144px] sm:h-[30px] sm:w-[154px] md:h-[40px] md:w-[184px]'>
          <Image src='/images/logo-navbar.svg' alt='Logo' fill />
        </div>
      </Link>

      {/* Actions */}
      <div className='relative ml-auto flex items-center gap-3 sm:gap-4 md:gap-6'>
        <SearchProduct />

        {actions.map(({ key, icon, href, onClick, isCart }) => {
          const content = (
            <>
              <div className='relative h-6 w-6'>
                <Image
                  src={icon}
                  alt={`${key} icon`}
                  fill
                  className='object-contain'
                />
              </div>
              {mounted && isCart && totalCartItem > 0 && (
                <span className='absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white shadow-sm'>
                  {totalCartItem}
                </span>
              )}
            </>
          );

          if (onClick) {
            return (
              <button
                key={key}
                onClick={onClick}
                className='relative flex cursor-pointer items-center justify-center'
                aria-label={`${key} action`}
              >
                {content}
              </button>
            );
          }

          if (key === 'account') {
            return (
              <div
                key={key}
                className='relative flex items-center justify-center'
                onMouseEnter={openAccount}
                onMouseLeave={closeAccount}
              >
                <Link
                  aria-label='Account'
                  href={href || '#'}
                  className='relative flex items-center justify-center'
                >
                  {content}
                </Link>
                {renderProfileTooltip()}
              </div>
            );
          }

          return (
            <div
              key={key}
              className='relative flex items-center justify-center'
            >
              <Link
                aria-label={key}
                href={href || '#'}
                className='relative flex items-center justify-center'
              >
                {content}
              </Link>
              {(key === 'favorite' || key === 'cart') && renderTooltip(key)}
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default NavbarAction;
