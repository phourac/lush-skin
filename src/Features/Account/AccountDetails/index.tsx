import React from 'react';

import EmptyData from '@/components/EmptyData';
import AccountSkeleton from '@/components/Skeleton/AccountSkeleton';

import Password from './Password';
import Personal from './Personal';
import Profile from './Profile';

const AccountDetails = ({
  getProfile,
  loadingProfile,
  refreshProfile,
  errorProfile,
}: {
  getProfile: IProfile.IProfileRes | undefined;
  loadingProfile: boolean;
  errorProfile: Error | undefined;
  refreshProfile: () => void;
}) => {
  if (loadingProfile) {
    return <AccountSkeleton />;
  }

  return (
    <>
      {errorProfile ? (
        <EmptyData
          title={`Error ${(errorProfile as any).status}`}
          description={errorProfile.message}
        />
      ) : (
        <>
          {' '}
          <Profile getProfile={getProfile} refreshProfile={refreshProfile} />
          <Personal getProfile={getProfile} refreshProfile={refreshProfile} />
        </>
      )}

      <Password refreshProfile={refreshProfile} />
    </>
  );
};

export default AccountDetails;
