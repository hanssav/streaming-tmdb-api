import { SectionWrapper } from '@/components/container';
import { TypographyTitle } from '@/components/ui/typography';
import { movieKeys } from '@/hooks/useMovies';
import { movieApi } from '@/services';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import TrailerClient from './client';

const Trailer = async ({ params }: { params: { id: number } }) => {
  const { id: movie_id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: movieKeys.getVideoTrailer(Number(movie_id)),
    queryFn: () => movieApi.getVideo(Number(movie_id)),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className='py-6 mt-[90px] pt-0 lg:pt-[64px] min-h-[calc(100vh-8rem-5rem)]'>
      <SectionWrapper>
        <TypographyTitle label='Trailer' />
      </SectionWrapper>

      <HydrationBoundary state={dehydratedState}>
        <TrailerClient id={movie_id} />
      </HydrationBoundary>
    </div>
  );
};

export default Trailer;
