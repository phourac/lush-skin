import { useRequest } from 'ahooks';
import ORDER_API from 'api/Order';
import { useRouter } from 'hooks/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useCart } from '@/contexts/CartContext';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

const useCartReview = () => {
  const { removeFromCart, cartList, setSelectedItems, selectedItems } =
    useCart();
  const nav = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const errorRunPreCheckout = useRef<IErrDialogRef>(null);

  const selectedSet = useMemo(() => new Set(selectedItems), [selectedItems]);

  const {
    run: runPreCheckoutByCart,
    loading: loadingRunPrecheckout,
    refresh: refreshPreCheckout,
  } = useRequest(ORDER_API.preCheckoutByCart, {
    manual: true,
    onSuccess: () => {
      nav.push(`/checkout/${selectedItems.join(',')}`);
    },
    onError: (err) => {
      errorRunPreCheckout.current?.open(err);
    },
  });

  const onSubmit = () => {
    runPreCheckoutByCart({ cartIds: selectedItems });
  };

  const handleFavouriteToggle = useCallback((id: number, active: boolean) => {
    console.log(`Product ${id} favourite:`, active);
  }, []);

  // ✅ Ensure cartList is always an array
  const cartItems = useMemo(() => {
    return cartList?.data ?? [];
  }, [cartList]);

  const totalDiscount = useMemo(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id)) // only selected
      .reduce((total, item) => {
        const variant = item.product?.productVariants?.[0];
        const discount = variant?.discount ?? 0; // per-unit discount
        const qty = item.qty ?? 1;

        return total + discount * qty;
      }, 0);
  }, [cartItems, selectedItems]);

  // ✅ Compute if all items are selected
  const isAllSelected =
    selectedItems.length > 0 && selectedItems.length === cartItems.length;

  // ✅ Select or deselect all
  const handleSelectAll = (): void => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  // ✅ Toggle individual item selection
  const handleSelectItem = (id: number): void => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // ✅ Remove selected items from cart
  const handleRemoveSelected = (): void => {
    if (selectedItems.length === 0) return;
    selectedItems.forEach((id) => removeFromCart([id]));
    setSelectedItems([]);
  };

  // ✅ Compute total price of selected items
  const totalSelectedPrice = useMemo(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const variant = item.product?.productVariants?.[0];
        const price = variant?.afterDiscount ?? 0;
        return total + price * (item.qty ?? 1);
      }, 0);
  }, [cartItems, selectedItems]);

  // ✅ Reset selected items when cart changes
  // useEffect(() => {
  //   setSelectedItems([]);
  // }, [cartItems.length]);

  return {
    openIndex,
    setOpenIndex,
    selectedItems,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    handleRemoveSelected,
    totalSelectedPrice,
    totalDiscount,

    loadingRunPrecheckout,
    errorRunPreCheckout,
    refreshPreCheckout,

    selectedSet,
    onSubmit,
    handleFavouriteToggle,
  };
};

export default useCartReview;
