import React from 'react';

interface AvatarProps {
  bgColor: string;
  textColor: string;
  firstLetter: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  bgColor,
  textColor,
  firstLetter,
  size = 40,
}) => {
  return (
    <div
      className='border-border box-border flex items-center justify-center rounded-full border bg-white p-[1px]'
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className='flex h-full w-full items-center justify-center rounded-full'
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <span
          className='font-medium'
          style={{
            fontSize: `${size * 0.5}px`,
          }}
        >
          {firstLetter}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
