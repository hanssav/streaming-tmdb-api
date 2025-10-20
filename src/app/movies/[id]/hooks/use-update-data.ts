import { useAddToFavorites, useAllFavorites } from '@/hooks/useMovies';
import { APIConfiguration } from '@/lib/constants';
import React from 'react';

export const useUpdateData = (id: number) => {
  const account_id = APIConfiguration.mock_account_id;
  const { data: movie } = useAllFavorites(id);
  const addToFavorite = useAddToFavorites();

  const [localFavorited, setLocalFavorited] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    if (movie?.id !== undefined && localFavorited === null) {
      setLocalFavorited(movie.id);
    }
  }, [movie?.id, localFavorited]);

  const isFavorited = localFavorited ?? movie?.is_favorited ?? false;

  const onFavoriteChange = () => {
    const newStatus = !isFavorited;

    setLocalFavorited(newStatus);

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
        onError: () => {
          setLocalFavorited(!newStatus);
        },
      }
    );
  };

  return {
    isFavorited,
    onFavoriteChange,
    isLoading: addToFavorite.isPending,
  };
};
