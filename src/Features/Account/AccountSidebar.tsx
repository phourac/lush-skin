'use client';

import { SessionPayload } from '@/actions/auth';
import { usePathname } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import SidebarItem from '@/components/AccountCom/SidebarItem';

import { sideBarMenu } from '@/utils/route-utils';

const AccountSidebar = ({
  handleSignOut,
  session,
}: {
  handleSignOut(): Promise<void>;
  session: SessionPayload | null;
}) => {
  const t = useTranslations('profile');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeIdFromParam = Number(searchParams.get('id'));
  const activeId =
    activeIdFromParam ||
    (pathname === '/order' ? 3 : pathname.startsWith('/account') ? 1 : 0);

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div className='space-y-6'>
        <h1 className='text-typography-base text-[28px] leading-[140%] font-semibold tracking-[-2%]'>
          {t('Your Account')}
        </h1>

        <button className='text-primary flex items-center gap-2 text-[15px] leading-[140%] font-medium tracking-[-2%] underline'>
          {t('Switch Profile')}
          <Image src='/assets/switch.svg' alt='' width={18} height={18} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className='flex flex-col space-y-4'>
        {sideBarMenu.map((item) => (
          <SidebarItem
            key={item.id}
            {...item}
            isActive={activeId === item.id}
            handleSignOut={handleSignOut}
            session={session}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
