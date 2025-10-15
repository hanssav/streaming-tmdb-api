import { movieKeys } from '@/hooks/useMovies';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import DetailClient from './client';
import { movieApi } from '@/services';

const Detail = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: movieKeys.detail(Number(id)),
    queryFn: () => movieApi.getMovieById(Number(id)),
  });

  await queryClient.prefetchQuery({
    queryKey: movieKeys.credits(Number(id)),
    queryFn: () => movieApi.getMovieCreditId(Number(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DetailClient id={id} />
    </HydrationBoundary>
  );
};

export default Detail;
