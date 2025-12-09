import React from 'react';

import Image from 'next/image';

const OrderStatus = ({
  des,
  icon,
  title,
  bg,
  textColor,
}: {
  icon: string;
  title: string;
  des: string;
  bg: string;
  textColor: string;
}) => {
  return (
    <div className='border-border mb-6 flex items-center gap-6 rounded-[12px] border-[1px] p-4'>
      <div className={`${bg} rounded-full p-4`}>
        <Image src={icon} alt='' width={42} height={42} />
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className={`${textColor} text-[15px] leading-[140%] font-semibold`}>
          {title}
        </h1>
        <p className='text-typography-muted text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
          {des}
        </p>
      </div>
    </div>
  );
};

export default OrderStatus;
