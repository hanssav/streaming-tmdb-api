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
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (movie?.is_favorited !== undefined && localFavorited === null) {
      setLocalFavorited(movie.is_favorited);
    }
  }, [movie?.is_favorited, localFavorited]);

  const isFavorited = localFavorited ?? movie?.is_favorited ?? false;

  const onFavoriteChange = () => {
    setLocalFavorited((prev) => !prev);
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (localFavorited === null) return;

    addToFavorite.mutate(
      {
        account_id,
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: localFavorited,
        },
      },
      {
        onError: () => {
          setLocalFavorited((prev) => !prev);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFavorited]);

  return {
    isFavorited,
    onFavoriteChange,
    isLoading: addToFavorite.isPending,
  };
};
