'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import FAVORITE_API from 'api/Favorite';
import { useEffect, useRef, useState } from 'react';

import { useFavoriteContext } from '@/contexts/FavoriteContext';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

export const useFavorite = (id?: number, session?: SessionPayload | null) => {
  const errorFavorite = useRef<IErrDialogRef>(null);

  const { setIsClickingFav } = useFavoriteContext();

  // For list page: track which product was removed
  const [removeSuccess, setRemoveSuccess] = useState<{
    productId: number;
  } | null>(null);

  const [addSuccess, setAddSuccess] = useState(false);

  // Fetch favorite detail (only if id exists)
  const {
    data: dataFav,
    refresh: refreshDataFav,
    loading: loadingDataFav,
  } = useRequest(() => FAVORITE_API.favoriteDetail({ id: id! }), {
    ready: !!id && !!session?.isLogin,
    refreshDeps: [id, session?.isLogin],
  });

  // Local state for detail page favorite UI
  const [isFav, setIsFav] = useState(false);

  // Sync favorite state when detail page fetches
  useEffect(() => {
    if (dataFav?.data.isFav !== undefined) {
      setIsFav(dataFav.data.isFav);
    }
  }, [dataFav]);

  // Add favorite
  const { run: runAddFavorite, loading: loadingAddFavorite } = useRequest(
    FAVORITE_API.addFavorite,
    {
      manual: true,
      onSuccess: () => {
        setIsFav(true);
        refreshDataFav();
        setAddSuccess(true);
        setIsClickingFav(true);
      },
      onError: (err) => errorFavorite.current?.open(err),
    }
  );

  // Remove favorite — FIXED
  const { run: runRemoveFavorite, loading: loadingRemoveFavorite } = useRequest(
    FAVORITE_API.removeFavorite,
    {
      manual: true,
      onSuccess: (_, params) => {
        // params = [{ productId }]
        const removedId = params?.[0]?.productId;

        // Update detail page UI
        setIsFav(false);
        refreshDataFav();

        // Only set for list page
        if (removedId) {
          setRemoveSuccess({ productId: removedId });
        }
      },
      onError: (err) => errorFavorite.current?.open(err),
    }
  );

  return {
    // actions
    runAddFavorite,
    runRemoveFavorite,

    // states
    isFav,
    setIsFav,
    loadingAddFavorite,
    loadingRemoveFavorite,
    loadingDataFav,

    // list page notification
    removeSuccess,

    // error handler
    errorFavorite,
    addSuccess,
  };
};
