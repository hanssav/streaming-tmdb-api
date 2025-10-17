'use client';
import {
  FlexibleImage,
  Hero,
  SectionWrapper,
  ShowOrSkeleton,
} from '@/components/container';
import { CreditsCard, ItemsCardMapping } from '@/components/pages/detail';
import HeroAction from '@/components/pages/detail/hero-actions';
import {
  CreditSkeleton,
  HeroDetailSkeleton,
  OverviewDetailSkeleton,
} from '@/components/pages/skeleton';
import { TypographySub, TypographyTitle } from '@/components/ui/typography';
import { useMovieDetail, useMovvieCreditDetail } from '@/hooks/useMovies';
import { IMAGES } from '@/lib/constants';
import { cn, formatDate, getSafeImage, handleImageError } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useUpdateData } from './use-update-data';

const DetailClient: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter();
  const { isFavorited, onFavoriteChange, addToFavorite } = useUpdateData(id);
  const { data, isLoading } = useMovieDetail(id);
  const {
    title = '',
    backdrop_path,
    overview,
    release_date = '',
    belongs_to_collection,
    poster_path,
  } = data || {};

  const { data: credits } = useMovvieCreditDetail(id);
  const backdrop_url = backdrop_path ?? belongs_to_collection?.backdrop_path;
  const poster_url = poster_path ?? belongs_to_collection?.poster_path;

  return (
    <div className='flex flex-col lg:gap-12'>
      <ShowOrSkeleton isLoading={isLoading} skeleton={<HeroDetailSkeleton />}>
        <Hero>
          <Hero.Image
            src={getSafeImage(backdrop_url, IMAGES.DEFAULT_BACKDROP)}
            alt={`backdrop-${title}`}
            onError={handleImageError(IMAGES.DEFAULT_BACKDROP)}
          />
          <Hero.Overlay />
          <Hero.Content className='mt-[-100] lg:mt-[-210px]'>
            <div className='flex flex-row gap-4 lg:gap-6 '>
              <FlexibleImage
                src={getSafeImage(poster_url)}
                onError={handleImageError(IMAGES.DEFAULT_IMAGE)}
                alt={`poster-${title}`}
                className={cn(
                  'min-w-[116px] min-h-[171px] rounded-xl',
                  'lg:min-w-[260px] lg:min-h-[384px]'
                )}
              />
              <div className='space-y-2 lg:flex lg:flex-col gap-5 flex-1'>
                <Hero.Title label={title} size='xl' />
                <div className='flex gap-1 items-center text-white'>
                  <Calendar className='size-4' />
                  <Hero.Subtitle
                    label={formatDate(release_date)}
                    smSize='sm'
                    className='font-normal text-white'
                  />
                </div>
                <HeroAction
                  isFavorited={isFavorited}
                  onChange={onFavoriteChange}
                  isLoading={addToFavorite.isPending}
                  onWatchTrailer={() => router.push(`/movies/trailer/${id}`)}
                  className='hidden lg:flex lg:max-w-[220px]'
                />
                <ItemsCardMapping className='hidden lg:flex' />
              </div>
            </div>

            <HeroAction
              isFavorited={isFavorited}
              isLoading={addToFavorite.isPending}
              onChange={onFavoriteChange}
              onWatchTrailer={() => router.push(`/movies/trailer/${id}`)}
            />
            <ItemsCardMapping />
          </Hero.Content>
        </Hero>
      </ShowOrSkeleton>
      <ShowOrSkeleton
        isLoading={isLoading}
        skeleton={<OverviewDetailSkeleton />}
      >
        <SectionWrapper>
          <TypographyTitle label='Overview' smSize='xl' lgSize='display-md' />
          <TypographySub label={overview} className='' />
        </SectionWrapper>
      </ShowOrSkeleton>
      <ShowOrSkeleton isLoading={isLoading} skeleton={<CreditSkeleton />}>
        <SectionWrapper>
          <TypographyTitle label='Cast' smSize='xl' lgSize='display-md' />
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10'>
            {(credits?.cast ?? []).map((cast) => (
              <CreditsCard key={cast.cast_id} className=''>
                <CreditsCard.Image
                  src={getSafeImage(cast.profile_path, IMAGES.DEFAULT_PROFILE)}
                  onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                  alt={`profile-${cast.name}`}
                />
                <CreditsCard.Info>
                  <TypographyTitle
                    label={cast.name}
                    size='sm'
                    lgSize='lg'
                    className='font-semibold'
                  />
                  <TypographySub
                    label={cast.known_for_department}
                    size='sm'
                    lgSize='md'
                    className='font-normal'
                  />
                </CreditsCard.Info>
              </CreditsCard>
            ))}
          </div>
          {credits && credits.cast && credits.cast.length === 0 && (
            <TypographySub
              label='No Data Cast Available'
              size='sm'
              lgSize='md'
              className='font-normal'
            />
          )}
        </SectionWrapper>
      </ShowOrSkeleton>
      <ShowOrSkeleton isLoading={isLoading} skeleton={<CreditSkeleton />}>
        <SectionWrapper>
          <TypographyTitle label='Crew' smSize='xl' lgSize='display-md' />
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10'>
            {(credits?.crew ?? []).map((crew) => (
              <CreditsCard key={crew.credit_id} className=''>
                <CreditsCard.Image
                  src={getSafeImage(crew.profile_path, IMAGES.DEFAULT_PROFILE)}
                  onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                  alt={`profile-${crew.name}`}
                />
                <CreditsCard.Info>
                  <TypographyTitle
                    label={crew.name}
                    size='sm'
                    lgSize='lg'
                    className='font-semibold'
                  />
                  <TypographySub
                    label={crew.job}
                    size='sm'
                    lgSize='md'
                    className='font-normal'
                  />
                </CreditsCard.Info>
              </CreditsCard>
            ))}
          </div>
          {credits && credits.crew && credits.crew.length === 0 && (
            <TypographySub
              label='No Data Crew Available'
              size='sm'
              lgSize='md'
              className='font-normal'
            />
          )}
        </SectionWrapper>
      </ShowOrSkeleton>
    </div>
  );
};

export default DetailClient;
