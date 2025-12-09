import http from '@/utils/http-util';

const COUPON_API = {
  checkCoupon: async (params: { code: string }) => {
    const apiUrl = `/api/coupon`;
    const res = await http.get<ICoupon.ICouponResponse>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default COUPON_API;
