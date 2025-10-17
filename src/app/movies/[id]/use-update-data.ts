import { useAddToFavorites, useAllFavorites } from '@/hooks/useMovies';
import { APIConfiguration } from '@/lib/constants';
import React from 'react';

export const useUpdateData = (id: number) => {
  const { data: favorites } = useAllFavorites(id);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const addToFavorite = useAddToFavorites();

  React.useEffect(() => {
    setIsFavorited(favorites?.id === Number(id));
  }, [favorites?.id, id]);

  const onFavoriteChange = () => {
    setIsFavorited((prev) => {
      const newStatus = !prev;

      addToFavorite.mutate({
        account_id: APIConfiguration.mock_account_id,
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: newStatus,
        },
      });

      return newStatus;
    });
  };

  return { isFavorited, onFavoriteChange, addToFavorite };
};
