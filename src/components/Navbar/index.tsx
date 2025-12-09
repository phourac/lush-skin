import { deleteSession, getSession } from '@/actions/auth';
import { Link } from 'hooks/navigation';
import React from 'react';

import Image from 'next/image';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

import NavbarAction from './NavbarAction';
import NavbarRoute from './NavbarRoute';

const Navbar = async () => {
  const session = await getSession();

  async function handleSignOut() {
    'use server';
    await deleteSession();
  }

  const dataBanner = await FetchServer<IBanner.IBannerRes>(API_ROUTE.banner, {
    method: 'GET',
    params: {
      page: 1,
      pageSize: 1000,
      displayType: 'PROMO_BAR',
    },
    headers: session?.isLogin
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {},
    cache: 'no-store',
  });

  return (
    <div className='sticky top-0 z-50 bg-white'>
      {/* shop-now */}
      <div className='relative flex h-[36px] w-full items-center justify-center'>
        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(180deg, #EB475A 0%, #EB687C 100%)',
          }}
        />

        <Link href={dataBanner?.data?.[0]?.link || ''} aria-label='Banner Link'>
          <h1 className='relative z-10 text-[15px] leading-[21px] font-medium tracking-[-0.3px] text-white hover:underline'>
            {dataBanner?.data?.[0]?.name || ''}
          </h1>
        </Link>

        <Image
          src='/images/shop-now-navbar.png'
          alt='Shop Now'
          fill
          priority
          className='object-cover'
        />
      </div>
      <NavbarAction session={session} handleSignOut={handleSignOut} />

      <NavbarRoute />
      <hr className='text-border h-[1px] w-full' />
    </div>
  );
};

export default Navbar;
