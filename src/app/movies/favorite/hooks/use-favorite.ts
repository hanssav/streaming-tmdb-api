import { useAddToFavorites, useAllFavorites } from '@/hooks/useMovies';
import { APIConfiguration } from '@/lib/constants';
import { Movie } from '@/types';
import React from 'react';

export const useFavorite = () => {
  const account_id = APIConfiguration.mock_account_id;
  const { data, isLoading, isFetching } = useAllFavorites();
  const addToFavorite = useAddToFavorites();

  const isFavorited = React.useMemo(() => {
    return data?.map((movie: Movie) => movie.id) || [];
  }, [data]);

  const onChangeFavorite = (id: number) => {
    if (!id) return;
    const isCurrentlyFavorited = isFavorited.includes(id);

    return addToFavorite.mutate({
      account_id,
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !isCurrentlyFavorited,
      },
    });
  };

  return {
    isFavorited,
    isFetching,
    data,
    addToFavorite,
    onChangeFavorite,
    isLoading,
    isAddLoading: addToFavorite.isPending,
  };
};
