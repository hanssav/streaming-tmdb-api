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
  const { data: favoriteData } = useAllFavorites();

  const favoriteIds = React.useMemo(() => {
    if (!Array.isArray(favoriteData)) return new Set<number>();
    return new Set(favoriteData.map((movie: Movie) => movie.id));
  }, [favoriteData]);

  const isFavorite = React.useCallback(
    (movieId: number): boolean => {
      return favoriteIds.has(movieId);
    },
    [favoriteIds]
  );

  const onChangeFavorite = React.useCallback(
    (id: number, currentlyFavorited: boolean) => {
      if (!id) return;

      return addToFavorite.mutate(
        {
          account_id,
          body: {
            media_type: 'movie',
            media_id: id,
            favorite: !currentlyFavorited,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: movieKeys.allFavorites(account_id),
              refetchType: 'all',
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
