import { useState } from 'react';

export default function useSlideShowBanner(
  length: number
  //   delay: number = 3000
) {
  const [current, setCurrent] = useState<number>(0);
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
  //   const [isPaused, setIsPaused] = useState<boolean>(false);
  //   const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = (): void => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const handleNext = (): void => {
    setCurrent((prev) => (prev + 1) % length);
  };

  //   useEffect(() => {
  //     if (!isPaused) {
  //       intervalRef.current = setInterval(() => {
  //         setCurrent((prev) => (prev + 1) % length);
  //       }, delay);
  //     }

  //     return () => {
  //       if (intervalRef.current) clearInterval(intervalRef.current);
  //     };
  //   }, [isPaused, delay, length]);

  return {
    current,
    // isPaused,
    // setIsPaused,
    handlePrev,
    handleNext,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
