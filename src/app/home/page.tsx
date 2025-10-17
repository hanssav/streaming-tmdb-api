import React from 'react';
import HomeClient from './client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { movieKeys } from '@/hooks/useMovies';
import { DiscoverMoviesParams } from '@/types';
import { movieApi } from '@/services';

const Home = async () => {
  const today = new Date().toISOString().split('T')[0];
  const queryClient = new QueryClient();

  const discoverParams: DiscoverMoviesParams = { sort_by: 'popularity.desc' };

  const infiniteParams: DiscoverMoviesParams = {
    sort_by: 'primary_release_date.desc',
    'primary_release_date.lte': today,
    include_adult: false,
    language: 'en-US',
    limit: 20,
  };

  const randomIndex = Math.floor(Math.random() * 20);

  await queryClient.prefetchQuery({
    queryKey: movieKeys.discover(discoverParams),
    queryFn: () => movieApi.discoverMovies(discoverParams),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: movieKeys.discover(infiniteParams),
    queryFn: async ({ pageParam = 1 }) => {
      const defaultParam = { page: pageParam, ...infiniteParams };
      const res = await movieApi.discoverMovies(defaultParam);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: ({
      page,
      total_pages,
    }: {
      page: number;
      total_pages: number;
    }) => {
      return page < total_pages ? page + 1 : undefined;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='w-screen relative'>
      <HydrationBoundary state={dehydratedState}>
        <HomeClient initialRandomIndex={randomIndex} />
      </HydrationBoundary>
    </div>
  );
};

export default Home;
