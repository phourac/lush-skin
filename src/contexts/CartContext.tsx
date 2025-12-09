'use client';

import { useRequest } from 'ahooks';
import { useDebounceFn } from 'ahooks';
import CART_API from 'api/Cart';
import useNavigateParam from 'hooks/useNavigateParam';
import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

import { useAuthContext } from './AuthContext';

// ---- Types ---- //

type Cart = ICart.ICartItem[];

interface CartContextType {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  removeFromCart: (variantId: number[]) => void;
  updateQuantity: (data: {
    id: number;
    productId: number;
    variantId: number;
    qty: number;
  }) => void;
  clearCart: (id: number[]) => void;
  totalPrice: number;
  totalItems: number;
  totalCartItem: number;
  isClickingCart: boolean;
  setIsClickingCart: React.Dispatch<React.SetStateAction<boolean>>;
  triggerCartTooltip: () => void;
  runAddToCart: (data: {
    productId: number;
    variantId: number;
    qty: number;
  }) => void;
  cartList: ICart.ICartRes | undefined;
  loadingCartList: boolean;
  errorAddToCart: React.RefObject<IErrDialogRef | null>;
  setGetCartProductName: React.Dispatch<React.SetStateAction<string>>;
  getCartProductName: string;
  refreshCartList: () => void;

  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItems: number[];

  errorUpdateToCart: React.RefObject<IErrDialogRef | null>;
  errorCartList: Error | undefined;
}

// ---- Context ---- //
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>([]);
  const [isClickingCart, setIsClickingCart] = useState(false);
  const errorAddToCart = useRef<IErrDialogRef>(null);
  const errorUpdateToCart = useRef<IErrDialogRef>(null);
  const [getCartProductName, setGetCartProductName] = useState('');
  const { isLogin } = useAuthContext();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const {
    data: cartList,
    loading: loadingCartList,
    refresh: refreshCartList,
    mutate: mutateCartList,
    error: errorCartList,
  } = useRequest(() => CART_API.getCart({ page: 1, pageSize: 1000 }), {
    ready: isLogin === true,
  });

  const totalCartItem = cartList?.data.length || 0;

  const triggerCartTooltip = () => {
    setIsClickingCart(false);
    setTimeout(() => setIsClickingCart(true), 0); // retrigger every time
  };
  const { run: runAddToCart } = useRequest(CART_API.addCart, {
    manual: true,

    onSuccess: () => {
      refreshCartList();
      triggerCartTooltip();
    },
    onError: (err: any) => {
      const status = err?.data?.status ?? err?.status;

      if (status === 401) {
        setParam('auth', 'signin');
      } else {
        errorAddToCart.current?.open(err);
      }
    },
  });

  const { run: runUpdateCart } = useRequest(CART_API.updateCart, {
    manual: true,

    onSuccess: () => {
      // refreshCartList();
      // triggerCartTooltip();
    },
    onError: (err) => {
      errorUpdateToCart.current?.open(err);
    },
  });

  const { run: debouncedUpdateCart } = useDebounceFn(
    (data) => {
      runUpdateCart(data);
    },
    { wait: 300 }
  );

  const { setParam } = useNavigateParam();

  const { run: runDeleteCart } = useRequest(CART_API.deleteCart, {
    manual: true,
    onSuccess: () => {
      // refreshCartList();
    },
    onError: (err) => {
      errorAddToCart.current?.open(err);
    },
  });

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedCart = localStorage.getItem('cart');
  //     if (storedCart) {
  //       try {
  //       } catch (error) {
  //         console.error('Error parsing stored cart:', error);
  //       }
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   persistState('cart', cartList);
  // }, [cartList]);

  // Add to cart

  // Remove from cart
  const removeFromCart = (variantIds: number[]) => {
    mutateCartList((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((item) => !variantIds.includes(item.id)),
      };
    });

    runDeleteCart({ ids: variantIds.join(',') });
  };

  // Update quantity
  const updateQuantity = (data: {
    id: number;
    productId: number;
    variantId: number;
    qty: number;
  }) => {
    mutateCartList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.map((item) =>
          item.id === data.id ? { ...item, qty: data.qty } : item
        ),
      };
    });

    // API update
    debouncedUpdateCart(data);
  };

  // Clear cart
  const clearCart = (id: number[]) => {
    mutateCartList((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((item) => !id.includes(item.id)),
      };
    });
    runDeleteCart({ ids: id.join(',') });
  };

  // Totals
  const totalPrice =
    cartList?.data.reduce(
      (sum, item) =>
        sum + item.product?.productVariants[0].afterDiscount * item.qty,
      0
    ) || 0;
  const totalItems =
    cartList?.data.reduce((sum, item) => sum + item.qty, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        totalCartItem,
        isClickingCart,
        setIsClickingCart,
        triggerCartTooltip,
        runAddToCart,
        cartList,
        loadingCartList,
        cart,
        setCart,
        errorAddToCart,
        getCartProductName,
        setGetCartProductName,
        refreshCartList,
        setSelectedItems,
        selectedItems,
        errorUpdateToCart,
        errorCartList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ---- Hook ---- //
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
