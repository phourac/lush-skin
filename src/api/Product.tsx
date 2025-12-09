import http from '@/utils/http-util';

const PRODUCT_API = {
  getGuestProducts: async (params: {
    categoryIds?: string;
    hasDiscount?: string;
    slug?: 'highlight168' | 'new-arrival' | 'best-seller';
    search?: string;
    similarProductId?: number;
    page: number;
    pageSize: number;
  }) => {
    const apiUrl = `/api/guest/products`;
    const res = await http.get<IProducts.IProductRes>(apiUrl, {
      params,
    });
    return res.data;
  },

  getCustomerProducts: async (params: {
    categoryIds?: string;
    hasDiscount?: string;
    slug?: 'highlight168' | 'new-arrival' | 'best-seller';
    search?: string;
    similarProductId?: number;
    page: number;
    pageSize: number;
    isFavourite?: boolean;
  }) => {
    const apiUrl = `/api/customer/products`;
    const res = await http.get<IProducts.IProductRes>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default PRODUCT_API;
