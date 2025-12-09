import React, { useState } from 'react';

import { useAppContext } from '@/contexts/AppClientContext';

const useShopBannerSlide = () => {
  const { dataBanner } = useAppContext();

  const [current, setCurrent] = useState(0);
  const length = dataBanner?.data.length || 0;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleSwipe = (direction: 'left' | 'right'): void => {
    if (direction === 'left') handleNext();
    else handlePrev();
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleSwipe('left');
    } else if (isRightSwipe) {
      handleSwipe('right');
    }
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % length);
  };
  return {
    current,
    handlePrev,
    handleNext,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    dataBanner,
  };
};

export default useShopBannerSlide;
