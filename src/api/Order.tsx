import http from '@/utils/http-util';

const ORDER_API = {
  preCheckoutByCart: async (data: {
    cartIds: number[];
    couponCode?: string;
    cusAddressId?: number;
  }) => {
    const apiUrl = `/api/order/pre-checkout`;
    const res = await http.post<IOrder.IPrecheckout>(`${apiUrl}`, data);
    return res.data;
  },

  preCheckoutByProductId: async (data: {
    products: {
      productId: number;
      qty: number;
      productVariantId: number;
    }[];
    couponCode?: string;
    cusAddressId?: number;
  }) => {
    const apiUrl = `/api/order/pre-checkout/pre-checkout-productid`;
    const res = await http.post<IOrder.IPrecheckout>(`${apiUrl}`, data);
    return res.data;
  },

  placeOrder: async (data: {
    paymentMethodId?: number;
    cusRemark?: string;
    cusPaymentReceptUrl?: string;
    couponCode?: string;
    cusAddressId: number;
    cusCoordinate?: {
      lat: number;
      lng: number;
    };
    products: {
      productId: number;
      qty: number;
      productVariantId: number;
    }[];
  }) => {
    const apiUrl = `/api/order/place-order`;
    const res = await http.post<IOrder.IPlaceOrderRes>(`${apiUrl}`, data);
    return res.data;
  },

  orderDetail: async (params: { id: number }) => {
    const apiUrl = `/api/order/order-detail`;
    const res = await http.get<IOrder.IOrderDetail>(apiUrl, {
      params,
    });
    return res.data;
  },

  orderList: async (params: {
    page: number;
    pageSize: number;
    status: string;
  }) => {
    const apiUrl = `/api/order/order-list`;
    const res = await http.get<IOrder.IOrderList>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default ORDER_API;
