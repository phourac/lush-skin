import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import PRODUCT_API from 'api/Product';
import { useEffect, useRef, useState } from 'react';

export default function useProductHighlight(session: SessionPayload | null) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isProgrammatic = useRef(false);

  const getCardWidth = () => {
    const container = containerRef.current;
    if (!container) return 0;
    const firstChild = container.firstElementChild as HTMLElement | null;
    return firstChild ? firstChild.offsetWidth + 24 : 0;
  };

  const [productHighlight, setProductHighLight] = useState<
    IProducts.IProductData[]
  >([]);

  const { loading, error } = useRequest(
    () => {
      return session?.isLogin
        ? PRODUCT_API.getCustomerProducts({
            page: 1,
            pageSize: 10000,
            slug: 'highlight168',
          })
        : PRODUCT_API.getGuestProducts({
            page: 1,
            pageSize: 10000,
            slug: 'highlight168',
          });
    },
    {
      onSuccess: (res) => {
        const newData = res?.data || [];
        setProductHighLight((prev) => [...prev, ...newData]);
      },
    }
  );

  const totalCards = productHighlight.length;

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    isProgrammatic.current = true;

    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isProgrammatic.current = false;
      setCurrentIndex(index);
    }, 400);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalCards;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScrollEnd = () => {
      if (isProgrammatic.current) return;

      const cardWidth = getCardWidth();
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);

      // Gently correct the scroll position (for iOS overshoot)
      container.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth',
      });

      setCurrentIndex(newIndex);
    };

    const handleScroll = () => {
      if (isProgrammatic.current) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 120);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex]);

  return {
    containerRef,
    currentIndex,
    handleNext,
    handlePrev,

    productHighlight,
    loading,
    error,
  };
}
