import { useEffect, useState } from 'react';

import { getPersistedState, persistState } from '@/utils/persist-util';

const STORAGE_KEY = 'checkoutItems';

const useCheckout = () => {
  const [checkoutItems, setCheckoutItems] = useState<ICheckout.ICheckoutItem[]>(
    []
  );

  const totalPrice = () => {
    const Subtotal = checkoutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0 // ✅ initial value is required
    );

    const deliveryFee = 1;

    const total = Subtotal - deliveryFee;

    return { total, Subtotal, deliveryFee };
  };

  const [isMounted, setIsMounted] = useState(false);

  // ✅ Load from localStorage after mount
  useEffect(() => {
    const stored = getPersistedState(STORAGE_KEY);
    if (Array.isArray(stored)) {
      setCheckoutItems(stored);
    }
    setIsMounted(true);
  }, []);

  // ✅ Persist whenever state changes (only after mount)
  useEffect(() => {
    if (isMounted) {
      persistState(STORAGE_KEY, checkoutItems);
    }
  }, [checkoutItems, isMounted]);

  return { checkoutItems, setCheckoutItems, totalPrice };
};

export default useCheckout;
