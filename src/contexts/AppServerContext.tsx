import { getSession } from '@/actions/auth';
import { ReactNode } from 'react';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

import { AppProvider } from './AppClientContext';

export async function AppWrapper({ children }: { children: ReactNode }) {
  const session = await getSession();

  const urlDataCate = session?.isLogin
    ? API_ROUTE.customerCate
    : API_ROUTE.guestCate;
  const urlDataGroupCate = session?.isLogin
    ? API_ROUTE.customerGroupCate
    : API_ROUTE.guestGroupCate;

  const dataCate = await FetchServer<ICategory.ICategoryRes>(urlDataCate, {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: 120 },
    params: { page: 1, pageSize: 2000 },
    headers: session?.isLogin
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {},
  });

  const dataGroupCate = await FetchServer<IGroupCategory.IGroupCategoryRes>(
    urlDataGroupCate,
    {
      method: 'GET',
      params: { page: 1, pageSize: 2000 },
      headers: session?.isLogin
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
    }
  );

  const dataBanner = await FetchServer<IBanner.IBannerRes>(API_ROUTE.banner, {
    method: 'GET',
    params: {
      page: 1,
      pageSize: 1000,
      displayType: 'CAROUSEL',
    },
    headers: session?.isLogin
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {},
    next: { revalidate: 60 },
  });

  return (
    <AppProvider value={{ dataCate, dataGroupCate, dataBanner }}>
      {children}
    </AppProvider>
  );
}
