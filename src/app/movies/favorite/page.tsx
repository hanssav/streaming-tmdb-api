import React from 'react';
import FavoriteClient from './client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { TypographyTitle } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/container';
import { movieKeys } from '@/hooks/useMovies';
import { movieApi } from '@/services';

const Favorite = async () => {
  const queryClinet = new QueryClient();

  await queryClinet.prefetchQuery({
    queryKey: movieKeys.allFavorites(),
    queryFn: () => movieApi.getAllFavorites(),
    staleTime: 60_000,
  });

  const dehydratedState = dehydrate(queryClinet);

  return (
    <div className='py-6 mt-[90px] pt-0 lg:pt-[64px] min-h-[calc(100vh-8rem-5rem)]'>
      <SectionWrapper className=''>
        <TypographyTitle label='Favorite' />
      </SectionWrapper>
      <HydrationBoundary state={dehydratedState}>
        <FavoriteClient />
      </HydrationBoundary>
    </div>
  );
};

export default Favorite;
