import http from '@/utils/http-util';

const CART_API = {
  addCart: async (data: {
    productId: number;
    variantId: number;
    qty: number;
  }) => {
    const apiUrl = `/api/cart/add`;
    const res = await http.post<ICart.ICartAddSucces>(`${apiUrl}`, data);
    return res.data;
  },

  getCart: async (params: { page: number; pageSize: number }) => {
    const apiUrl = `/api/cart/list`;
    const res = await http.get<ICart.ICartRes>(apiUrl, {
      params,
    });
    return res.data;
  },

  deleteCart: async (params: { ids: string }) => {
    const apiUrl = `/api/cart/delete`;
    const res = await http.delete<ICart.ICartAddSucces>(`${apiUrl}`, {
      params,
    });
    return res.data;
  },

  updateCart: async (data: {
    id: number;
    productId: number;
    variantId: number;
    qty: number;
  }) => {
    const apiUrl = `/api/cart/update`;
    const res = await http.patch<ICart.ICartAddSucces>(`${apiUrl}`, data);
    return res.data;
  },

  reoder: async (data: { orderId: number }) => {
    const apiUrl = `/api/cart/reorder`;
    const res = await http.post<ICart.IReoder>(`${apiUrl}`, data);
    return res.data;
  },
};

export default CART_API;
