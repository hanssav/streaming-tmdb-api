import { useDiscoverMovies } from '@/hooks/useMovies';
import React from 'react';

export const useDiscoverData = (i: number) => {
  const { data: discoverData, isLoading } = useDiscoverMovies({
    // sort_by: 'popularity.desc',
    // sort_by: 'vote_average.desc',
    sort_by: 'vote_count.desc',
  });

  const trending = React.useMemo(
    () => discoverData?.results || [],
    [discoverData?.results]
  );

  const [mixedIdx, setMixedIdx] = React.useState(i);

  React.useEffect(() => {
    if (!trending.length) return;

    const interval = setInterval(() => {
      let nextIndex = Math.floor(Math.random() * trending.length);
      if (nextIndex === mixedIdx) {
        nextIndex = (nextIndex + 1) % trending.length;
      }
      setMixedIdx(nextIndex);
    }, 5_000);

    return () => clearInterval(interval);
  }, [trending, mixedIdx]);

  const featuredMovie = trending[mixedIdx];

  return { discoverData, isLoading, featuredMovie, mixedIdx, trending };
};
