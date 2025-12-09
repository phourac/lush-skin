import { useEffect, useState } from 'react';

import { getPersistedState, persistState } from '@/utils/persist-util';

const STORAGE_KEY = 'placeOrder';

const usePlaceOrder = () => {
  const [placeOrderItems, setPlaceOrderItems] =
    useState<IPlaceOrder.IItemToPlaceOrder | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Load from localStorage after mount
  useEffect(() => {
    const stored = getPersistedState(STORAGE_KEY);
    if (stored) {
      setPlaceOrderItems(stored);
    }
    setIsMounted(true);
  }, []);

  // ✅ Persist whenever state changes (only after mount)
  useEffect(() => {
    if (isMounted && placeOrderItems) {
      persistState(STORAGE_KEY, placeOrderItems);
    }
  }, [placeOrderItems, isMounted]);

  return { placeOrderItems, setPlaceOrderItems };
};

export default usePlaceOrder;
