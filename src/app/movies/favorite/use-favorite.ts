import {
  movieKeys,
  useAddToFavorites,
  useAllFavorites,
} from '@/hooks/useMovies';
import { APIConfiguration } from '@/lib/constants';
import { Movie } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

export const useFavorite = () => {
  const account_id = APIConfiguration.mock_account_id;
  const { data, isLoading, isFetching } = useAllFavorites();
  const [isFavorited, setIsFavorited] = React.useState<number[]>([]);
  const addToFavorite = useAddToFavorites();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setIsFavorited(() => data?.map((movie: Movie) => movie.id));
  }, [data, isLoading]);

  const onChangeFavorite = (id: number) => {
    if (!id) return;
    return addToFavorite.mutate(
      {
        account_id,
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: false,
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
  };

  return {
    isFavorited,
    isFetching,
    data,
    addToFavorite,
    onChangeFavorite,
    isLoading,
  };
};
