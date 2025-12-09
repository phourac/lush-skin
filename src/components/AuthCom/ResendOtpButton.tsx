'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import ButtonBase from '@/components/Button/ButtonBase';

const RESEND_COOLDOWN = 60;
const STORAGE_KEY = 'otp_last_sent_at';

export default function ResendOtpButton({
  onResend,
  onCountingChange,
}: {
  onResend: () => void;
  onCountingChange?: (isCounting: boolean) => void;
}) {
  const [remaining, setRemaining] = useState(0);

  const t = useTranslations('auth');

  const updateRemaining = useCallback(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (!lastSent) {
      setRemaining(0);
      return;
    }
    const diff = Math.floor((Date.now() - Number(lastSent)) / 1000);
    const remain = Math.max(RESEND_COOLDOWN - diff, 0);
    setRemaining(remain);
  }, []);

  // Watch and notify parent when counting changes
  useEffect(() => {
    onCountingChange?.(remaining > 0);
  }, [remaining, onCountingChange]);

  useEffect(() => {
    updateRemaining();
    const timer = setInterval(updateRemaining, 1000);
    return () => clearInterval(timer);
  }, [updateRemaining]);

  const handleClick = useCallback(() => {
    onResend();
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    updateRemaining();
  }, [onResend, updateRemaining]);

  if (remaining > 0) {
    const m = Math.floor(remaining / 60);
    const s = (remaining % 60).toString().padStart(2, '0');
    return (
      <div className='px-4 whitespace-nowrap'>
        <h1 className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
          {t('Resend in')} {m}:{s}
        </h1>
      </div>
    );
  }

  return (
    <ButtonBase
      onClick={handleClick}
      type='button'
      className='md:bg-primary text-primary border-primary bg-primary-light h-[48px] w-full rounded-[16px] border-[1px] px-4 whitespace-nowrap md:w-auto md:border-0 md:text-white'
    >
      {t('Get Verify Code')}
    </ButtonBase>
  );
}
