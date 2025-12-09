import clsx from 'clsx';
import React from 'react';

import Image from 'next/image';

interface ButtonBaseProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  iconSrc,
  iconAlt = 'icon',
  iconPosition = 'left',
  iconSize = 20,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick} // 🧱 prevent click handler
      className={clsx(
        'flex h-[40px] items-center justify-center gap-2 rounded-[8px] px-3 py-2 text-[15px] leading-[140%] font-medium tracking-[-2%] transition-all duration-200',
        !className.includes('bg-') &&
          'bg-primary hover:bg-primary/90 text-white',
        disabled
          ? 'pointer-events-none cursor-not-allowed opacity-60' // 🚫 disable all pointer interactions
          : 'cursor-pointer active:scale-[0.98]',
        className
      )}
    >
      {iconSrc && iconPosition === 'left' && (
        <div className='relative' style={{ width: iconSize, height: iconSize }}>
          <Image src={iconSrc} alt={iconAlt} fill className='object-contain' />
        </div>
      )}

      {children}

      {iconSrc && iconPosition === 'right' && (
        <div className='relative' style={{ width: iconSize, height: iconSize }}>
          <Image src={iconSrc} alt={iconAlt} fill className='object-contain' />
        </div>
      )}
    </button>
  );
};

export default ButtonBase;
