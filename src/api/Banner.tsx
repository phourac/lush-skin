import http from '@/utils/http-util';

const BANNER_API = {
  getBanner: async (params: {
    displayType: 'CAROUSEL' | 'BOXED' | 'PROMO_BAR';
    page: number;
    pageSize: number;
  }) => {
    const apiUrl = `/api/guest/banner`;
    const res = await http.get<IBanner.IBannerRes>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default BANNER_API;
