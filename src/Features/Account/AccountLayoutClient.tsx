'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PROFILE_API from 'api/Profile';
import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import AccountDetailsSkeleton from '@/components/Skeleton/AccountDetailsSkeleton';
import AccountSidebarSkeleton from '@/components/Skeleton/AccountSidebarSkeleton';
import AddressListSkeleton from '@/components/Skeleton/AddressListSkeleton';

const AccountSidebar = dynamic(() => import('./AccountSidebar'), {
  ssr: false,
  loading: () => <AccountSidebarSkeleton />,
});
const AccountDetails = dynamic(() => import('./AccountDetails'), {
  ssr: false,
});

const Address = dynamic(() => import('./Address'), {
  ssr: false,
});

interface AccountLayoutClientProps {
  handleSignOut: () => Promise<void>;
  session: SessionPayload | null;
}

const AccountLayoutClient: React.FC<AccountLayoutClientProps> = ({
  handleSignOut,
  session,
}) => {
  const searchParam = useSearchParams();
  const getId = searchParam.get('id');
  const t = useTranslations('profile');

  const {
    data: getProfile,
    loading: loadingProfile,
    error: errorProfile,
    refresh: refreshProfile,
  } = useRequest(() => PROFILE_API.profileDetail(), {});

  return (
    <div className='flex h-full gap-[88px] py-8'>
      {/* Sticky Sidebar */}
      <div className='sticky top-[196px] hidden w-[246px] self-start lg:block'>
        <AccountSidebar handleSignOut={handleSignOut} session={session} />
      </div>

      {/* Main Content */}
      <div className='flex-1 space-y-6 overflow-y-auto'>
        <Suspense fallback={<AccountDetailsSkeleton />}>
          {(getId === '1' || getId === null) && (
            <>
              <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
                {t('Account Details')}
              </h1>
              <AccountDetails
                getProfile={getProfile}
                loadingProfile={loadingProfile}
                errorProfile={errorProfile}
                refreshProfile={refreshProfile}
              />
            </>
          )}
        </Suspense>

        <Suspense fallback={<AddressListSkeleton />}>
          {getId === '2' && <Address />}
        </Suspense>
      </div>
    </div>
  );
};

export default AccountLayoutClient;
