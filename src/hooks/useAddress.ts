'use client';

import { useRequest } from 'ahooks';
import ADDRESS_API from 'api/Address';
import { useRouter } from 'hooks/navigation';
import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAddressContext } from '@/contexts/AddressContext';

export function useAddress() {
  const nav = useRouter();
  const searchParams = useSearchParams();
  const { setAddressName } = useAddressContext();

  const { runAsync: runGetDetail } = useRequest(ADDRESS_API.addressDetail, {
    manual: true,
    onSuccess: (data) => {
      setAddressName({
        coord: { lat: data.data.coords.lat, lng: data.data.coords.lng },
      });
    },
  });

  const onClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove all address-related params
    const keysToRemove = [
      'address',
      'addressId',
      'name',
      'phone',
      'type',
      'note',
      'lat',
      'lng',
      'detail',
    ];

    keysToRemove.forEach((key) => params.delete(key));

    // Push cleaned URL
    nav.push(`?${params.toString()}`);
  }, [searchParams, nav]);

  const handleOpenAddressDialog = useCallback(
    async (key: string, value: string, id?: number) => {
      const params = new URLSearchParams(searchParams.toString());

      // Close dialog → remove all params
      if (!value) {
        params.delete(key);
        params.delete('addressId');
        params.delete('name');
        params.delete('phone');
        params.delete('type');
        params.delete('note');
        params.delete('lat');
        params.delete('lng');
        nav.push(`?${params.toString()}`);
        return;
      }

      // Open dialog
      params.set(key, value);

      // If editing → wait for request
      if (id) {
        const result = await runGetDetail({ id: id.toString() });

        if (result?.data) {
          const d = result.data;

          params.set('addressId', String(d.id));
          params.set('name', d.ownerName || '');
          params.set('phone', d.ownerPhone || '');
          params.set('type', d.addrType || '');

          if (d.addrNote) params.set('note', d.addrNote);

          if (d.coords) {
            params.set('lat', String(d.coords.lat));
            params.set('lng', String(d.coords.lng));
          }
        }
      }

      nav.push(`?${params.toString()}`);
    },
    [nav, searchParams, runGetDetail]
  );

  return { handleOpenAddressDialog, onClose };
}
