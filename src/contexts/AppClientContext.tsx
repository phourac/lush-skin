'use client';

import { createContext, useContext } from 'react';

export interface IAppContext {
  dataCate: ICategory.ICategoryRes | null;
  dataGroupCate: IGroupCategory.IGroupCategoryRes | null;
  dataBanner: IBanner.IBannerRes | null;
}

const AppContext = createContext<IAppContext>({
  dataCate: null,
  dataGroupCate: null,
  dataBanner: null,
});

export function AppProvider({
  value,
  children,
}: {
  value: IAppContext;
  children: React.ReactNode;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
