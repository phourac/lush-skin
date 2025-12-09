'use client';

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// --------------------
// Types
// --------------------

export interface IFavoriteContext {
  favorites: IProduct.IProductRes[];
  setFavorites: Dispatch<SetStateAction<IProduct.IProductRes[]>>;
  selectedFavorite: IProduct.IProductRes | null;
  setSelectedFavorite: Dispatch<SetStateAction<IProduct.IProductRes | null>>;
  isClickingFav: boolean;
  setIsClickingFav: React.Dispatch<React.SetStateAction<boolean>>;
  setGetFavoriteProductName: React.Dispatch<React.SetStateAction<string>>;
  getFavoriteProductName: string;
}

// --------------------
// Default state
// --------------------
const defaultFavorite: IProduct.IProductRes[] = [];

// --------------------
// Context
// --------------------
const FavoriteContext = createContext<IFavoriteContext>({
  favorites: defaultFavorite,
  setFavorites: () => {},
  selectedFavorite: null,
  setSelectedFavorite: () => {},
  isClickingFav: false,
  setIsClickingFav: () => {},
  getFavoriteProductName: '',
  setGetFavoriteProductName: () => {},
});

// --------------------
// Wrapper Component
// --------------------
export function FavoriteWrapper({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] =
    useState<IProduct.IProductRes[]>(defaultFavorite);
  const [selectedFavorite, setSelectedFavorite] =
    useState<IProduct.IProductRes | null>(null);
  const [isClickingFav, setIsClickingFav] = useState(false);

  const [getFavoriteProductName, setGetFavoriteProductName] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClickingFav) {
      timer = setTimeout(() => {
        setIsClickingFav(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isClickingFav]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
        selectedFavorite,
        setSelectedFavorite,
        isClickingFav,
        setIsClickingFav,
        getFavoriteProductName,
        setGetFavoriteProductName,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

// --------------------
// Hook
// --------------------
export function useFavoriteContext() {
  return useContext(FavoriteContext);
}
