import { motion } from 'framer-motion';
import React from 'react';

import Image from 'next/image';

interface ButtonPaginationProps {
  current: number; // active index (0-based)
  total: number; // total bullets
  handleNext: () => void;
  handlePrev: () => void;
}

const IconButton = ({
  icon,
  alt,
  onClick,
}: {
  icon: string;
  alt: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className='bg-green hover:bg-green/80 active:bg-green/70 flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95'
    aria-label={alt}
  >
    <div className='relative h-4 w-2'>
      <Image
        src={icon}
        alt={alt}
        fill
        sizes='16px'
        className='object-contain'
      />
    </div>
  </button>
);

const ButtonBullet = ({
  current,
  total,
  handleNext,
  handlePrev,
}: ButtonPaginationProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // ✅ MUST MATCH VISUAL CSS
  const BULLET_SIZE = 12; // px
  const GAP = 16; // px
  const VISIBLE = 5;
  const SLOT = BULLET_SIZE + GAP;
  const TRACK_WIDTH = VISIBLE * SLOT - GAP;

  // ✅ Auto scroll to keep active bullet centered
  React.useEffect(() => {
    if (!containerRef.current) return;

    const centerIndex = Math.floor(VISIBLE / 2);
    const targetIndex = Math.max(0, current - centerIndex);

    containerRef.current.scrollTo({
      left: targetIndex * SLOT,
      behavior: 'smooth',
    });
  }, [current, SLOT]);

  return (
    <div className='flex items-center justify-center gap-[16px]'>
      <IconButton
        icon='/assets/arrow-left.svg'
        alt='Previous'
        onClick={handlePrev}
      />

      {/* ✅ BULLET VIEWPORT */}
      <div className='overflow-hidden' style={{ width: `${TRACK_WIDTH}px` }}>
        <div
          ref={containerRef}
          className='flex items-center overflow-x-hidden'
          style={{ gap: `${GAP}px` }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const isActive = current === i;

            return (
              <motion.div
                key={i}
                layout={false} // ✅ PREVENTS VIBRATION
                animate={{
                  backgroundColor: isActive ? '#000000' : '#D9D9D9',
                }}
                transition={{ duration: 0.2 }}
                className='shrink-0 rounded-full'
                style={{
                  width: BULLET_SIZE,
                  height: BULLET_SIZE,
                  aspectRatio: '1 / 1', // ✅ FORCE PERFECT CIRCLE
                  transformOrigin: 'center', // ✅ NO OVAL DISTORTION
                }}
              />
            );
          })}
        </div>
      </div>

      <IconButton
        icon='/assets/arrow-right.svg'
        alt='Next'
        onClick={handleNext}
      />
    </div>
  );
};

export default ButtonBullet;
