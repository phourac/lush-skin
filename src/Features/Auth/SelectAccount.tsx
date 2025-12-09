import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useAuthContext } from '@/contexts/AuthContext';

import Avatar from '@/components/Avatar';
import CusDialog from '@/components/Dialog/CusDialog';

import { colors, getTextColor } from '@/utils/avatar-utils';

const SelectAccount = ({
  accounts,
  setSelectedAcc,
}: {
  accounts: IAuth.ICheck | undefined;
  setSelectedAcc: React.Dispatch<
    React.SetStateAction<IAuth.ICheckData | undefined>
  >;
}) => {
  const { step, setStep } = useAuthContext();

  const searchParams = useSearchParams();
  const isOpen = searchParams.get('auth') === 'signin' && step === 2;

  // const accounts = [
  //   { username: 'User051525521', phone: '012 123 123' },
  //   { username: 'JohnDoe', phone: '010 888 999' },
  //   { username: 'AliceW', phone: '097 666 555' },
  // ];

  return (
    <CusDialog
      isOpen={isOpen}
      onClose={() => {}}
      title=''
      buttonText='Ok'
      loading={false}
      direction='bottom'
      height='auto'
      className='relative w-[534px] rounded-2xl p-8'
    >
      <div>
        {/* Dialog content */}
        <div className='flex flex-col items-center gap-6'>
          <Image
            src='/images/logo-navbar.svg'
            height={40}
            width={183}
            alt='Logo'
          />

          <div className='flex flex-col items-center space-y-3'>
            <h1 className='text-typography-base text-[24px] leading-[130%] font-semibold'>
              Welcome back!
            </h1>

            <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
              Please select your account to continue
            </p>
          </div>

          <div className='w-full space-y-3'>
            {accounts?.data.map((account, index) => {
              const bgColor = colors[index % colors.length];
              const textColor = getTextColor(bgColor);
              const firstLetter = account.userInfo.firstname
                .charAt(0)
                .toUpperCase();

              return (
                <div
                  onClick={() => {
                    const findAccount = accounts.data.find(
                      (item) => item.userInfo.id === account.userInfo.id
                    );
                    setSelectedAcc(findAccount);
                    setStep(3);
                  }}
                  key={index}
                  className='w-full cursor-pointer space-y-3 rounded-[12px] bg-white p-4'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-6'>
                      {/* avatar */}
                      <Avatar {...{ bgColor, firstLetter, textColor }} />

                      <div className='space-y-1'>
                        <h1 className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
                          {account.userInfo.firstname}{' '}
                          {account.userInfo.lastname}
                        </h1>
                        <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
                          {account.username}
                        </p>
                      </div>
                    </div>

                    <span className='bg-green flex h-8 w-8 items-center justify-center rounded-full'>
                      <Image
                        src='/assets/arrow-right.svg'
                        alt=''
                        width={8}
                        height={16}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CusDialog>
  );
};

export default SelectAccount;
