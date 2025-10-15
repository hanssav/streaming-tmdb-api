import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import FavoriteClient from './client';
import { TypographyTitle } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/container';

const Favorite = async () => {
  const queryClinet = new QueryClient();

  // await queryClinet.prefetchQuery({ queryFn: () => {} });

  const dehydratedState = dehydrate(queryClinet);

  return (
    <div className='py-6 mt-[90px] pt-0 lg:pt-[64px]'>
      <SectionWrapper>
        <TypographyTitle label='Favorite' />
      </SectionWrapper>
      <HydrationBoundary state={dehydratedState}>
        <FavoriteClient />
      </HydrationBoundary>
    </div>
  );
};

export default Favorite;
