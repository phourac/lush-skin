import http from '@/utils/http-util';

const ADDRESS_API = {
  getAddress: async (params: { page: number; pageSize: number }) => {
    const apiUrl = `/api/address/list`;
    const res = await http.get<IAddress.IAddressRes>(apiUrl, {
      params,
    });
    return res.data;
  },

  addressDetail: async (params: { id: string }) => {
    const apiUrl = `/api/address/detail`;
    const res = await http.get<IAddress.IAddressDetail>(apiUrl, {
      params,
    });
    return res.data;
  },

  addAddress: async (data: {
    ownerName: string;
    ownerPhone: string;
    addrNote: string;
    addrType: string;
    coords: { lat: number; lng: number };
    detail: Record<string, unknown>; // 👈 fixed
  }) => {
    const apiUrl = `/api/address/add`;
    const res = await http.post<IAddress.IAddressRes>(`${apiUrl}`, data);
    return res.data;
  },

  updateAddress: async (data: {
    id: string;
    isPinned: boolean;
    ownerName: string;
    ownerPhone: string;
    addrNote: string;
    addrType: string;
    coords: { lat: number; lng: number };
    detail: Record<string, unknown>; // 👈 fixed
  }) => {
    const apiUrl = `/api/address/update`;
    const res = await http.patch<IAddress.IAddressRes>(`${apiUrl}`, data);
    return res.data;
  },

  deleteAddress: async (params: { id: string }) => {
    const apiUrl = `/api/address/delete`;
    const res = await http.delete<IAddress.IAddressRes>(`${apiUrl}`, {
      params,
    });
    return res.data;
  },

  getPlace: async (params: { lat: number; lng: number }) => {
    const apiUrl = `/api/address/place`;
    const res = await http.get<IAddress.IGetPlaceRes>(apiUrl, {
      params,
    });
    return res.data;
  },

  placeAutoComplete: async (params: { query: string }) => {
    const apiUrl = `/api/address/autocomplete`;
    const res = await http.get<IAddress.IPlaceAutoCompleteRes>(apiUrl, {
      params,
    });
    return res.data;
  },

  placeId: async (params: { placeId: string }) => {
    const apiUrl = `/api/address/placeid`;
    const res = await http.get<IAddress.IPlaceIdRes>(apiUrl, {
      params,
    });
    return res.data;
  },
};

export default ADDRESS_API;
