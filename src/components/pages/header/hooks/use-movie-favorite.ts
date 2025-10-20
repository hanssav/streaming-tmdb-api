import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useAddToFavorites,
  useAllFavorites,
  movieKeys,
} from '@/hooks/useMovies';
import { APIConfiguration } from '@/lib/constants';
import { Movie } from '@/types';

export const useMovieFavorites = () => {
  const account_id = APIConfiguration.mock_account_id;
  const queryClient = useQueryClient();
  const addToFavorite = useAddToFavorites();
  const { data: favoriteData } = useAllFavorites(account_id);

  const favoriteIds = React.useMemo(() => {
    if (!Array.isArray(favoriteData)) return new Set<number>();
    return new Set(favoriteData.map((movie: Movie) => movie.id));
  }, [favoriteData]);

  const [optimisticFavorites, setOptimisticFavorites] = React.useState<
    Set<number>
  >(new Set());

  const mergedFavorites = React.useMemo(() => {
    const merged = new Set(favoriteIds);
    optimisticFavorites.forEach((id) => merged.add(id));
    return merged;
  }, [favoriteIds, optimisticFavorites]);

  const isFavorite = React.useCallback(
    (movieId: number): boolean => mergedFavorites.has(movieId),
    [mergedFavorites]
  );

  const onChangeFavorite = React.useCallback(
    (id: number, currentlyFavorited: boolean) => {
      if (!id) return;

      const newStatus = !currentlyFavorited;

      setOptimisticFavorites((prev) => {
        const next = new Set(prev);
        if (newStatus) next.add(id);
        else next.delete(id);
        return next;
      });

      addToFavorite.mutate(
        {
          account_id,
          body: {
            media_type: 'movie',
            media_id: id,
            favorite: newStatus,
          },
        },
        {
          onSuccess: () => {
            // Ensure server data is in sync
            queryClient.invalidateQueries({
              queryKey: movieKeys.allFavorites(account_id),
              refetchType: 'all',
            });
          },
          onError: () => {
            // Rollback local optimistic change
            setOptimisticFavorites((prev) => {
              const next = new Set(prev);
              if (newStatus) next.delete(id);
              else next.add(id);
              return next;
            });
          },
        }
      );
    },
    [account_id, addToFavorite, queryClient]
  );

  return {
    isFavorite,
    onChangeFavorite,
    addToFavorite,
  };
};
