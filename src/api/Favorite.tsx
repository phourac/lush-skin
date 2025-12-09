import http from '@/utils/http-util';

const FAVORITE_API = {
  addFavorite: async (data: { productId: number }) => {
    const apiUrl = `/api/favorite/add`;
    const res = await http.post<ICart.ICartAddSucces>(`${apiUrl}`, data);
    return res.data;
  },

  removeFavorite: async (params: { productId: number }) => {
    const apiUrl = `/api/favorite/delete`;
    const res = await http.delete<ICart.ICartAddSucces>(`${apiUrl}`, {
      params,
    });
    return res.data;
  },

  favoriteDetail: async (params: { id: number }) => {
    const apiUrl = `/api/favorite/detail`;
    const res = await http.get<IProducts.IIsFavoriteDetail>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default FAVORITE_API;
