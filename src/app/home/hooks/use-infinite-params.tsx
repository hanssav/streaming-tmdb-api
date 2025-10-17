import { DiscoverMoviesParams } from '@/types';
import React from 'react';

export const useInfiniteParams = () => {
  const today = new Date().toISOString().split('T')[0];
  const params: DiscoverMoviesParams = React.useMemo(
    () => ({
      sort_by: 'popularity.desc',
      'primary_release_date.lte': today,
      include_adult: false,
      language: 'en-US',
      limit: 20,
      include_video: true,
    }),
    [today]
  );

  return { params };
};
