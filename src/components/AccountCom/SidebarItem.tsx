'use client';

import { SessionPayload } from '@/actions/auth';
import useAuth from 'Features/Auth/useAuth';
import { useRouter } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Image from 'next/image';

import { useAuthContext } from '@/contexts/AuthContext';

import CusDialog from '../Dialog/CusDialog';

interface SidebarItemProps {
  id: number;
  name: string;
  icon: string;
  iconActive: string;
  href?: string;
  isActive: boolean;
  handleSignOut: () => Promise<void>;
  session: SessionPayload | null;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  name,
  icon,
  iconActive,
  href,
  isActive,
  handleSignOut,
  session,
}) => {
  const nav = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthContext();
  const { openSignIn } = useAuth();
  const t = useTranslations('profile');

  const handleClick = () => {
    if (id === 1 || id === 2) {
      nav.push(`/account?id=${id}`);
    } else if (href) {
      nav.push(href);
    } else if (id === 4) {
      if (session?.isLogin) {
        setIsOpen(!isOpen);
      } else {
        openSignIn();
      }
    }
  };

  return (
    <>
      <div
        className={`flex h-[48px] cursor-pointer items-center justify-start gap-[10px] rounded-[8px] border-[1px] px-6 text-[15px] font-medium transition-all duration-300 ${
          isActive
            ? 'border-primary-light bg-primary-light text-primary'
            : 'border-border text-typography-base hover:bg-paper bg-white'
        }`}
        onClick={handleClick}
      >
        <div className='relative h-[24px] w-[24px]'>
          <Image
            src={`/assets/${isActive ? iconActive : icon}`}
            alt={name}
            fill
          />
        </div>
        <span>
          {name === 'Logout' && !session?.isLogin ? t('Login') : t(name)}
        </span>
      </div>

      <CusDialog
        isOpen={isOpen}
        onClose={() => {}}
        title=''
        buttonText='Ok'
        loading={false}
        direction='bottom'
        height='auto'
        className='relative w-[534px] rounded-2xl p-6'
      >
        <div className='space-y-4'>
          <p className='text-typography-base text-[16px]'>
            {t('Are you sure you want to log out?')}
          </p>
          <div className='flex justify-end gap-3 pt-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='border-border text-typography-base cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50'
            >
              {t('Cancel')}
            </button>
            <button
              onClick={async () => {
                await logout();
                await handleSignOut();
                window.location.reload();
                setIsOpen(false);
              }}
              className='bg-primary cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-70'
            >
              {session?.isLogin ? t('Log out') : t('Login')}
            </button>
          </div>
        </div>
      </CusDialog>
    </>
  );
};

export default SidebarItem;
