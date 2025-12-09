import { useEffect, useState } from 'react';

export function useBreakPoints() {
  const [isSmUp, setIsSmUp] = useState(false);

  useEffect(() => {
    const check = () => setIsSmUp(window.innerWidth >= 640); // sm = 640px
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { isSmUp };
}
