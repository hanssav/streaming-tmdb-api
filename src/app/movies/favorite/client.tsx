'use client';
import { SectionWrapper, ShowOrSkeleton } from '@/components/container';
import EmptyData from '@/components/container/empty-data';
import { Card } from '@/components/pages/favorite/card';
import { FavoriteCardSkeleton } from '@/components/pages/skeleton';
import { Button } from '@/components/ui/button';
import { TypographySub, TypographyTitle } from '@/components/ui/typography';
import { IMAGES, PATH } from '@/lib/constants';
import { EMPTY_DATA } from '@/lib/constants/empty-data';
import { getSafeImage, handleImageError } from '@/lib/utils';
import { Movie } from '@/types';
import { LucidePlayCircle } from 'lucide-react';
import React from 'react';
import { useFavorite } from './use-favorite';

const FavoriteClient = () => {
  const { data, isFavorited, isFetching, isLoading, onChangeFavorite } =
    useFavorite();

  return (
    <SectionWrapper className='space-y-6 pt-6'>
      <ShowOrSkeleton
        isLoading={isFetching || isLoading}
        skeletonCount={5}
        data={data}
        Skeleton={FavoriteCardSkeleton}
      >
        {(fav: Movie) => (
          <Card.CardMovie key={fav.id}>
            <div className='flex gap-6'>
              <Card.Image
                src={getSafeImage(
                  fav.poster_path,
                  IMAGES.DEFAULT_PROFILE,
                  PATH.TMDB_IMAGES_URL
                )}
                onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                alt={`poster-${fav.original_title}`}
              />
              <Card.Content className='space-y-2 lg:space-y-6'>
                <TypographyTitle
                  label={fav.title}
                  size='md'
                  lgSize='display-xs'
                />
                <Card.RatingWithValue value={fav.vote_average} />
                <TypographySub
                  label={fav.overview}
                  className='line-clamp-2'
                  size='sm'
                  lgSize='md'
                />
                <Button className='hidden lg:flex p-2' size='lg'>
                  Watch Trailer
                  <LucidePlayCircle />
                </Button>
              </Card.Content>
              <Card.HeartButton
                isFavorited={isFavorited?.includes(fav.id)}
                onChange={() => onChangeFavorite(fav.id)}
                className='hidden lg:flex size-16 aspect-square self-center'
              />
            </div>

            <Card.Actions className='lg:hidden'>
              <Button className='flex-1 p-2' size='lg'>
                Watch Trailer
                <LucidePlayCircle />
              </Button>
              <Card.HeartButton
                isFavorited={isFavorited?.includes(fav.id)}
                onChange={() => onChangeFavorite(fav.id)}
              />
            </Card.Actions>
          </Card.CardMovie>
        )}
      </ShowOrSkeleton>
      {data && data?.length < 1 && <EmptyData {...EMPTY_DATA} />}
    </SectionWrapper>
  );
};

export default FavoriteClient;
